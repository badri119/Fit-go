import React from "react";
import { Outlet, Navigate } from "react-router-dom";

//need to get token
const token = localStorage.getItem("");

const PrivateRoute = () => {
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

// Another way to write this

// if (token) {
//     return <Outlet />;
//   } else {
//     return <Navigate to="/" />;
//   }
