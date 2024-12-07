import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ManageAppa = () => {
  const [listOfPatients, setlistOfPatients] = useState([]);
  const [countRecords, setcountRecords] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/list");
        setlistOfPatients(response.data.patients);
        setcountRecords(response.data.count);
      } catch (err) {
        console.log(err);
        alert("An error occurred while fetching patients.");
      }
    };

    fetchPatients();
  }, []);

  const deleteAppa = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recored?"
    );
    if (confirmDelete) {
      //specify the URL
      Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
        //remove the selected record/document from the list
        setlistOfPatients(
          listOfPatients.filter((val) => {
            return val._id != id;
          })
        );
        console.log(response);
        alert(response.data.message);
        setcountRecords(response.data.countRecords);
      });
    }
  };
  return (
    <div className="">
      <h1>Manage Patients Appointments</h1>

      <table className="table table-striped" style={{ width: "90%" }}>
        <thead className="table-primary">
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Address</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Consultation Fee</th>
            <th>Medicine Price</th>
            <th>Bill Amount</th>
            <th>Discount</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {listOfPatients.map((patients) => (
            <tr>
              <td>{patients.patId}</td>
              <td>{patients.pName}</td>
              <td>{patients.phoneNum}</td>
              <td>{patients.gender}</td>
              <td>{patients.age}</td>
              <td>{patients.address}</td>
              <td>{patients.drName}</td>
              <td>{patients.date}</td>
              <td>{patients.consultFee}</td>
              <td>{patients.medicPrice}</td>
              <td>{patients.billAmount}</td>
              <td>{patients.discount}</td>

              <td>
                <Link to={`/update/${patients._id}`} className="nav-link">
                  <button className="btn btn-info">Update</button>
                </Link>
              </td>
              <td>
                {""}
                <button
                  id="removeBtn"
                  className="btn btn-warning"
                  onClick={() => deleteAppa(patients._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4 style={{ color: "green" }}>
          Number of Appointments: {countRecords}
        </h4>
      </div>
    </div>
  );
};

export default ManageAppa;
