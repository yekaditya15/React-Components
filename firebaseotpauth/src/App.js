// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Removed unused import
import PhoneSignin from "./components/PhoneSignin";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<PhoneSignin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
