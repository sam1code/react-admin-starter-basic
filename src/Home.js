import React, { useEffect, useState } from "react";
import DataCard from "./components/DataCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import instance from "./api/interceptor";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import ReportIcon from "@mui/icons-material/Report";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({});

  const getDashboardData = async () => {
    try {
      const response = await instance.get("/admin/dashboard");
      setDashboardData(response.data);
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
          alignItems: "center",
          flexWrap: "wrap",
          padding: "20px",
          rowGap: "20px",
          columnGap: "10px",
        }}
      >
        <DataCard
          message={`${dashboardData.articles} Articles, ${dashboardData.pendingArticles} Pending`}
          children={<ArticleIcon style={{ fontSize: 100 }} />}
          target="/articles"
        />
        <DataCard
          message={`${dashboardData.admins} Admins, ${dashboardData.superAdmins} Super`}
          children={<AdminPanelSettingsIcon style={{ fontSize: 100 }} />}
          target="/admins"
        />
        <DataCard
          message={`${dashboardData.users} Users & ${dashboardData.usersJoinedToday}new`}
          children={<AccountCircleIcon style={{ fontSize: 100 }} />}
          target="/users"
        />
        <DataCard
          message={`${dashboardData.categories} Categories`}
          children={<CategoryIcon style={{ fontSize: 100 }} />}
          target="/categories"
        />
        <DataCard
          message={`${dashboardData.tags} Tags`}
          children={<StyleIcon style={{ fontSize: 100 }} />}
          target="/tags"
        />
        <DataCard
          message={`${dashboardData.reports} Reports`}
          children={<ReportIcon style={{ fontSize: 100 }} />}
          target="/reports"
        />
      </Box>
    </div>
  );
};

export default Home;
