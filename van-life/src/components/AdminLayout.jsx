import React from "react";
import HostNav from "./pages/Host/HostNav";
import { Outlet } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <HostNav />
      <Link to="/admin/dev-login">Dev Login</Link>

      <main>
        <Outlet />
      </main>
    </>
  );
}
