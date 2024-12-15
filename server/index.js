import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import PatientModel from "./Models/Patient.js";
import bcrypt from "bcrypt";
import PostModel from "./Models/Posts.js";
import UserModel from "./Models/UserModel.js";
import * as ENV from "./config.js";
//import AppointmentModel from "./Models/Appointment .js";

const app = express();

app.use(express.json());
app.use(cors());

//Database coneections:
const connectString =
  //`mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=PatientCluster`;
  "mongodb+srv://PatientApp:PatientApp@patientcluster.8e82h.mongodb.net/PatientApp?retryWrites=true&w=majority&appName=PatientCluster";
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/addPatient", async (req, res) => {
  const {
    patId,
    pName,
    phoneNum,
    gender,
    age,
    address,
    drName,
    date,
    consultFee,
    medicPrice,
    billAmount,
    discount,
  } = req.body;

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
app.get("/getPatient/:id", async (req, res) => {
  // Change Pid to id
  try {
    const id = req.params.id; // Use the correct parameter name
    const result = await PatientModel.findById(id);
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

//........................................
app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found!" }); // Return a 404 if user is not found
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" }); // 401 for failed authentication
    }

    res.status(200).json({ user, message: "Login successful." }); // Return a success message with the user info
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

//POST API - savePost
app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;
    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });
    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET API - getPost
app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});
    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/updateAppointment/:id", async (req, res) => {
  try {
    const updatedAppointment = await PatientModel.findByIdAndUpdate(
      req.params.id, // ID from URL
      req.body, // New data from the client
      { new: true } // Return the updated document
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(updatedAppointment); // Send the updated data back to the client
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// Example route for handling fetching appointments
app.get("/list2", async (req, res) => {
  try {
    const appointments = await PatientModel.find({}); // Adjust based on your model
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found." });
    }
    res.status(200).json({ appointments });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching appointments." });
  }
});
/*
app.listen(3001, () => {
  console.log("Yor are Connected");
});*/
const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
