import { Link } from "react-router-dom";
import './home.css';

function Home() {
    return (
        <div className="mouh">
            <div className="home-container">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <Link to='/home' className="navbar-title">Gestion de parc</Link>
                    </div>

                    <div className="button-container">
                        <Link to="/cars" className="btn btn-3">
                            Véhicules
                        </Link>
                        <Link to="/missions" className="btn btn-3">
                            Missions
                        </Link>
                        <Link to="/carburant" className="btn btn-3">
                            Carburant
                        </Link>
                        <Link to="/entretien" className="btn btn-3">
                            Entretien
                        </Link>
                    </div>
                </nav>

                <div className="company-description">
                    <h2>Description</h2>
                    <p>
                        Le but de ce projet est de développer un système de gestion du parc de véhicules pour optimiser lutilisation des ressources et améliorer lefficacité opérationnelle. Contexte : Lentreprise dispose dun parc de véhicules utilisés pour des missions variées. Actuellement, la gestion de ces véhicules est effectuée de manière manuelle, ce qui entraîne des inefficacités et des erreurs.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;