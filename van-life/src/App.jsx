import React from "react";
import "./index.css";
import "./server";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//import from components
import Layout from "./components/Layout";
import Login from "./components/Login";

//import from pages
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

//import from Vans
import Vans from "./components/pages/Vans/Vans";
import VansDetail from "./components/pages/Vans/VanDetail";

//import from Host
import Dashboard from "./components/pages/Host/Dashboard";
import Income from "./components/pages/Host/Income";
import Reviews from "./components/pages/Host/Reviews";
import HostLayout from "./components/pages/Host/HostLayout";
import HostVans from "./components/pages/Host/HostVans";
import HostVansDetails from "./components/pages/Host/HostVansDetails";
import HostVanInfo from "./components/pages/Host/HostVanInfo";
import HostVanPhotos from "./components/pages/Host/HostVanPhotos";
import HostVanPricing from "./components/pages/Host/HostVanPricing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VansDetail />} />
          <Route path="login" element={<Login />} />

          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVansDetails />}>
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
