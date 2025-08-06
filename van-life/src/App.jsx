import React from "react";
import "./index.css";
import "./server";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

//import from components
import Layout from "./components/Layout";
import Login from "./components/Login";
import DevLogin from "./components/users/DevLogin";

//import from pages
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import AuthRequired from "./components/AuthRequired";

//import from Vans
import Vans from "./components/pages/Vans/Vans";
import VansDetail from "./components/pages/Vans/VanDetail";

//import from Admin
import AdminDashboard from "./components/users/Admin/AdminDashboard";
import AdminLayout from "./components/users/Admin/AdminLayout";

//import from Host
import Dashboard from "./components/users/Host/Dashboard";
import Income from "./components/users/Host/Income";
import Reviews from "./components/users/Host/Reviews";
import HostLayout from "./components/users/Host/HostLayout";
import HostVans from "./components/users/Host/HostVans";
import HostVansDetails from "./components/users/Host/HostVansDetails";
import HostVanInfo from "./components/users/Host/HostVanInfo";
import HostVanPhotos from "./components/users/Host/HostVanPhotos";
import HostVanPricing from "./components/users/Host/HostVanPricing";

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

          {/* Host Routes */}
          <Route element={<AuthRequired requireHost={true} />}>
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
          </Route>

          {/* Admin Route — now inside Layout */}
          <Route element={<AuthRequired requireAdmin={true} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dev-login" element={<DevLogin />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
