import { Container, Row, Col, Form } from "reactstrap";
import { Button, Label, FormGroup, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice.js";
import "../App.css";
const Login = () => {
  const [userType, setUserType] = useState("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setErrorMessage("");
      navigate("/login");
    }
    if (isSuccess) {
      setErrorMessage(""); // Clear error message if login is successful
      navigate("/"); // Redirect to home or dashboard after successful login
    }
  }, [user, isError, isSuccess, navigate]);

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(login(userData));
  };

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);

    if (selectedType === "Doctor") {
      setEmail("66S1958@utas.edu.om");
      setPassword("66S1958");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="userType">User Type</Label>
                <Input
                  id="userType"
                  name="userType"
                  type="select"
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <option>Patient</option>
                  <option>Doctor</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="eMail">Email</Label>
                <Input
                  id="eMail"
                  name="eMail"
                  placeholder="Enter email..."
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={userType === "Doctor"}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter password..."
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={userType === "Doctor"}
                />
              </FormGroup>
            </Col>
          </Row>

          {errorMessage && (
            <Row>
              <Col md={3}>
                <p className="text-danger">{errorMessage}</p>
              </Col>
            </Row>
          )}

          <Row>
            <Col md={3}>
              <Button color="primary" className="button" onClick={handleLogin}>
                Login
              </Button>
              <p className="smalltext">
                No Account? <Link to="/register">Sign Up</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
