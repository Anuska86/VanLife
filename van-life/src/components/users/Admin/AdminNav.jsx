import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, NavLink } from "react-router-dom";
import "../../pages/styles/AdminNav.css";

export default function AdminNav({ onLogout }) {
  const { user } = useContext(UserContext);
  console.log("User in AdminNav:", user);

  const activeStyle = {
    color: "#f0f2bd",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <nav className="admin-nav">
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
      {user ? (
        <>
          <button className="button-logout" onClick={onLogout}>
            Log out
          </button>
          <span className="admin-user">{user.alias}</span>
        </>
      ) : (
        <Link to="/login">Log in</Link>
      )}
      {process.env.NODE_ENV === "development" && (
        <Link to="dev-login" className="dev-login-link">
          Dev Login
        </Link>
      )}
    </nav>
  );
}
