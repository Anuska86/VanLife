import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/HostNav.css";

export default function HostNav() {
  const activeStyle = {
    color: "#f0f2bd",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav className="host-nav">
      <NavLink
        to="/host"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/host/income"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Income
      </NavLink>
      <NavLink
        to="/host/reviews"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Reviews
      </NavLink>
    </nav>
  );
}
