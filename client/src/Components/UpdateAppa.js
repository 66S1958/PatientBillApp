import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
const UpdateAppa = () => {
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

  let { id } = useParams(); // Correctly retrieve the patient ID

  const updateAppa = () => {
    Axios.put(`http://localhost:3001/update/${id}`, {
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
        setresponseMsg(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/getPatient/${id}`)
      .then((response) => {
        setpatId(response.data.result.patId);
        setpName(response.data.result.pName);
        setphoneNum(response.data.result.phoneNum);
        setgender(response.data.result.gender);
        setage(response.data.result.age);
        setaddress(response.data.result.address);
        setselectOpation(response.data.result.drName);
        setdate(response.data.result.date);
        setconsultFee(response.data.result.consultFee);
        setmedicPrice(response.data.result.medicPrice);
        setbillAmount(response.data.result.billAmount);
        setdiscount(response.data.result.discount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const calculateBill = () => {
      let totalBillAmount = parseFloat(consultFee) + parseFloat(medicPrice);
      let discountAmount = (totalBillAmount * 0.2).toFixed(2); // 20% discount
      setbillAmount(totalBillAmount.toFixed(2));
      setdiscount(discountAmount);
    };
    calculateBill();
  }, [consultFee, medicPrice]);

  return (
    <div className="row">
      <div className="col-md-10">
        <table className="table table-striped-columns table-co">
          <thead>
            <tr>
              <th colSpan={4} style={{ textAlign: "center" }}>
                <h2>Update Appointment Details</h2>
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
                  value={patId} // Set value to the state
                  onChange={(e) => setpatId(e.target.value)}
                />
              </td>

              <td>Patient Name :</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: 400 }}
                  value={pName} // Set value to the state
                  onChange={(e) => setpName(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Number :</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: 300 }}
                  value={phoneNum} // Set value to the state
                  onChange={(e) => setphoneNum(e.target.value)}
                />
              </td>

              <td>Gender :</td>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setgender(e.target.value)}
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
                    onChange={(e) => setgender(e.target.value)}
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
                  value={age} // Set value to the state
                  onChange={(e) => setage(e.target.value)}
                />
              </td>
              <td>Address :</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: 300 }}
                  value={address} // Set value to the state
                  onChange={(e) => setaddress(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Doctor Name : </td>
              <td>
                <select
                  className="form-control"
                  style={{ width: 400 }}
                  value={selectOpation}
                  onChange={(e) => setselectOpation(e.target.value)}
                >
                  <option value="Dr.Noor">Dr.Noor</option>
                  <option value="Dr.Fatma">Dr.Fatma</option>
                  <option value="Dr.Anwar">Dr.Anwar</option>
                  <option value="Dr.Ahmed">Dr.Ahmed</option>
                </select>
              </td>
              <td>Date :</td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  style={{ width: 400 }}
                  value={date} // Set value to the state
                  onChange={(e) => setdate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Consultation Fee :</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: 400 }}
                  value={consultFee} // Set value to the state
                  onChange={(e) => setconsultFee(e.target.value)}
                />
              </td>

              <td>Medicine Price:</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: 400 }}
                  value={medicPrice} // Set value to the state
                  onChange={(e) => setmedicPrice(e.target.value)}
                />
              </td>
            </tr>

            <h3>Bill Details</h3>

            <h5>Consultation Fee: {consultFee}</h5>
            <h5>Medicine Price: {medicPrice}</h5>
            <h5>Discount: {discount}</h5>
            <h3>Total Bill Amount: {billAmount}</h3>
            <tr className="table">
              <td colSpan={4} style={{ textAlign: "center" }}>
                <button className="btn btn-success" onClick={updateAppa}>
                  Update Appointment
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ color: "blue", textAlign: "center" }}>{responseMsg}</div>
      </div>
    </div>
  );
};

export default UpdateAppa;
