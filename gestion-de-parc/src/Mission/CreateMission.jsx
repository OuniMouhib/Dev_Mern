import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateMission() {
    const [missionData, setMissionData] = useState({
        date: "",
        heure_depart: "",
        heure_arrivee: "",
        conducteur: "",
        vehicule: "", // Utilisez l'ID du véhicule ici pour une référence directe
        destination: "",
        distance: ""
    });
    const [availableCars, setAvailableCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/available-cars') // Assurez-vous que cette route retourne les voitures disponibles
            .then(response => {
                setAvailableCars(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des voitures disponibles:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMissionData({ ...missionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/createmissions', missionData);
            console.log(response.data);
            // Redirection vers la page des missions après la création réussie
            navigate('/missions');

            // Vérification de l'heure d'arrivée
            const currentTime = new Date().getTime();
            const arrivalTime = new Date(missionData.heure_arrivee).getTime();
            if (arrivalTime <= currentTime) {
                // Mise à jour de la disponibilité du véhicule
                const carId = missionData.vehicule;
                await axios.put(`http://localhost:3001/updateCarAvailability/${carId}`, { disponibilite: false });
            }
        } catch (error) {
            console.error('Erreur lors de la création de la mission:', error);
        }
    };

    return (
        <div>
            <h1>Créer une Mission</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date :</label>
                    <input type="date" className="form-control" id="date" name="date" value={missionData.date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="heure_depart" className="form-label">Heure de départ :</label>
                    <input type="time" className="form-control" id="heure_depart" name="heure_depart" value={missionData.heure_depart} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="heure_arrivee" className="form-label">Heure d&apos;arrivée :</label> {/* Appliquer l'entité &apos; pour échapper l'apostrophe */}
                    <input type="time" className="form-control" id="heure_arrivee" name="heure_arrivee" value={missionData.heure_arrivee} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="conducteur" className="form-label">Conducteur :</label>
                    <input type="text" className="form-control" id="conducteur" name="conducteur" value={missionData.conducteur} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="vehicule" className="form-label">Véhicule :</label>
                    <select className="form-control" id="vehicule" name="vehicule" value={missionData.vehicule} onChange={handleChange} required>
                        <option value="">Sélectionner une voiture</option>
                        {availableCars.map(car => (
                            <option key={car._id} value={car._id}>{car.Marque} - {car.Modéle}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="destination" className="form-label">Destination :</label>
                    <input type="text" className="form-control" id="destination" name="destination" value={missionData.destination} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="distance" className="form-label">Distance (km) :</label>
                    <input type="number" className="form-control" id="distance" name="distance" value={missionData.distance} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Créer la Mission</button>
            </form>
        </div>
    );
}

export default CreateMission;
