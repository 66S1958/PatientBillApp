import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Home from "./Components/Home";
import AddAppa from "./Components/AddAppa";
import ManageAppa from "./Components/ManageAppa";
import Footer from "./Components/Footer";
import UpdateAppa from "./Components/UpdateAppa";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PatientInfo from "./Components/PatientInfo";
import ViewAppa from "./Components/ViewAppa";
import Header from "./Components/Header";
import FillInfo from "./Components/FillInfo";
import CompleteAppointment from "./Components/CompleteAppointment";

const App = () => {
  const email = useSelector((state) => state.users.user.email);

  return (
    <div>
      <Container fluid>
        <Router>
          <Row>
            <Header email={email} />
          </Row>

          <Row className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/FillInfo" element={<FillInfo />} />
              <Route path="/PatientInfo" element={<PatientInfo />} />
              <Route path="/ViewAppa" element={<ViewAppa />} />
              <Route path="/add" element={<AddAppa />} />
              <Route path="/list" element={<ManageAppa />} />
              <Route path="/update/:id" element={<UpdateAppa />} />
              <Route path="/complete/:id" element={<CompleteAppointment />} />
            </Routes>
          </Row>

          <Row>
            <Footer />
          </Row>
        </Router>
      </Container>
    </div>
  );
};

export default App;

/*import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import Home from "./Components/Home";
import AddAppa from "./Components/AddAppa";
import ManageAppa from "./Components/ManageAppa";
import Footer from "./Components/Footer";
import UpdateAppa from "./Components/UpdateAppa";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PatientInfo from "./Components/PatientInfo";
import ViewAppa from "./Components/ViewAppa";
import Header from "./Components/Header";
import FillInfo from "./Components/FillInfo";

const App = () => {
  const email = useSelector((state) => state.users.user.email);

  return (
    <div>
      <Container fluid>
        <Router>
          <Row>
            <Header email={email} />
          </Row>

          <Row className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/FillInfo" element={<FillInfo />} />
              <Route path="/PatientInfo" element={<PatientInfo />} />
              <Route path="/ViewAppa" element={<ViewAppa />} />
              <Route path="/add" element={<AddAppa />} />
              <Route path="/list" element={<ManageAppa />} />
              <Route path="/update/:id" element={<UpdateAppa />} />
            </Routes>
          </Row>

          <Row>
            <Footer />
          </Row>
        </Router>
      </Container>
    </div>
  );
};

export default App;

/*import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import Home from "./Components/Home";
import AddAppa from "./Components/AddAppa";
import ManageAppa from "./Components/ManageAppa";
import Footer from "./Components/Footer";
import UpdateAppa from "./Components/UpdateAppa";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PatientInfo from "./Components/PatientInfo";
import ViewAppa from "./Components/ViewAppa";
import Header from "./Components/Header";
import FillInfo from "./Components/FillInfo";

const App = () => {
  const email = useSelector((state) => state.users.user.email);

  return (
    <div>
      <Container fluid>
        <Router>
          <Row>
            <Header />
          </Row>

          <Row className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/FillInfo" element={<FillInfo />} />
              <Route path="/PatientInfo" element={<PatientInfo />} />
              <Route path="/ViewAppa" element={<ViewAppa />} />
              <Route path="/add" element={<AddAppa />} />
              <Route path="/list" element={<ManageAppa />} />
              <Route path="/update/:id" element={<UpdateAppa />} />
            </Routes>
          </Row>

          <Row>
            <Footer />
          </Row>
        </Router>
      </Container>
    </div>
  );
};

export default App;*/
