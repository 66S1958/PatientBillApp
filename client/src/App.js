import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./Components/Home";
import AddAppa from "./Components/AddAppa";
import ManageAppa from "./Components/ManageAppa";
import Footer from "./Components/Footer";
import UpdateAppa from "./Components/UpdateAppa";
import Login from "./Components/Login";
import Register from "./Components/Register";

const App = () => {
  return (
    <div>
      <Router>
        <div className="header">
          <nav class="nav">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/add" className="nav-link">
              Add New Appointment
            </Link>
            <Link to="/list" className="nav-link">
              Manage Patient Appointment
            </Link>
          </nav>
        </div>
        <br></br>
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route path="/add" element={<AddAppa />}></Route>
            <Route path="/list" element={<ManageAppa />}></Route>
            <Route path="/update/:id" element={<UpdateAppa />}></Route>
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
