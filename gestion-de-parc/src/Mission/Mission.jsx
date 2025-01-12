import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './mission.css';

function Missions() {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const fetchAllMissions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/missions');
                setMissions(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des missions:', error);
            }
        };
        fetchAllMissions();
    }, []);

    useEffect(() => {
        const fetchAllMissions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/missionsvehicule');
                setMissions(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des  véhicule:', error);
            }
        };
        fetchAllMissions();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/deletemissions/${id}`);
            console.log(response.data);
            setMissions(missions.filter(mission => mission._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la mission:', error);
        }
    };

    return (
        <div className="m">
            <div className="home-container">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <Link to='/home' className="navbar-title">Gestion de parc</Link>
                    </div>

                    <div className="button-container">
                        <Link to="/cars" className="btn btn-3">Véhicules</Link>
                        <Link to="/missions" className="btn btn-3">Missions</Link>
                        <Link to="/carburant" className="btn btn-3">Carburant</Link>
                        <Link to="/entretien" className="btn btn-3">Entretien</Link>
                    </div>
                </nav>

                <header className="bg-dark py-3 d-flex justify-content-between align-items-center">
                    <h1 className="text-white m-0">Liste des Missions</h1>
                    <div>
                        <Link to="/createmission" className="btn btn-primary">Ajouter</Link>
                    </div>
                </header>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Heure de départ</th>
                                        <th>Heure d&apos;arrivée</th>
                                        <th>Conducteur</th>
                                        <th>Véhicule</th>
                                        <th>Destination</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {missions.map(mission => (
                                        <tr key={mission._id}>
                                            <td>{mission.date}</td>
                                            <td>{mission.heure_depart}</td>
                                            <td>{mission.heure_arrivee}</td>
                                            <td>{mission.conducteur}</td>
                                            <td>{mission.vehicule ? `${mission.vehicule.Marque} ${mission.vehicule.Modéle}` : 'Chargement...'}</td>
                                            <td>{mission.destination}</td>
                                            <td>
                                                <Link to={`/updatemission/${mission._id}`} className="btn btn-primary me-2">Modifier</Link>
                                                <button onClick={() => handleDelete(mission._id)} className="btn btn-danger me-2">Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Missions;
