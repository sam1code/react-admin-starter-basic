import React from "react";
import Login from "./Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./Home";
import Layout from "./components/Drawer";

const App = () => {
  const { authInfo } = React.useContext(AuthContext);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Layout isAuthenticated={authInfo.isAuthenticated}>
            <Dashboard />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
