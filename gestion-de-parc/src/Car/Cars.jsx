import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './car.css';

function Cars() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/');
                setCars(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des voitures:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/deleteCar/${id}`);
            setCars(prevCars => prevCars.filter(car => car._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la voiture:', error);
        }
    };

    const handleAvailabilityChange = async (id) => {
        try {
            const car = cars.find(car => car._id === id);
            if (car) {
                const updatedCar = { ...car, Disponibilité: !car.Disponibilité };
                await axios.put(`http://localhost:3001/updateCar/${id}`, updatedCar);
                setCars(prevCars =>
                    prevCars.map(c => (c._id === id ? updatedCar : c))
                );
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la disponibilité de la voiture:', error);
        }
    };

    return (
        <div className="car-container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to='/home' className="navbar-title">Gestion de parc</Link>
                </div>

                <div className="button-container">
                    <Link to="/cars" className="btn btn-secondary">Véhicules</Link>
                    <Link to="/missions" className="btn btn-secondary">Missions</Link>
                    <Link to="/carburant" className="btn btn-secondary">Carburant</Link>
                    <Link to="/entretien" className="btn btn-secondary">Entretien</Link>
                </div>
            </nav>

            <header className="bg-dark py-3 d-flex justify-content-between align-items-center">
                <h1 className="text-white m-0">Liste des voitures</h1>
                <div>
                    <Link to="/create" className="btn btn-primary">Ajouter</Link>
                </div>
            </header>

            <div className="container mt-5">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modèle</th>
                                <th>Puissance</th>
                                <th>Numéro de série</th>
                                <th>Image</th>
                                <th>Disponibilité</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => (
                                <tr key={car._id}>
                                    <td>{car.Marque}</td>
                                    <td>{car.Modéle}</td>
                                    <td>{car.Puissance}</td>
                                    <td>{car.Numéro_de_série}</td>
                                    <td><img src={car.Image} alt="Voiture" style={{ maxWidth: "150px" }} /></td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <input
                                                className="form-check-input me-2"
                                                type="checkbox"
                                                id={"flexSwitchCheckChecked" + car._id}
                                                checked={car.Disponibilité}
                                                onChange={() => handleAvailabilityChange(car._id)}
                                            />
                                            <label className="form-check-label" htmlFor={"flexSwitchCheckChecked" + car._id}>
                                                {car.Disponibilité ? "Disponible" : "Non disponible"}
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={`/update/${car._id}`} className="btn btn-primary">Modifier</Link>
                                        <button className="btn btn-danger ms-2" onClick={() => handleDelete(car._id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Cars;
