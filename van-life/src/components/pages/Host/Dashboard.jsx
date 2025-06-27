import React from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h1>This is Host Dashboard</h1>
      <Outlet />
    </>
  );
}
