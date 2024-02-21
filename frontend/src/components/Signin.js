import React, { useState } from "react";
import image from "../extras/background.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInUser } from "../features/auth/authAction";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import bike from "../extras/giphy.gif";
import { useCookies } from "react-cookie";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Dispatch registerUser action
      const action = await dispatch(signInUser({ email, password: pass }));
      // console.log(action.payload);
      setCookie("Token", action.payload.token);

      // Check if the action contains an error
      if (action.error) {
        setError(action.payload); // Set error message received from backend
      } else {
        // If registration is successful, navigate to details page and setcookie:
        // console.log(action.payload.token);
        const firstTimeUser = action.payload.firstTimeUser;
        if (firstTimeUser === true) {
          navigate("/details");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      // Handle other unexpected errors
      console.error("Error during registration:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="sm:h-screen sm:flex sm:justify-center sm:items-start sm:flex-col sm:bg-black hidden">
        <div className="w-2/4 z-10">
          <h1 className="text-5xl font-bold text-white text-center">Fit.go</h1>
          <p className="text-3xl text-white text-center px-10 pt-8">
            An App where you can match up with your workout buddy
          </p>
          <div className="flex justify-center pt-8">
            <a href="#login">
              <button className="text-white text-xl p-3 bg-black border border-white rounded-md hover:bg-white hover:text-black">
                Get Started
              </button>
            </a>
          </div>
        </div>
        <div
          className="absolute top-0 right-0 bottom-0 left-2/4 z-0 w-2/4"
          style={{
            backgroundImage: `url(${bike})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div
        className="h-screen flex justify-center items-center flex-col"
        id="login"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="border-2 border-slate-950 border-solid rounded-md bg-slate-200 md:bg-white shadow-md h-3/6 md:h-3/5 md:w-1/3 justify-center py-5">
          <h1 className="text-3xl font-bold text mt-2 text-slate-900  flex justify-center">
            Sign in
          </h1>

          <form
            onSubmit={handleSubmit}
            className="px-5 py-5 flex flex-col text-md font-bold gap-3"
          >
            <TextField
              size="30"
              InputLabelProps={{ required: false }}
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
              name="psw"
              label="Password"
              variant="outlined"
              onChange={(event) => {
                setPass(event.target.value);
              }}
            />
            <div className="relative mt-2">
              {error && (
                <Alert
                  severity="error"
                  variant="filled"
                  className="absolute top-0 left-0 right-0 justify-center"
                >
                  <p className=" font-bold">{error}</p>
                </Alert>
              )}
            </div>
            <div className="flex justify-center mt-14">
              <button className="text-lg p-2 bg-white text-black rounded-md w-32 border-2 hover:bg-black hover:text-white border-black ">
                Login
              </button>
            </div>
          </form>
          <p className=" flex justify-center mt-1 font-bold text-lg">
            New to Fit.go?&nbsp;{" "}
            <Link
              to="/signup"
              className="text-green-600 hover:text-sky-600 hover:underline"
            >
              Signup here!
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
