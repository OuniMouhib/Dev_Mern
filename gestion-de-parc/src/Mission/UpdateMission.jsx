import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMission() {
    const { id } = useParams();
    const [missionData, setMissionData] = useState({
        date: "",
        heure_depart: "",
        heure_arrivee: "",
        conducteur: "",
        vehicule: "",
        destination: "",
        distance: ""
    });
    const [availableCars, setAvailableCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/missions/${id}`)
            .then(response => {
                setMissionData(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement de la mission:', error);
            });

        axios.get('http://localhost:3001/available-cars')
            .then(response => {
                setAvailableCars(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des voitures disponibles:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMissionData({ ...missionData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updatemissions/${id}`, missionData)
            .then(response => {
                console.log(response.data);
                navigate('/missions');
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de la mission:', error);
            });
    };

    return (
        <div >
            <h1>Modifier la Mission</h1>
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
                    <label htmlFor="heure_arrivee" className="form-label">Heure d&apos;arrivée :</label>
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
                    <label htmlFor="distance" className="form-label">Distance (km):</label>
                    <input type="number" className="form-control" id="distance" name="distance" value={missionData.distance} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Mettre à jour la Mission</button>
            </form>
        </div>
    );
}

export default UpdateMission;
