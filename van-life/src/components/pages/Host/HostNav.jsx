import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/HostNav.css";

export default function HostNav({ user, onLogout }) {
  const activeStyle = {
    color: "#f0f2bd",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav className="host-nav">
      <NavLink
        to="."
        end
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="income"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Income
      </NavLink>
      <NavLink
        to="vans"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Vans
      </NavLink>

      <NavLink
        to="reviews"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Reviews
      </NavLink>
      <div className="host-actions">
        {user ? (
          <>
            <span className="host-user">{user.email}</span>
            <button className="button-logout" onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </nav>
  );
}
