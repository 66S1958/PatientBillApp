import mongoose from "mongoose";

const PatientSchema = mongoose.Schema({
  patId: {
    type: String,
    require: true,
  },
  pName: {
    type: String,
    require: true,
  },
  phoneNum: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  drName: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  consultFee: {
    type: Number,
    require: true,
  },
  medicPrice: {
    type: Number,
    require: true,
  },
  billAmount: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    require: true,
  },
});

const PatientModel = mongoose.model("patientapp", PatientSchema);

export default PatientModel;
