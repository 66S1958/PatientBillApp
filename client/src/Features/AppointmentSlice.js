import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  appointments: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// Thunks

// Fetch all appointments
export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async () => {
    try {
      //zconst response = await axios.get("http://localhost:3001/appointments");
      const response = await axios.get(`${ENV.SERVER_URL}/appointments`);
      return response.data; // Return appointments data
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  }
);

// Save a new appointment
export const saveAppointment = createAsyncThunk(
  "appointments/saveAppointment",
  async (appointmentData) => {
    try {
      /*const response = await axios.post(
        "http://localhost:3001/saveAppointment",
        {*/
      const response = await axios.post(`${ENV.SERVER_URL}/saveAppointment`, {
        patId: appointmentData.patId,
        pName: appointmentData.pName,
        phoneNum: appointmentData.phoneNum,
        gender: appointmentData.gender,
        age: appointmentData.age,
        address: appointmentData.address,
        drName: appointmentData.drName,
        date: appointmentData.date,
        consultFee: appointmentData.consultFee,
        medicPrice: appointmentData.medicPrice,
        billAmount: appointmentData.billAmount,
        discount: appointmentData.discount,
      });
      return response.data; // Return the new appointment
    } catch (error) {
      console.error("Error saving appointment:", error);
      throw error;
    }
  }
);

// Slice

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch appointments
      .addCase(getAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload; // Populate the appointments
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Save appointment
      .addCase(saveAppointment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments.unshift(action.payload); // Add the new appointment at the start
      })
      .addCase(saveAppointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;
