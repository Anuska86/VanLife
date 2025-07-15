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
        <HostNav />
        <div className="host-actions">
          {user ? (
            <>
              <span className="host-user">{user.email}</span>
              <button className="button-logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
