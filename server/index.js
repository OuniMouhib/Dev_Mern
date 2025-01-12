const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CarModel = require('./models/Cars');
const Mission = require('./models/missions'); // Utilisez Mission au lieu de Missions
const Carburant = require('./models/carburant');
const EmployeeModel = require("./models/Employee");
const EntretienModel = require('./models/entretien');


const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://mongo:27017/crud").then(() => console.log("Connexion à MongoDB réussie"))
    .catch(err => console.error("Erreur de connexion à MongoDB :", err));;
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("No record existed")
            }
        })
});

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
});




app.get('/', (req, res) => {
    CarModel.find({})
        .then(cars => res.json(cars))
        .catch(err => res.json(err));
});

app.get('/getCar/:id', (req, res) => {
    const id = req.params.id;
    CarModel.findById({ _id: id })
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
});

app.put('/updateCar/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = {
        Marque: req.body.Marque,
        Modéle: req.body.Modéle,
        Puissance: req.body.Puissance,
        Numéro_de_série: req.body.Numéro_de_série,
        Image: req.body.Image,
        Disponibilité: req.body.Disponibilité
    };

    CarModel.findByIdAndUpdate(id, updatedCar, { new: true })
        .then(updatedCar => {
            if (!updatedCar) {
                return res.status(404).json({ message: "Car not found" });
            }
            res.json(updatedCar);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/CreateCars", (req, res) => {
    CarModel.create(req.body)
        .then(cars => res.json(cars))
        .catch(err => res.json(err))
});

app.delete('/deleteCar/:id', (req, res) => {
    const id = req.params.id;
    CarModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
});

app.get('/available-cars', (req, res) => {
    CarModel.find({ Disponibilité: true }) // Filtrer les voitures disponibles
        .then(cars => res.json(cars))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/missions', (req, res) => {
    Mission.find({}) // Utilisez Mission au lieu de Missions
        .then(missions => res.json(missions))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/missions/:id', (req, res) => {
    const id = req.params.id;
    Mission.findById(id) // Utilisez Mission au lieu de Missions
        .then(mission => res.json(mission))
        .catch(err => res.status(404).json({ message: 'Mission not found' }));
});

app.post('/createmissions', (req, res) => {
    const missionData = req.body;
    Mission.create(missionData) // Utilisez Mission au lieu de Missions
        .then(mission => res.status(201).json(mission))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.put('/updatemissions/:id', (req, res) => {
    const id = req.params.id;
    const updatedMissionData = req.body;
    Mission.findByIdAndUpdate(id, updatedMissionData, { new: true }) // Utilisez Mission au lieu de Missions
        .then(updatedMission => res.json(updatedMission))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/deletemissions/:id', (req, res) => {
    const id = req.params.id;
    Mission.findByIdAndDelete(id) // Utilisez Mission au lieu de Missions
        .then(() => res.sendStatus(204))
        .catch(err => res.status(400).json({ error: err.message }));
});
app.get('/missionsvehicule', (req, res) => {
    Mission.find({})
        .populate('vehicule', 'Marque Modéle -_id') // Projection pour sélectionner uniquement la marque et le modèle
        .then(missions => res.json(missions))
        .catch(err => res.status(500).json({ error: err.message }));
});
app.get('/transactions', (req, res) => {
    Carburant.find({})
        .then(transaction => res.json(transaction))
        .catch(err => res.json(err));
});

// Endpoint pour récupérer une transaction de carburant par ID
app.get('/transactions/:id', (req, res) => {
    const id = req.params.id;
    Carburant.findById(id)
        .then(transaction => res.json(transaction))
        .catch(err => res.json(err));
});

// Endpoint pour ajouter une nouvelle transaction de carburant
app.post("/createcarburant", (req, res) => {
    Carburant.create(req.body)
        .then(transaction => res.json(transaction))
        .catch(err => res.json(err));
});

// Endpoint pour mettre à jour une transaction de carburant par ID
app.put('/updatecarburant/:id', (req, res) => {
    const id = req.params.id;
    const updatedTransaction = req.body;

    // Vérifier si toutes les données requises sont présentes
    if (!id || !updatedTransaction) {
        return res.status(400).json({ message: "Veuillez fournir l'ID de la transaction et les données mises à jour." });
    }

    // Mettre à jour la transaction de carburant dans la base de données
    Carburant.findByIdAndUpdate(id, updatedTransaction, { new: true })
        .then(updatedTransaction => {
            if (!updatedTransaction) {
                return res.status(404).json({ message: "Transaction de carburant non trouvée." });
            }
            res.json(updatedTransaction);
        })
        .catch(err => res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de la transaction de carburant.", error: err }));
});


// Endpoint pour supprimer une transaction de carburant par ID
app.delete('/deletecarburant/:id', (req, res) => {
    const id = req.params.id;
    Carburant.findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch(err => res.json(err));
});
app.get('/all-cars', (req, res) => {
    CarModel.find({})
        .then(cars => res.json(cars))
        .catch(err => res.status(500).json({ error: err.message }));
});
app.get('/carburantvehicule', (req, res) => {
    Carburant.find({})
        .populate('vehicule', 'Marque Modéle -_id') // Projection pour sélectionner uniquement la marque et le modèle du véhicule
        .then(transaction => res.json(transaction))
        .catch(err => res.status(500).json({ error: err.message }));

});
app.get('/missionsvehicule', (req, res) => {
    Mission.find({})
        .populate('vehicule', 'Marque Modéle -_id') // Projection pour sélectionner uniquement la marque et le modèle
        .then(missions => res.json(missions))
        .catch(err => res.status(500).json({ error: err.message }));
});



// Endpoint pour créer un nouvel entretien
app.post("/postentretiens", (req, res) => {
    EntretienModel.create(req.body)
        .then(entretien => res.status(201).json(entretien))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint pour récupérer tous les entretiens
app.get("/entretiens", (req, res) => {
    EntretienModel.find({})
        .then(entretiens => res.json(entretiens))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint pour récupérer un entretien par ID
app.get("/entretiens/:id", (req, res) => {
    const id = req.params.id;
    EntretienModel.findById(id)
        .then(entretien => res.json(entretien))
        .catch(err => res.status(404).json({ message: 'Entretien not found' }));
});

// Endpoint pour mettre à jour un entretien par ID
app.put("/updateentretien/:id", (req, res) => {
    const id = req.params.id;
    const updatedEntretienData = req.body;
    EntretienModel.findByIdAndUpdate(id, updatedEntretienData, { new: true })
        .then(updatedEntretien => res.json(updatedEntretien))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Endpoint pour supprimer un entretien par ID
app.delete("/deleteentretiens/:id", (req, res) => {
    const id = req.params.id;
    EntretienModel.findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch(err => res.status(400).json({ error: err.message }));
});
app.get('/entretienvehicule', (req, res) => {
    EntretienModel.find({})
        .populate('voiture', 'Marque Modéle Puissance Numéro_de_série -_id') // Correction de l'orthographe de 'Modele'
        .then(entretien => res.json(entretien))
        .catch(err => res.status(500).json({ error: err.message }));
});






app.listen(3001, () => {
    console.log("Serveur en cours d'écoute sur le port 3001");
});
