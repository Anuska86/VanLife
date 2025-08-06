import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, getUserProfile } from "../../apiFirebase";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem("devUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [userLoading, setUserLoading] = React.useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("devUser");
    if (savedUser) {
      console.log("Using dev user from localStorage");
      setUser(JSON.parse(savedUser));
      setUserLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserLoading(false);
        return;
      }
      try {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...profile,
          });
        } else {
          console.warn("No profile found for user:", firebaseUser.uid);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: "guest",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      }

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Firebase signOut failed or not needed:", err);
    }
    localStorage.removeItem("devUser");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, userLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
}
