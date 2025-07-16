import React from "react";
import "../styles/HostLayout.css";
import { Outlet, useNavigate, Link } from "react-router-dom";
import HostNav from "./HostNav";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../apiFirebase";

export default function HostLayout() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("HostLayout auth state:", currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth).then(() => {
      navigate("/login");
    });
  }
  return (
    <div className="host-layout">
      <header className="host-header">
        <HostNav user={user} onLogout={handleLogout} />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
