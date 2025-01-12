import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Carburant() {
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:3001/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des transactions:', error);
        }
    };
   
    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await axios.get('http://localhost:3001/carburantvehicule');
            setTransactions(response.data);
          } catch (error) {
            console.error('Erreur lors du chargement des  véhicule:', error);
          }
        };
        fetchTransactions();
      }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/deletecarburant/${id}`);
            fetchTransactions(); // Rafraîchir la liste des transactions après la suppression réussie
        } catch (error) {
            console.error('Erreur lors de la suppression de la transaction de carburant:', error);
        }
    };

    return (
        <div>
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
            <h1>Liste des transactions de carburant</h1>
            <Link to="/createcarburant" className="btn btn-primary">Ajouter une transaction</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Quantité</th>
                        <th>Coût</th>
                        <th>Véhicule</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.quantite}</td>
                            <td>{transaction.cout}</td>
                            <td> {transaction.vehicule ? `${transaction.vehicule.Marque} ${transaction.vehicule.Modéle}` : 'Chargement...'} </td>
                            <td>{transaction.date}</td>
                            <td>
                                <Link to={`/updatecarburant/${transaction._id}`} className="btn btn-primary">Modifier</Link>
                                <button className="btn btn-danger ms-2" onClick={() => handleDelete(transaction._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Carburant;
