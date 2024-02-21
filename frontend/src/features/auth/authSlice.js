import { createSlice } from "@reduxjs/toolkit";
import { registerUser, signInUser } from "./authAction";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Register User's Extra Reducers
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload; // registration rejected
      })

      //Signin User's Extra Reducers
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload; // registration successful
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload; // registration rejected
      });
  },
});

export default authSlice.reducer;
