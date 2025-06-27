import React from "react";
import "./index.css";
import "./server";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Vans from "./components/pages/Vans/Vans";
import VansDetail from "./components/pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Host from "./components/pages/Host/Host";
import Dashboard from "./components/pages/Host/Dashboard";
import Income from "./components/pages/Host/Income";
import Reviews from "./components/pages/Host/Reviews";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Dashboard />} />
          <Route path="/host/income" element={<Income />} />
          <Route path="/host/reviews" element={<Reviews />} />
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
