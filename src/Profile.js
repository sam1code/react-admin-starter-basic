import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button } from "@mui/material";
import { getProfile, logout } from "./api/interceptor";
import { LoadingContext } from "./context/LoadingContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { setLoading } = useContext(LoadingContext);
  const { updateAuthInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const getProfileFun = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      setProfile(response);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  const logoutFun = async () => {
    try {
      setLoading(true);
      await logout();
      setLoading(false);
      updateAuthInfo(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileFun();
  }, []);

  return (
    <div>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIosIcon
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer", marginRight: "16px" }}
        />
        Profile
      </h2>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <AccountCircleIcon style={{ fontSize: 100 }} />
      </Box>
      <Box>
        <p>
          <b>Email:</b> {profile.email}{" "}
        </p>

        <p>
          <b>First Name:</b>{" "}
          {profile.firstName ? profile.firstName : "Not provided"}
        </p>

        <p>
          <b>Last Name:</b>{" "}
          {profile.lastName ? profile.lastName : "Not provided"}
        </p>

        <p>
          <b>Phone:</b> {profile.phone ? profile.phone : "Not provided "}
        </p>

        <p>
          <b>Allowed Roles:</b>
          {profile?.isSuperAdmin
            ? "Super Admin"
            : profile?.allowedRoles?.map((role) => role.name).join(", ")}
        </p>

        <p>
          <b>Allowed Categories:</b>
          {profile?.isSuperAdmin
            ? "All Categories"
            : profile?.allowedCategories
                ?.map((category) => category.name)
                .join(", ")}
        </p>
        <p>
          <b>Status:</b> {profile?.status}
        </p>

        <p>
          <b>Created At:</b> {new Date(profile.createdAt).toLocaleString()}
        </p>
      </Box>
      <Button variant="outlined" color="error" onClick={logoutFun}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
