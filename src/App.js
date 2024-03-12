import React from "react";
import Login from "./Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./Home";
import Layout from "./components/Layout";
import Profile from "./Profile";
import Article from "./Article";
import Admins from "./Admins";
import Users from "./Users";
import Repots from "./Repots";
import Categories from "./Categories";
import Tags from "./Tags";
import Loader from "./components/Loader";

const App = () => {
  const { authInfo } = React.useContext(AuthContext);

  if (authInfo.isLoading) {
    return <Loader open={true} />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Layout authInfo={authInfo}>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout authInfo={authInfo}>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/articles"
          element={
            <Layout authInfo={authInfo}>
              <Article />
            </Layout>
          }
        />
        <Route
          path="/admins"
          element={
            <Layout authInfo={authInfo}>
              <Admins />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout authInfo={authInfo}>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout authInfo={authInfo}>
              <Categories />
            </Layout>
          }
        />
        <Route
          path="/tags"
          element={
            <Layout authInfo={authInfo}>
              <Tags />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout authInfo={authInfo}>
              <Repots />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
