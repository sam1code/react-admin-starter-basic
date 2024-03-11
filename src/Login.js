import React, { useEffect, useState } from "react";
import { Avatar, TextField, Button, Typography, Link } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Box, Grid, Paper } from "@mui/material";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "./api/interceptor";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "50vw",
    margin: "20px auto",
    maxWidth: "400px",
  };
  const avatarStyle = { backgroundColor: "#333" };
  const btnstyle = { margin: "8px 0" };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authInfo, updateAuthInfo } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authInfo.isAuthenticated) {
      return navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      localStorage.setItem("token", response.data?.jwtToken);
      localStorage.setItem("refreshToken", response.data?.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data?.user));
      updateAuthInfo(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "lightgrey",
      }}
    >
      <Paper elevation={10} style={paperStyle} mb={2}>
        <Grid align="center" mb={2}>
          <h2>Unbiasly Admin</h2>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Box
          sx={{
            mb: 2,
          }}
        >
          <TextField
            label="Username"
            placeholder="Enter username"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="#000"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <Typography>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "15px",
            }}
            href="#"
          >
            Forgot password ?
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
