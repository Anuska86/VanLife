import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/Header";
import HostNav from "./HostNav";

export default function HostLayout() {
  return (
    <>
      <Header />
      <HostNav />
      <Outlet />
    </>
  );
}
