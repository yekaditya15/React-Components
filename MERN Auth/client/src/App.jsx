import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
