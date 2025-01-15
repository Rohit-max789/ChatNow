import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login/Login.jsx";
import Resistor from "./resistor/Resistor.jsx";
import Home from "./Home/Home.jsx";
import { Route, Routes } from "react-router-dom";
import VerifyUser from "./utils/VerifyUser.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <>
      <div className="p-2 w-screen h-screen flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />;
          <Route path="/registor" element={<Resistor />} />
          <Route element={<VerifyUser />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
