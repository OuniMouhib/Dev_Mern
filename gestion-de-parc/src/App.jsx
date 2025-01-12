
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateCars from './Car/CreateCars.jsx';
import UpdateCars from './Car/UpdateCars.jsx';
import Cars from './Car/Cars.jsx';
import Missions from './Mission/Mission'; // Changement du nom du composant
import CreateMission from './Mission/CreateMission.jsx';
import UpdateMission from './Mission/UpdateMission.jsx';
import Login from './sign/Login.jsx';
import Signup from './sign/Signup.jsx';
import UpdateCarburant from './Carburant/UpdateCarburant.jsx';
import CreateCarburant from './Carburant/CreateCarburant.jsx';
import Carburant from './Carburant/carburant.jsx';
import Home from './home/home.jsx';
import Createentretien from './entretien/createentretien.jsx';
import Entretien from './entretien/entretien.jsx'
import UpdateEntretien from './entretien/updateentretien.jsx';

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/cars' element={<Cars />} />
          <Route path='/create' element={<CreateCars />} />
          <Route path='/update/:id' element={<UpdateCars />} />
          <Route path='/missions' element={<Missions />} /> {/* Correction du nom du composant */}
          <Route path='/createmission' element={<CreateMission />} />{/* Correction du nom du composant */}
          <Route path='/updatemission/:id' element={<UpdateMission />} />
          <Route path='/createcarburant' element={<CreateCarburant />} />
          <Route path='/carburant' element={<Carburant />} />
          <Route path='/updatecarburant/:id' element={<UpdateCarburant />} />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/createentretien' element={<Createentretien />} />
          <Route path='/entretien' element={<Entretien />} />
          <Route path='/updateentretien/:id' element={<UpdateEntretien />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
