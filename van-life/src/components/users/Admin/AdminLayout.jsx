import React from "react";
import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <AdminNav />

      <main>
        <Outlet />
      </main>
    </>
  );
}
