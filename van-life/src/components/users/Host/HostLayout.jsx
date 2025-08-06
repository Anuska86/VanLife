import React, { useContext } from "react";
import { UserContext } from "../../users/UserContext";
import "../../../../src/components/pages/styles/HostLayout.css";
import { Outlet, useNavigate, Link } from "react-router-dom";
import HostNav from "./HostNav";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../apiFirebase";

export default function HostLayout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth).then(() => {
      navigate("/login");
    });
  }
  if (!user) {
    return (
      <h2 style={{ color: "brown", textAlign: "center" }}>
        Loading user data...
      </h2>
    );
  }

  return (
    <div className="host-layout">
      <header className="host-header">
        <HostNav onLogout={handleLogout} />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
