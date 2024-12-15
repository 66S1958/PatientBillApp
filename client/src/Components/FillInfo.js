import { useState } from "react";
import "../App.css";

const FillInfo = () => {
  const [patId, setpatId] = useState("");
  const [pName, setpName] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [gender, setgender] = useState("Female");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const [errors, setErrors] = useState({});

  // Validation function
  const validateFields = () => {
    const newErrors = {};

    if (!patId.trim()) newErrors.patId = "Patient ID is required.";
    if (!pName.trim()) newErrors.pName = "Patient Name is required.";
    if (!phoneNum.trim()) newErrors.phoneNum = "Phone Number is required.";
    if (!age.trim() || isNaN(age) || age <= 0)
      newErrors.age = "Valid Age is required.";
    if (!address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const addPatientLocally = () => {
    if (!validateFields()) {
      setResponseMsg("Please fill in all the required fields.");
      return;
    }

    const newPatient = {
      patId,
      pName,
      phoneNum,
      gender,
      age,
      address,
    };

    // Save the patient locally
    const savedPatients = JSON.parse(
      localStorage.getItem("localPatients") || "[]"
    );
    savedPatients.push(newPatient);
    localStorage.setItem("localPatients", JSON.stringify(savedPatients));

    setResponseMsg("Your Information has been sent successfully.");
    clearForm();
  };

  // Clear the form after submission
  const clearForm = () => {
    setpatId("");
    setpName("");
    setphoneNum("");
    setgender("Female");
    setage("");
    setaddress("");
    setErrors({});
  };

  return (
    <>
      <table className="table table-striped-columns">
        <thead>
          <tr>
            <th colSpan={4} style={{ textAlign: "center" }}>
              <h2>Fill Your Information</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Patient ID:</td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your ID"
                value={patId}
                onChange={(e) => setpatId(e.target.value)}
              />
              <p className="error">{errors.patId}</p>
            </td>

            <td>Patient Name:</td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                value={pName}
                onChange={(e) => setpName(e.target.value)}
              />
              <p className="error">{errors.pName}</p>
            </td>
          </tr>

          <tr>
            <td>Phone Number:</td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your Phone Number"
                value={phoneNum}
                onChange={(e) => setphoneNum(e.target.value)}
              />
              <p className="error">{errors.phoneNum}</p>
            </td>

            <td>Gender:</td>
            <td>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setgender(e.target.value)}
                />
                Male
              </label>{" "}
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setgender(e.target.value)}
                />
                Female
              </label>
            </td>
          </tr>

          <tr>
            <td>Age:</td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setage(e.target.value)}
              />
              <p className="error">{errors.age}</p>
            </td>

            <td>Address:</td>
            <td>
              <input
                type="text"
                className="form-control"
                value={address}
                placeholder="Enter your Address"
                onChange={(e) => setaddress(e.target.value)}
              />
              <p className="error">{errors.address}</p>
            </td>
          </tr>

          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              <button className="btn btn-success" onClick={addPatientLocally}>
                Send My Information to The Doctor
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {responseMsg && <div>{responseMsg}</div>}
    </>
  );
};

export default FillInfo;
