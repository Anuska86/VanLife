import React from "react";
import { Outlet } from "react-router-dom";
import HostNav from "./HostNav";

export default function HostLayout() {
  return (
    <>
      <HostNav />
      <Outlet />
    </>
  );
}
