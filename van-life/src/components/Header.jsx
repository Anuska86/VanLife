import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../apiFirebase";

export default function Header() {
  const [user, setUser] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth).then(() => {
      navigate("/login", { replace: true });
    });
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
      </nav>
    </header>
  );
}
