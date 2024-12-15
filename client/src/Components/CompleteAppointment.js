import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
const CompleteAppointment = () => {
  const [appointment, setAppointment] = useState({
    pName: "",
    phoneNum: "",
    gender: "",
    age: "",
    address: "",
    drName: "",
    date: "",
    consultFee: "",
    medicPrice: "",
    billAmount: "",
    discount: "",
  });
  const { id } = useParams(); // Get the patient ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3001/appointment/${id}`
        );
        setAppointment(response.data); // Pre-fill the form with patient details
      } catch (err) {
        console.log(err);
        alert("An error occurred while fetching appointment details.");
      }
    };
    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", appointment); // Log the data before sending
    try {
      const response = await Axios.put(
        `http://localhost:3001/updateAppointment/${id}`,
        appointment
      );
      alert("Appointment updated successfully.");
      navigate("/manage");
    } catch (err) {
      console.error(
        "Error while updating appointment:",
        err.response?.data || err.message
      );
      alert("An error occurred while updating appointment.");
    }
  };

  return (
    <div className="row">
      <div className="col-md-10">
        <form onSubmit={handleSubmit} className="form-control">
          <table className="table table-striped-columns table-primary">
            <thead>
              <tr>
                <th colSpan={4} style={{ textAlign: "center" }}>
                  <h2>Complete Appointment Details</h2>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Patient Name:</td>
                <td>
                  <input
                    type="text"
                    name="pName"
                    value={appointment.pName}
                    onChange={handleChange}
                    placeholder="Patient Name"
                  />
                </td>

                <td>Number:</td>
                <td>
                  <input
                    type="number"
                    name="phoneNum"
                    value={appointment.phoneNum}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </td>
              </tr>

              <tr>
                <td>Gender:</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={appointment.gender === "Male"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={appointment.gender === "Female"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td>Age:</td>
                <td>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    style={{ width: 200 }}
                    value={appointment.age}
                    onChange={handleChange}
                    placeholder="Age"
                  />
                </td>
                <td>Address:</td>
                <td>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={appointment.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </td>
              </tr>

              <tr>
                <td>Doctor Name:</td>
                <td>
                  <input
                    type="text"
                    name="drName"
                    value={appointment.drName}
                    onChange={handleChange}
                    placeholder="Doctor Name"
                  />
                </td>
                <td>Date:</td>
                <td>
                  <input
                    type="date"
                    name="date"
                    value={appointment.date}
                    onChange={handleChange}
                    placeholder="Date"
                  />
                </td>
              </tr>

              <tr>
                <td>Consultation Fee:</td>
                <td>
                  <input
                    type="number"
                    name="consultFee"
                    value={appointment.consultFee}
                    onChange={handleChange}
                    placeholder="Consultation Fee"
                  />
                </td>

                <td>Medicine Price:</td>
                <td>
                  <input
                    type="number"
                    name="medicPrice"
                    value={appointment.medicPrice}
                    onChange={handleChange}
                    placeholder="Medicine Price"
                  />
                </td>
              </tr>

              <tr>
                <td>Bill Amount:</td>
                <td>
                  <input
                    type="number"
                    name="billAmount"
                    value={appointment.billAmount}
                    onChange={handleChange}
                    placeholder="Bill Amount"
                  />
                </td>

                <td>Discount:</td>
                <td>
                  <input
                    type="number"
                    name="discount"
                    value={appointment.discount}
                    onChange={handleChange}
                    placeholder="Discount"
                  />
                </td>
              </tr>

              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  <button type="submit" className="button">
                    Update Appointment
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default CompleteAppointment;
