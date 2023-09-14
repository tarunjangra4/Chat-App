import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    const cleanUp = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
      }
    });

    return () => {
      cleanUp();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currUser }}>{children}</AuthContext.Provider>
  );
};
