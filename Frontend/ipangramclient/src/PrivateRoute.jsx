import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, 8);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;