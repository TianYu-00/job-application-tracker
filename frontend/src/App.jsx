import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import Temp from "./components/Temp";

function App() {
  return (
    <div>
      <Header />
      {/* <Temp /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}

export default App;
