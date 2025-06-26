import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Vans from "./components/pages/Vans";
import VansDetail from "./components/pages/VanDetail";
import Layout from "./components/Layout";
import "./server";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VansDetail />} />
        </Route>
      </Routes>
      <footer className="footer">
        {" "}
        <p>
          &copy; {new Date().getFullYear()} Anuska-VanLife. All rights reserved.
        </p>
      </footer>
    </BrowserRouter>
  );
}
