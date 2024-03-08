import React from "react";
import Login from "./Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./Home";
import Layout from "./components/Drawer";
import Profile from "./Profile";
import Article from "./Article";
import Admins from "./Admins";
import Users from "./Users";
import Repots from "./Repots";

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
      <Route
        path="/profile"
        element={
          <Layout isAuthenticated={authInfo.isAuthenticated}>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/articles"
        element={
          <Layout isAuthenticated={authInfo.isAuthenticated}>
            <Article />
          </Layout>
        }
      />
      <Route
        path="/admins"
        element={
          <Layout isAuthenticated={authInfo.isAuthenticated}>
            <Admins />
          </Layout>
        }
      />
      <Route
        path="/users"
        element={
          <Layout isAuthenticated={authInfo.isAuthenticated}>
            <Users />
          </Layout>
        }
      />
      <Route
        path="/repots"
        element={
          <Layout isAuthenticated={authInfo.isAuthenticated}>
            <Repots />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
