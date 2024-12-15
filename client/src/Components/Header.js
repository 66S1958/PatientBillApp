import { Navbar, Nav, NavItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice.js";
import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import "../App.css";
const Header = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/");
  };

  const isDoctor = email === "66S1958@utas.edu.om";
  const isLoggedIn = Boolean(email);

  return (
    <Navbar className="header">
      <Nav>
        <NavItem>
          <Link to="/">
            <FaHome id="homeLink" />{" "}
          </Link>
        </NavItem>

        {!isLoggedIn && (
          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>
        )}

        {isLoggedIn && isDoctor && (
          <>
            <NavItem>
              <Link to="/PatientInfo">Appointment Request</Link>
            </NavItem>
            <NavItem>
              <Link to="/add"></Link>
            </NavItem>
            <NavItem>
              <Link to="/list">Manage Appointments</Link>
            </NavItem>
          </>
        )}

        {isLoggedIn && !isDoctor && (
          <>
            <NavItem>
              <Link to="/FillInfo">Book Appointment</Link>
            </NavItem>
            <NavItem>
              <Link to="/ViewAppa">View Appointment</Link>
            </NavItem>
          </>
        )}

        {isLoggedIn && (
          <NavItem>
            <Link onClick={handleLogout}>
              <FaSignOutAlt id="logout" />{" "}
            </Link>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
