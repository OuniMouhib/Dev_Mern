import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./entretien.css";// Importez Link depuis React Router

function Entretien() {
  const [entretiens, setEntretiens] = useState([]);

  useEffect(() => {
    const fetchEntretiens = async () => {
      try {
        const response = await axios.get("http://localhost:3001/entretiens");
        setEntretiens(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des entretiens :", error);
      }
    };

    fetchEntretiens();
  }, []);

  useEffect(() => {
    const fetchEntretiensv = async () => {
      try {
        const response = await axios.get('http://localhost:3001/entretienvehicule');
        setEntretiens(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des  véhicule:', error);
      }
    };
    fetchEntretiensv();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/deleteentretiens/${id}`);
      console.log(response.data);
      // Mettez à jour l'état après la suppression
      setEntretiens(entretiens.filter(entretien => entretien._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l entretien', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      // Envoyez une requête PUT pour la mise à jour
      const response = await axios.put(`http://localhost:3001/updateentretiens/${id}`, { /* Données à mettre à jour */ });
      console.log(response.data);
      // Mettez à jour l'état après la modification
      // Vous devrez peut-être refetch les données ici ou mettre à jour l'élément spécifique dans l'état
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l entretien', error);
    }
  };
 

  return (
    <div className="car-container">
      <nav className="navbar">
        <div className="navbar-brand">

          <Link to='/home' className="navbar-title">Gestion de parc</Link>
        </div>




        <div className="button-container">
          <Link to="/cars" className="btn btn-secondary">
            Véhicules
          </Link>
          <Link to="/missions" className="btn btn-secondary">
            Missions
          </Link>
          <Link to="/carburant" className="btn btn-secondary">
            Carburant
          </Link>
          <Link to="/entretien" className="btn btn-secondary">
            Entretien
          </Link>
        </div>


      </nav>
      <header className="bg-dark py-3 d-flex justify-content-between align-items-center">
        <h1 className="text-white m-0">Liste des entretiens</h1>
        <div>
          {/* Utilisez Link pour naviguer vers la page d'ajout */}
          <Link to="/createentretien" className="btn btn-primary">Ajouter</Link>
        </div>
      </header>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Voiture</th>
                    <th>Réparation/Service</th>
                    <th>Coût</th>
                    <th>Délai</th>
                    <th>Actions</th> {/* Ajoutez une colonne pour les actions */}
                  </tr>
                </thead>
                <tbody>
                  {entretiens.map((entretien) => (
                    <tr key={entretien._id}>
                      <td>{entretien.voiture ? `${entretien.voiture.Marque} ${entretien.voiture.Modéle}` : 'Chargement...'} - {entretien.voiture && entretien.voiture.Puissance} - {entretien.voiture && entretien.voiture.Numéro_de_série}</td>
                      <td>{entretien.reparationService}</td>
                      <td>{entretien.cout}</td>
                      <td>{entretien.delai}</td>
                      <td>
                        {/* Enveloppez les boutons dans une div pour les aligner côte à côte */}
                        <div className="d-flex">
                          <Link to={`/updateentretien/${entretien._id}`} className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(entretien._id)}>modifier</Link>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entretien._id)}>Supprimer</button>
                        </div>
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

export default Entretien;
