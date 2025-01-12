import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateCars() {
    const { id } = useParams();
    const [Marque, setMarque] = useState("");
    const [Modéle, setModéle] = useState("");
    const [Puissance, setPuissance] = useState("");
    const [Numéro_de_série, setNuméro_de_série] = useState("");
    const [Image, setImage] = useState("");
    const [Disponibilité, setDisponibilité] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getCar/' + id)
            .then(result => {
                console.log(result.data)
                setMarque(result.data.Marque);
                setModéle(result.data.Modéle);
                setPuissance(result.data.Puissance);
                setNuméro_de_série(result.data.Numéro_de_série);
                setImage(result.data.Image);
                setDisponibilité(result.data.Disponibilité === 'Disponible');
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();

        axios.put("http://localhost:3001/updateCar/" + id, { Marque, Modéle, Puissance, Numéro_de_série, Image, Disponibilité })
            .then(result => {
                console.log(result)
                navigate('/cars')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
             
               
            <div className="w-100 bg-white rounded p-3">
                <form onSubmit={update}>
                    <h2>Modifier une voiture</h2>
                    <div className="mb-2">
                        <label htmlFor="marque">Marque</label>
                        <input type="text" id="marque" value={Marque} onChange={(e) => setMarque(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="modèle">Modéle</label>
                        <input type="text" id="modèle" value={Modéle} onChange={(e) => setModéle(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="puissance">Puissance</label>
                        <input type="text" id="puissance" value={Puissance} onChange={(e) => setPuissance(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="numéro_série">Numéro de série</label>
                        <input type="text" id="numéro_série" value={Numéro_de_série} onChange={(e) => setNuméro_de_série(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="image">Image</label>
                        <input type="url" id="image" value={Image} onChange={(e) => setImage(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="disponibilité">Disponibilité</label>
                        <input
                            type="checkbox"
                            id="disponibilité"
                            defaultChecked={Disponibilité}
                            onChange={(e) => setDisponibilité(e.target.checked)}
                            className="form-check-input"
                        />


                    </div>

                    <button type="submit" className="btn btn-success">update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCars;
