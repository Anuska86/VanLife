import React from "react";
import { Link } from "react-router-dom";
import "../styles/HostNav.css";

export default function HostNav() {
  return (
    <nav className="host-nav">
      <Link to="/host">Dashboard</Link>
      <Link to="/host/income">Income</Link>
      <Link to="/host/reviews">Reviews</Link>
    </nav>
  );
}
