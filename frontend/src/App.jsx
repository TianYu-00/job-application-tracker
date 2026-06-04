import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Applications from "./pages/Applications";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}

export default App;
