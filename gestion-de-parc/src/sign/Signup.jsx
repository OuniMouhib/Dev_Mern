import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./signup.css";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/register", { name, email, password })
            .then(result => {
                console.log(result);
                navigate("/home");
            })
            .catch(err => console.log(err));
    }

    return (
        <div >
            <nav className="navbar">
                <div className="navbar-brand">
                    {/* Logo à gauche */}

                    {/* Gestion de parc */}
                    <div className="navbar-title">Gestion de parc</div>
                </div>
                {/* Bouton de connexion à droite */}
                <Link to="/" className="btn btn-primary">
                    Login
                </Link>
            </nav>
            <div className="mo">
                <div className="container">
                    <div className="form-container">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Name'
                                    autoComplete='off'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder='Enter Email'
                                    autoComplete='off'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder='Enter Password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit">Sign Up</button>
                        </form>
                        <p>Already have an account? <Link className="login" to="/">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
