import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../apiFirebase";
import { getUserRoleByEmail } from "../apiFirebase";

export default function AuthRequired({
  requireAdmin = false,
  requireHost = false,
}) {
  const [user, setUser] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const location = useLocation();

  React.useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (isMounted) {
        if (currentUser) {
          try {
            const fetchedUser = await getUserRoleByEmail(currentUser.email);
            if (isMounted) {
              setUser({ ...currentUser, ...fetchedUser });
              console.log("User context set:", {
                ...currentUser,
                ...fetchedUser,
              });

              setRole(fetchedUser?.role);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching role:", error);
            if (isMounted) setLoading(false);
          }
        } else {
          if (isMounted) setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    console.log("AuthRequired: user =", user);
    console.log("AuthRequired: role =", role);
  }, [user, role]);

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

  if (requireHost && role !== "host" && role !== "admin") {
    return (
      <Navigate
        to="/"
        state={{
          message: "Access denied: Hosts only",
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
