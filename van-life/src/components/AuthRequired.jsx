import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../apiFirebase";
import { getUserRoleByEmail } from "../apiFirebase";

export default function AuthRequired({ requireAdmin = false }) {
  const [user, setUser] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const location = useLocation();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const role = await getUserRoleByEmail(currentUser.email);
        setUser(currentUser);
        setRole(role);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <h2 style={{ color: "brown" }} aria-live="polite">
        Loading...
      </h2>
    );

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", from: location.pathname }}
        replace
      />
    );
  }

  if (requireAdmin && role !== "admin") {
    return (
      <Navigate
        to="/"
        state={{
          message: "Access denied: Admins only",
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
