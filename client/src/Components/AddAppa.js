import Axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
const AddAppa = () => {
  const { state } = useLocation(); // Receive passed patient data
  const navigate = useNavigate();
  const [patId, setpatId] = useState(state.patient.patId); // Set patient ID as read-only
  const [pName, setpName] = useState(state.patient.pName); // Set patient name as read-only
  const [selectOpation, setselectOpation] = useState("Dr.Fatma");
  const [date, setdate] = useState("");
  const [consultFee, setconsultFee] = useState(0);
  const [medicPrice, setmedicPrice] = useState(0);
  const [billAmount, setbillAmount] = useState("0 OMR");
  const [discount, setdiscount] = useState("0 OMR");
  const [responseMsg, setresponseMsg] = useState("");

  useEffect(() => {
    const calculateBill = () => {
      let total = parseFloat(consultFee) + parseFloat(medicPrice);
      let discountAmount = (total * 0.2).toFixed(2);
      setbillAmount(total.toFixed(2));
      setdiscount(discountAmount);
    };
    calculateBill();
  }, [consultFee, medicPrice]);

  const addPatient = () => {
    const combinedData = {
      patId: patId,
      pName: pName,
      ...(state?.patient || {}), // Fallback to empty object if state.patient doesn't exist
      drName: selectOpation,
      date: date,
      consultFee: consultFee,
      medicPrice: medicPrice,
      billAmount: billAmount,
      discount: discount,
    };

    Axios.post("http://localhost:3001/addPatient", combinedData)
      .then((res) => {
        setresponseMsg(res.data);
        navigate("/list"); // Redirect to ManageAppa
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="addAop container bg-light">
      <h3>Add Appointment</h3>
      <table className="table table-striped-columns">
        <tbody>
          <tr>
            <td>Patient ID :</td>
            <td>
              <input
                type="text"
                className="form-control"
                value={patId} // Fixed, cannot change
                readOnly
              />
            </td>

            <td>Patient Name :</td>
            <td>
              <input
                type="text"
                className="form-control"
                value={pName} // Fixed, cannot change
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>Doctor Name : </td>
            <td>
              <select
                className="form-control"
                value={selectOpation}
                onChange={(e) => setselectOpation(e.target.value)}
              >
                <option value="Dr.Fatma">Dr.Fatma</option>
              </select>
            </td>
            <td>Date :</td>
            <td>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setdate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Consultation Fee :</td>
            <td>
              <input
                type="text"
                value={consultFee}
                className="form-control"
                onChange={(e) => setconsultFee(e.target.value)}
              />
            </td>
            <td>Medicine Price:</td>
            <td>
              <input
                type="text"
                value={medicPrice}
                className="form-control"
                onChange={(e) => setmedicPrice(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Bill Details</h3>
      <p>Total Bill Amount: {billAmount} OMR</p>
      <p>Discount: {discount} OMR</p>
      <button className="btn btn-success" onClick={addPatient}>
        Add Patient
      </button>
      <div>{responseMsg}</div>
    </div>
  );
};

export default AddAppa;
