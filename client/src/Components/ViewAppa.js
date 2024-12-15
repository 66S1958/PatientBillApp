import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Collapse,
  Button,
} from "reactstrap";
import "../App.css";
const ViewAppa = ({ id }) => {
  const [listOfPatients, setListOfPatients] = useState(null);
  const [error, setError] = useState(null);
  const [openDetails, setOpenDetails] = useState({}); // State to track which patient's details are expanded

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/list2");
        console.log("Appointments response:", response.data);

        if (
          response.data.appointments &&
          response.data.appointments.length > 0
        ) {
          setListOfPatients(response.data.appointments);
        } else {
          setError("No appointments found.");
        }
      } catch (err) {
        console.log("Error fetching appointments:", err);
        setError("An error occurred while fetching appointments.");
      }
    };

    fetchAppointments();
  }, []);

  const toggleDetails = (patId) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [patId]: !prevState[patId], // Toggle the clicked patient's details
    }));
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!listOfPatients) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Loading appointment details...</p>
        <Spinner style={{ width: "3rem", height: "3rem" }} color="primary" />
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-center mb-4">Appointment Details</h1>

      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Table hover responsive striped>
                <thead className="table-primary">
                  <tr>
                    <th>Patient Name</th>
                    <th> Gender</th>
                    <th> Age</th>
                    <th>Doctor Name</th>
                    <th>Appointment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfPatients.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    listOfPatients.map((patient) => (
                      <React.Fragment key={patient.patId}>
                        <tr>
                          <td>
                            <Button
                              color="link"
                              onClick={() => toggleDetails(patient.patId)}
                              style={{ textDecoration: "none" }}
                            >
                              {patient.pName}
                            </Button>
                          </td>
                          <td>{patient.gender}</td>
                          <td>{patient.age}</td>
                          <td>{patient.drName}</td>
                          <td>{patient.date}</td>
                        </tr>

                        <tr>
                          <td colSpan="6">
                            <Collapse isOpen={openDetails[patient.patId]}>
                              <div>
                                <h5>Additional Details:</h5>
                                <ul>
                                  <li>
                                    <strong>Phone Number:</strong>{" "}
                                    {patient.phoneNum}
                                  </li>
                                  <li>
                                    <strong>Address:</strong> {patient.address}
                                  </li>
                                  <li>
                                    <strong>Consultation Fee</strong>{" "}
                                    {patient.consultFee}
                                  </li>

                                  <li>
                                    <strong>Medicine Price:</strong>{" "}
                                    {patient.medicPrice}
                                  </li>
                                  <li>
                                    <strong>Bill Amount:</strong>{" "}
                                    {patient.billAmount}
                                  </li>
                                  <li>
                                    <strong>Discount:</strong>{" "}
                                    {patient.discount}
                                  </li>
                                </ul>
                              </div>
                            </Collapse>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewAppa;
