import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEntretien() {
  const { id } = useParams();
  const [entretien, setEntretien] = useState({
    voiture: "",
    reparationService: "",
    cout: "",
    delai: ""
  });
  const [voitures, setVoitures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntretien = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/entretiens/${id}`);
        setEntretien(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'entretien :", error);
      }
    };

    fetchEntretien(); // Appeler la fonction ici
  }, [id]); // Ajouter `id` comme dépendance pour relancer l'effet si `id` change

  useEffect(() => {
    // Récupérer la liste des voitures depuis le serveur lors du chargement initial
    axios.get("http://localhost:3001/all-cars")
      .then(response => {
        // Exclure la disponibilité et l'image des voitures
        const voituresSansDetails = response.data.map(voiture => {
          const { ...voitureSansDetails } = voiture; // Ignorer les variables inutilisées
          return voitureSansDetails;
        });
        setVoitures(voituresSansDetails);
      })
      .catch(error => {
        console.error("Error fetching cars: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntretien(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateentretien/${id}`, entretien)
      .then(response => {
        console.log(response.data);
        navigate('/entretien');
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de l'entretien :", error);
      });
  };

  return (
    <div>
      <h1>Modifier l&apos;entretien</h1> {/* Échapper l'apostrophe */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="selectVoiture" className="form-label">Véhicule :</label>
          <select
            className="form-select"
            id="selectVoiture"
            name="voiture"
            value={entretien.voiture}
            onChange={handleChange}
          >
            <option value="">-- Sélectionner une voiture --</option>
            {voitures.map(voiture => (
              <option key={voiture._id} value={voiture._id}>
                {voiture.Marque} - {voiture.Modéle} - {voiture.Puissance} - {voiture.Numéro_de_série}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="reparationService" className="form-label">Réparation/Service</label>
          <input
            type="text"
            className="form-control"
            id="reparationService"
            name="reparationService"
            value={entretien.reparationService}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cout" className="form-label">Coût</label>
          <input
            type="number"
            className="form-control"
            id="cout"
            name="cout"
            value={entretien.cout}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="delai" className="form-label">Délai</label>
          <input
            type="text"
            className="form-control"
            id="delai"
            name="delai"
            value={entretien.delai}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
    </div>
  );
}

export default UpdateEntretien;