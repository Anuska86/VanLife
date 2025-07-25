import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile } from "../../apiFirebase";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...profile,
          });
          console.log("This is the merged user:", {
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
      } else {
        setUser(null);
      }
      setUserLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
}
