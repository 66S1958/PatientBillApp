import Axios from "axios";
import { useState, useEffect } from "react";

const PatientInfo = () => {
  //useState for each field in form :
  const [patId, setpatId] = useState("");
  const [pName, setpName] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [gender, setgender] = useState("Female");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");

  /*const PatientInfo = () => {
    Axios.post("http://localhost:3001/addPatient", {
      patId: patId,
      pName: pName,
      phoneNum: phoneNum,
      gender: gender,
      age: age,
      address: address,
    })
    .then((res) => {
      setresponseMsg(res.data);
    })
    .catch((err) => {
      console.log(err);
    });*/
};

return (
  <div className="addAop container bg-light">
    <table className="table table-striped-columns table-primary">
      <thead>
        <tr class="table">
          <th colSpan={4} style={{ textAlign: "center" }}>
            <h3>Add Appointment</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Patient ID :</td>
          <td>
            <input
              type="text"
              className="form-control"
              style={{ width: 400 }}
              onChange={(e) => {
                setpatId(e.target.value);
              }}
            ></input>
          </td>

          <td>Patient Name :</td>
          <td>
            <input
              type="text"
              className="form-control"
              style={{ width: 400 }}
              onChange={(e) => {
                setpName(e.target.value);
              }}
            ></input>
          </td>
        </tr>

        <tr>
          <td>Number :</td>
          <td>
            <input
              type="number"
              className="form-control"
              style={{ width: 300 }}
              onChange={(e) => {
                setphoneNum(e.target.value);
              }}
            ></input>
          </td>

          <td>Gender:</td>
          <td>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => {
                  setgender(e.target.value);
                }}
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
                checked={gender === "Female"}
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </td>
        </tr>

        <tr>
          <td>Age :</td>
          <td>
            <input
              type="number"
              className="form-control"
              style={{ width: 200 }}
              onChange={(e) => {
                setage(e.target.value);
              }}
            ></input>
          </td>
          <td>Address :</td>
          <td>
            <input
              type="text"
              className="form-control"
              style={{ width: 300 }}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            ></input>
          </td>
        </tr>
        <tr className="table">
          <td colSpan={4} style={{ textAlign: "center" }}>
            <button className="btn btn-success" onClick={addPatient}>
              Send My Information to The Doctor
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>{responseMsg}</div>
  </div>
);

export default PatientInfo;
