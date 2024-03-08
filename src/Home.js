import React, { useEffect } from "react";
import DataCard from "./components/DataCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import instance from "./api/interceptor";

const Home = () => {
  const getDashboardData = async () => {
    try {
      const response = await instance.get("/admin/dashboard");
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "20px",
        }}
      >
        <DataCard
          message="60 Users"
          children={<AccountCircleIcon style={{ fontSize: 100 }} />}
          target="/users"
        />
        <DataCard
          message="12 Admins"
          children={<AccountCircleIcon style={{ fontSize: 100 }} />}
          target="/admins"
        />
        <DataCard
          message="8 Articles"
          children={<AccountCircleIcon style={{ fontSize: 100 }} />}
          target="/articles"
        />
        <DataCard
          message="60 Report"
          children={<AccountCircleIcon style={{ fontSize: 100 }} />}
          target="/reports"
        />
      </Box>
    </div>
  );
};

export default Home;
