import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './car.css';
function CreateCars() {
    const [Marque, setMarque] = useState()
    const [Modéle, setModéle] = useState()
    const [Puissance, setPuissance] = useState()
    const [Numéro_de_série, setNuméro_de_série] = useState()
    const [Image, setImage] = useState()
    const [Disponibilité, setDisponibilité] = useState(false);


    const navigate = useNavigate()
    const Valider = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/CreateCars", { Marque, Modéle, Puissance, Numéro_de_série, Image, Disponibilité })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (

        <div className="d-flex vh-150 bg-primary justify-content-center align-items-center">

            <div className="w-100 bg-white rounded p-3">
                <form onSubmit={Valider} >
                    <header className="bg-dark py-3 d-flex justify-content-between align-items-center">
                        <h1 className="text-white m-0">Liste des entretiens</h1>
                        <div>
                            {/* Utilisez Link pour naviguer vers la page d'ajout */}

                        </div>
                    </header>
                    <div className="mb-2">
                        <label htmlFor="">Marque</label>
                        <input type="text" placeholder="Entrer le nom de la voiture" className="form-control"
                            onChange={(e) => setMarque(e.target.value)} />

                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Modéle</label>
                        <input type="text" placeholder="Entrer le Modéle de la voiture" className="form-control" onChange={(e) => setModéle(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">	Puissance</label>
                        <input type="text" placeholder="Entrer le Puissance de la voiture" className="form-control" onChange={(e) => setPuissance(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Numéro de série</label>
                        <input type="text" placeholder="Entrer le Numéro de série de la voiture" className="form-control" onChange={(e) => setNuméro_de_série(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Image</label>
                        <input type="url" placeholder="Entrer l'url d'image de la voiture" className="form-control" onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Disponibilité</label>
                        <input
                            type="checkbox"
                            checked={Disponibilité} // Utilisez directement la variable d'état Disponibilité
                            onChange={(e) => setDisponibilité(e.target.checked)} // Met à jour l'état de la disponibilité en fonction de l'état de la case à cocher
                            className="form-check-input" // Classe Bootstrap pour les cases à cocher
                        />
                    </div>

                    <button className="btn btn-success">Valider</button>
                </form>
            </div>

        </div>

    )
}
export default CreateCars;