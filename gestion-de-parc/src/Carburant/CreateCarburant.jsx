import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function CreateCarburant() {
    const [quantite, setQuantite] = useState('');
    const [cout, setCout] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [cars, setCars] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        // Charger la liste des voitures disponibles lors du chargement initial
        axios.get('http://localhost:3001/all-cars')
            .then(result => setCars(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            quantite: quantite,
            cout: cout,
            vehicule: selectedCar // Utiliser la voiture sélectionnée
        };
        axios.post('http://localhost:3001/createcarburant', newTransaction)
            .then(res => {
                console.log(res);
                navigate('/carburant');
                // Rediriger ou effectuer toute autre action nécessaire après la création réussie
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Ajouter une nouvelle transaction de carburant</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="quantite" className="form-label">Quantité</label>
                    <input type="number" className="form-control" id="quantite" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cout" className="form-label">Coût</label>
                    <input type="number" className="form-control" id="cout" value={cout} onChange={(e) => setCout(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="selectedCar" className="form-label">Véhicule</label>
                    <select className="form-select" id="selectedCar" value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                        <option value="">Choisir une voiture</option>
                        {cars.map((car, index) => (
                            <option key={index} value={car._id}>{car.Marque} - {car.Modéle}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Valider</button>
            </form>
        </div>
    );
}

export default CreateCarburant;
