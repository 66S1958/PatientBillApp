import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patId: { type: String, required: true }, // Patient ID
  pName: { type: String, required: true }, // Patient Name
  email: { type: String, required: true }, // Patient Email
  phoneNum: { type: String },
  gender: { type: String },
  age: { type: Number },
  address: { type: String },
  drName: { type: String },
  date: { type: Date },
  consultFee: { type: Number },
  medicPrice: { type: Number },
  billAmount: { type: Number },
  discount: { type: Number },
});

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
