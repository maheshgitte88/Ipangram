import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import SignupForm from "./Comp/SignupForm";
import LoginForm from "./Comp/LoginForm";
import DashBord from "./Pages/DashBord";
import Departments from "./Pages/Departments";
import Employees from "./Pages/Employees";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<DashBord />}>
            <Route path="Departments" element={<Departments />}></Route>
            <Route path="employees" element={<Employees />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;