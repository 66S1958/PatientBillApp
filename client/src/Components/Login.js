import { Container, Row, Col, Form } from "reactstrap";
import { Button, Label, FormGroup, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [userType, setUserType] = useState("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);

    if (selectedType === "Doctor") {
      setEmail("66S1958@utas.edu.om");
    } else {
      setEmail("");
    }
  };

  const handleLogin = () => {
    if (userType === "Doctor" && email === "66S1958@utas.edu.om") {
      navigate("/addappa");
    } else {
      alert("Invalid login details. Please try again.");
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        <Form className="div-form">
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
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
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
                />
              </FormGroup>
            </Col>
          </Row>

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
