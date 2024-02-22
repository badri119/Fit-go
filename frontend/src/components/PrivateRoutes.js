import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Info from "../components/Info";

//This is with token (This will allow the user to access info page I guess)
const PrivateRoute1 = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const token = cookies.Token;
  console.log(token);
  return token ? <Outlet /> : <Navigate to="/" />;
};

// For this private route, I don't want the user to go to info page once he has registed, so I plan on taking the boolean
// value from the backend API and check to see if it's false, if it's false they can go to info page
// or else, if it's true, direct them to /home page
// this page should have valid token as well
const PrivateRoute2 = () => {
  // return boolen value for first time user ? <Info /> : <Navigate to="/home" />;
};

export { PrivateRoute1, PrivateRoute2 };

// Another way to write this

// if (token) {
//     return <Outlet />;
//   } else {
//     return <Navigate to="/" />;
//   }
