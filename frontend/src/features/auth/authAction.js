import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//AsyncThunk basically calls the API from backend

//SignUp API call:
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        email,
        password,
      });
      return response.data;
      // console.log("Signup response token", response.data.token);
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//Signin API call:
export const signInUser = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/signin", {
        email,
        password,
      });
      return response.data;
      // console.log("Login Respone", response);
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//Update user API:
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put("http://localhost:3001/users", {
        formData,
      });
      return response.data.updatedUser;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
