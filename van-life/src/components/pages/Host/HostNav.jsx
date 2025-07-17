import React, { useContext } from "react";
import { UserContext } from "../../users/UserContext";
import { Link, NavLink } from "react-router-dom";
import "../styles/HostNav.css";

export default function HostNav({ onLogout }) {
  const { user } = useContext(UserContext);
  console.log("User in HostNav:", user);

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
      {user?.role === "admin" && (
        <NavLink
          to="/admin"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Admin Dashboard
        </NavLink>
      )}
      <div className="host-actions">
        {user ? (
          <>
            <button className="button-logout" onClick={onLogout}>
              Log out
            </button>
            <span className="host-user">{user.alias}</span>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </nav>
  );
}
