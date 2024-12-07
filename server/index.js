import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import PatientModel from "./Models/Patient.js";

const app = express();

app.use(express.json());
app.use(cors());

//Database coneections:
const connectString =
  "mongodb+srv://PatientApp:PatientApp@patientcluster.8e82h.mongodb.net/PatientApp?retryWrites=true&w=majority&appName=PatientCluster";
// "mongodb+srv://patient:patient12345@patbillisys.fxlhqhw.mongodb.net/patientDb?retryWrites=true&w=majority";

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//exxpress post to add new Patient Appointment
app.post("/addPatient", async (req, res) => {
  const patId = req.body.patId;
  const pName = req.body.pName;
  const phoneNum = req.body.phoneNum;
  const gender = req.body.gender;
  const age = req.body.age;
  const address = req.body.address;
  const drName = req.body.drName;
  const date = req.body.date;
  const consultFee = req.body.consultFee;
  const medicPrice = req.body.medicPrice;
  const billAmount = req.body.billAmount;
  const discount = req.body.discount;

  const patient = new PatientModel({
    patId: patId,
    pName: pName,
    phoneNum: phoneNum,
    gender: gender,
    age: age,
    address: address,
    drName: drName,
    date: date,
    consultFee: consultFee,
    medicPrice: medicPrice,
    billAmount: billAmount,
    discount: discount,
  });
  await patient.save();
  res.send("Appointment Successfully Added");
});

app.get("/list", async (req, res) => {
  const patients = await PatientModel.find({})
    .then(async (patients) => {
      const countPatients = await PatientModel.countDocuments({});
      res.send({ patients, count: countPatients });
    })
    .catch((err) => {
      console.log(err);
    });
});

//express DELETE route for the selected record (the record to be deleted)
app.delete("/delete/:id", async (req, res) => {
  // retrieve the parameter
  const id = req.params.id;
  await PatientModel.findByIdAndDelete(id).exec(); //specify the delete method
  const no = await PatientModel.countDocuments({});

  res.send({ message: "Appointment Deleted", no });
});

//express GET route for the selected record (the record to be updated)
app.get("/getPatient/:Pid", async (req, res) => {
  try {
    // retrieve the parameter
    const id = req.params.id;
    const result = await PatientModel.findById(id); // specify the method to find the record/document
    const count = await PatientModel.countDocuments();
    res.send({ result, count });
  } catch (err) {
    console.error(err);
    res.send({ error: "Internal server error" });
  }
});

//express PUT route to handle the update
app.put("/update/:id", async (req, res) => {
  // retrieve the parameter
  const id = req.params.id;

  // retrieve the data from the request body
  const patId = req.body.patId;
  const pName = req.body.pName;
  const phoneNum = req.body.phoneNum;
  const gender = req.body.gender;
  const age = req.body.age;
  const address = req.body.address;
  const drName = req.body.drName;
  const date = req.body.date;
  const consultFee = req.body.consultFee;
  const medicPrice = req.body.medicPrice;
  const billAmount = req.body.billAmount;
  const discount = req.body.discount;

  try {
    const patientToUpdate = await PatientModel.findOne({ _id: id });

    //update the data
    patientToUpdate.patId = String(patId);
    patientToUpdate.pName = String(pName);
    patientToUpdate.phoneNum = Number(phoneNum);
    patientToUpdate.gender = String(gender);
    patientToUpdate.age = Number(age);
    patientToUpdate.address = String(address);
    patientToUpdate.drName = String(drName);
    patientToUpdate.date = String(date);
    patientToUpdate.consultFee = Number(consultFee);
    patientToUpdate.medicPrice = Number(medicPrice);
    patientToUpdate.billAmount = Number(billAmount);
    patientToUpdate.discount = Number(discount);

    await patientToUpdate.save();

    res.send({ msg: "Record Updated" });
  } catch (err) {
    console.error(err);
    res.send({ error: "Failed to update Appointment record" });
  }
});

app.listen(3001, () => {
  console.log("Yor are Connected");
});
