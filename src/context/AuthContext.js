import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token") !== null;
    setAuthInfo({
      isAuthenticated,
      user: JSON.parse(localStorage.getItem("user") || "{}"),
    });
  }, []);

  const updateAuthInfo = (isAuthenticated, token) => {
    setAuthInfo({
      isAuthenticated,
      user: JSON.parse(localStorage.getItem("user") || "{}"),
    });
  };

  return (
    <AuthContext.Provider value={{ authInfo, updateAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
