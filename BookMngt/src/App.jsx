import React from "react";
import Home from "./Pages/Home"; 
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import Navbar from "./Component/Navbar";
import Signup from "./Pages/Signup";
import MyBook from"./Pages/MyBook";

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mybook" element={<MyBook />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;