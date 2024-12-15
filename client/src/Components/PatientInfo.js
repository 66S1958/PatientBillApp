import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
const PatientInfo = () => {
  const [listOfPatients, setlistOfPatients] = useState([]);
  const [countRecords, setcountRecords] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/list");
        const localPatients = JSON.parse(
          localStorage.getItem("localPatients") || "[]"
        );
        const deletedPatients = JSON.parse(
          localStorage.getItem("deletedPatients") || "[]"
        );
        const combinedPatients = [
          ...response.data.patients,
          ...localPatients,
        ].filter((patient) => !deletedPatients.includes(patient.patId));
        setlistOfPatients(combinedPatients);
        setcountRecords(combinedPatients.length);
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching patients.");
      }
    };
    fetchPatients();
  }, []);

  const deletePatient = (id) => {
    const updatedList = listOfPatients.filter(
      (patient) => patient.patId !== id
    );
    setlistOfPatients(updatedList);
    setcountRecords(updatedList.length);

    const deletedPatients = JSON.parse(
      localStorage.getItem("deletedPatients") || "[]"
    );
    deletedPatients.push(id);
    localStorage.setItem("deletedPatients", JSON.stringify(deletedPatients));

    const localPatients = JSON.parse(
      localStorage.getItem("localPatients") || "[]"
    );
    const updatedLocalPatients = localPatients.filter(
      (patient) => patient.patId !== id
    );
    localStorage.setItem("localPatients", JSON.stringify(updatedLocalPatients));
  };

  const handleCompletion = (patient) => {
    // Remove the completed patient from the list
    deletePatient(patient.patId);

    // Navigate to AddAppa with the patient data
    navigate("/add", {
      state: { patient }, // Pass the patient data to the AddAppa page
    });
  };

  return (
    <div>
      <h1>Patients Information</h1>
      <table className="table  table-striped-columns" style={{ width: "90%" }}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Address</th>
            <th>Complete Appointment Details</th>
            <th>Delete Patient Information</th>
          </tr>
        </thead>
        <tbody>
          {listOfPatients.map((patient, index) => (
            <tr key={patient._id}>
              <td>{patient.patId}</td>
              <td>{patient.pName}</td>
              <td>{patient.phoneNum}</td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>
                <button
                  id="removeBtn"
                  className="btn btn-info"
                  onClick={() => handleCompletion(patient)}
                >
                  Completion
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => deletePatient(patient.patId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4 style={{ color: "#164562" }}>Number of Request: {countRecords}</h4>
      </div>
    </div>
  );
};

export default PatientInfo;
