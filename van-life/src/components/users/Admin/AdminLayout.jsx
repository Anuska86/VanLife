import React from "react";
import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="admin-nav-wrapper">
        <AdminNav />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
