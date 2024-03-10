import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/interceptor";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  const getUserDetailsOnRefresh = async () => {
    try {
      const response = await getProfile();
      localStorage.setItem("user", JSON.stringify(response));
      setAuthInfo({
        isAuthenticated: true,
        user: response,
        isLoading: false,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserDetailsOnRefresh();
    } else {
      setAuthInfo({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  }, []);

  const updateAuthInfo = (isAuthenticated) => {
    setAuthInfo({
      isAuthenticated,
      user: JSON.parse(localStorage.getItem("user") || "{}"),
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authInfo, updateAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
