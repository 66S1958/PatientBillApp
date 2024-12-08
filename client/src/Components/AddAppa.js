import Axios from "axios";
import { useState, useEffect } from "react";

const AddAppa = () => {
  //useState for each field in form :
  const [patId, setpatId] = useState("");
  const [pName, setpName] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [gender, setgender] = useState("Female");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");
  const [selectOpation, setselectOpation] = useState("Dr.Fatma");
  const [date, setdate] = useState("");
  const [consultFee, setconsultFee] = useState(0);
  const [medicPrice, setmedicPrice] = useState(0);
  const [billAmount, setbillAmount] = useState("0 OMR");
  const [discount, setdiscount] = useState("0 OMR");
  const [responseMsg, setresponseMsg] = useState("");

  useEffect(() => {
    const calculateBill = () => {
      let billAmount = parseFloat(consultFee) + parseFloat(medicPrice);
      let discount = (billAmount * 0.2).toFixed(2); // 20% discount
      setbillAmount(billAmount);
      setdiscount(discount);
    };
    calculateBill();
  }, [consultFee, medicPrice, billAmount, discount]);

  const addPatient = () => {
    Axios.post("http://localhost:3001/addPatient", {
      patId: patId,
      pName: pName,
      phoneNum: phoneNum,
      gender: gender,
      age: age,
      address: address,
      drName: selectOpation,
      date: date,
      consultFee: consultFee,
      medicPrice: medicPrice,
      billAmount: billAmount,
      discount: discount,
    })
      .then((res) => {
        setresponseMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

          <br></br>

          <tr>
            <td>Doctor Name : </td>
            <td>
              <select
                className="form-control"
                style={{ width: 400 }}
                value={selectOpation}
                onChange={(e) => {
                  setselectOpation(e.target.value);
                }}
              >
                <option value="Dr.Noor">Dr.Noor</option>
                {/*<option value="Dr.Fatma">Dr.Fatma</option>
                <option value="Dr.Anwar">Dr.Anwar</option>
                <option value="Dr.Ahmed">Dr.Ahmed</option>*/}
              </select>
            </td>
            <td>Date :</td>
            <td>
              <input
                type="date"
                className="form-control"
                style={{ width: 400 }}
                onChange={(e) => {
                  setdate(e.target.value);
                }}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Consultation Fee :</td>
            <td>
              <input
                type="text"
                value={consultFee}
                className="form-control"
                style={{ width: 400 }}
                onChange={(e) => {
                  setconsultFee(e.target.value);
                }}
              />
            </td>

            <td>Medicine Price:</td>
            <td>
              <input
                type="text"
                value={medicPrice}
                className="form-control"
                style={{ width: 400 }}
                onChange={(e) => {
                  setmedicPrice(e.target.value);
                }}
              />
            </td>
          </tr>

          <td></td>

          <tr></tr>
          <h3>Bill Detailes</h3>

          <h5>Consultation Fee:{consultFee}</h5>
          <h5>Medicine Price:{medicPrice}</h5>
          <h5>Discount:{discount}</h5>
          <h4>Total Bill Amount:{billAmount}</h4>
          <tr className="table">
            <td colSpan={4} style={{ textAlign: "center" }}>
              <button className="btn btn-success" onClick={addPatient}>
                Add Patient
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div>{responseMsg}</div>
    </div>
  );
};

export default AddAppa;
