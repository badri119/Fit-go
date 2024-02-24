import React, { useState } from "react";
import image from "../extras/background.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authAction";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (pass !== cpass) {
        setError("Passwords do not match");
        return;
      }

      // Dispatch registerUser action
      const action = await dispatch(registerUser({ email, password: pass }));

      // Check if the action contains an error
      if (action.error) {
        setError(action.payload); // Set error message received from backend
        // console.log(action.payload);
      } else {
        // console.log(action.payload);
        navigate("/");
      }
    } catch (err) {
      // Handle other unexpected errors
      console.error("Error during registration:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center flex-col"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="border-2 border-slate-950 border-solid rounded-md bg-slate-200 md:bg-white shadow-md h-3/6 md:h-2/3 md:w-1/3 justify-center pt-7">
        <h1 className="text-3xl font-bold text mt-2 text-slate-900 flex justify-center">
          Sign up
        </h1>

        <form
          onSubmit={handleSubmit}
          className="px-5 py-5 flex flex-col text-md font-bold gap-3"
        >
          <TextField
            InputLabelProps={{ required: false }}
            size="30"
            required
            type="email"
            pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
            label="Email"
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            InputLabelProps={{ required: false }}
            required
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />
          <TextField
            InputLabelProps={{ required: false }}
            required
            type="password"
            name="repeatpassword"
            label="Retype Password"
            variant="outlined"
            onChange={(event) => {
              setConfirmPass(event.target.value);
            }}
          />
          <div className="relative mt-2 ">
            {error && (
              <Alert
                severity="error"
                variant="filled"
                className="absolute top-0 left-0 right-0 flex justify-center"
              >
                <p className="font-bold">{error}</p>
              </Alert>
            )}
          </div>
          <div className="flex justify-center mt-14">
            <button className="text-lg p-2 bg-white text-black rounded-md w-32 border-2 hover:bg-black hover:text-white border-black">
              Register
            </button>
          </div>
        </form>

        <p className="flex justify-center font-bold text-lg">
          Existing user?&nbsp;
          <Link
            to="/"
            className="text-green-600 hover:text-sky-600 hover:underline"
          >
            Login here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
