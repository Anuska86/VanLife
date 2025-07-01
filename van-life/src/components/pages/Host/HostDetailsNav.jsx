import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/HostDetailsNav.css";

export default function HostDetailsNav() {
  const activeStyle = {
    color: "#f0f2bd",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav className="host-details-nav">
      <NavLink
        to="."
        end
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Details
      </NavLink>
      <NavLink
        to="pricing"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Pricing
      </NavLink>
      <NavLink
        to="photos"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Photos
      </NavLink>
    </nav>
  );
}
