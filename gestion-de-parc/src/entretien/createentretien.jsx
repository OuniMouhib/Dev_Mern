import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEntretien() {
    const [voitures, setVoitures] = useState([]);
    const [selectedVoiture, setSelectedVoiture] = useState("");
    const [reparationService, setReparationService] = useState("");
    const [cout, setCout] = useState(0);
    const [delai, setDelai] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer la liste des voitures depuis le serveur lors du chargement initial
        axios.get("http://localhost:3001/all-cars")
            .then(response => {
                // Exclure la disponibilité et l'image des voitures
                const voituresSansDetails = response.data.map(voiture => {
                    const {  ...voitureSansDetails } = voiture; // Ignorer les variables inutilisées
                    return voitureSansDetails;
                });
                setVoitures(voituresSansDetails);
            })
            .catch(error => {
                console.error("Error fetching cars: ", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntretien = {
            voiture: selectedVoiture,
            reparationService,
            cout,
            delai
        };

        axios.post("http://localhost:3001/postentretiens", newEntretien)
            .then(response => {
                console.log(response.data);
                navigate('/entretien');
            })
            .catch(error => {
                console.error("Error creating entretien: ", error);
            });
    };

    return (
        <div className="w-50 bg-white rounded p-4">
            <h2 className="mb-4">Ajouter un nouveau entretien</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="selectVoiture" className="form-label">Choisir une voiture</label>
                    <select
                        className="form-select"
                        id="selectVoiture"
                        value={selectedVoiture}
                        onChange={(e) => setSelectedVoiture(e.target.value)}
                    >
                        <option value="">-- Sélectionner une voiture --</option>
                        {voitures.map(voiture => (
                            <option key={voiture._id} value={voiture._id}>{voiture.Marque} - {voiture.Modéle}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="reparationService" className="form-label">Réparation/Service</label>
                    <input
                        type="text"
                        className="form-control"
                        id="reparationService"
                        value={reparationService}
                        onChange={(e) => setReparationService(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cout" className="form-label">Coût</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cout"
                        value={cout}
                        onChange={(e) => setCout(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="delai" className="form-label">Délai</label>
                    <input
                        type="text"
                        className="form-control"
                        id="delai"
                        value={delai}
                        onChange={(e) => setDelai(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Valider</button>
            </form>
        </div>
    );
}

export default CreateEntretien;