import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";

export default function Header() {
  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : null)}
      >
        #VanLife
      </NavLink>
      <nav>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <FaUserLock size={30} />
        </Link>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  );
}
