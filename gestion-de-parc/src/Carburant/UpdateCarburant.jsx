import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function UpdateCarburant() {
    const [setTransaction] = useState({});
    const [quantite, setQuantite] = useState('');
    const [cout, setCout] = useState('');
    const [vehicule, setVehicule] = useState('');
    const [vehicules, setVehicules] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/transactions/${id}`);
                setTransaction(result.data);
                setQuantite(result.data.quantite);
                setCout(result.data.cout);
                setVehicule(result.data.vehicule);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTransaction();
    }, [id]);

    useEffect(() => {
        const fetchVehicules = async () => {
            try {
                const response = await axios.get('http://localhost:3001/carburantvehicule');
                setVehicules(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des véhicules :', error);
            }
        };
        fetchVehicules();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTransaction = {
            quantite: quantite,
            cout: cout,
            vehicule: vehicule
        };
        axios.put(`http://localhost:3001/updatecarburant/${id}`, updatedTransaction)
            .then(res => {
                console.log(res);
                navigate('/carburant');
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">
                    <div className="navbar-title">Gestion de parc</div>
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
            <h1>Modifier la transaction de carburant</h1>
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
                    <label htmlFor="vehicule" className="form-label">Véhicule</label>
                    <select className="form-control" id="vehicule" value={vehicule} onChange={(e) => setVehicule(e.target.value)}>
                        <option value="">Sélectionner un véhicule</option>
                        {vehicules.map(vehicule => (
                            <option key={vehicule._id} value={vehicule._id} >{vehicule.Marque} - {vehicule.Modéle}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    );
}

export default UpdateCarburant;
