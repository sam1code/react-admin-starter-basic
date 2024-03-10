import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import { Navigate, useLocation } from "react-router-dom";
import MenuBox from "./Menu";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ReportIcon from "@mui/icons-material/Report";
import { useEffect } from "react";

function Layout({ isAuthenticated, children }) {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 768) {
      collapseSidebar();
    }
  }, []);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      id="app"
      style={{
        height: "100vh",
        display: "flex",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            <h2>Unbiasly</h2>
          </MenuItem>

          <MenuItem
            icon={<HomeOutlinedIcon />}
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              backgroundColor: location.pathname === "/" ? "#F0F0F0" : "",
            }}
          >
            Dashbodard
          </MenuItem>
          <MenuItem
            icon={<ArticleIcon />}
            onClick={() => navigate("/articles")}
            style={{
              backgroundColor:
                location.pathname === "/articles" ? "#F0F0F0" : "",
            }}
          >
            Articles
          </MenuItem>
          <MenuItem
            icon={<AdminPanelSettingsIcon />}
            onClick={() => navigate("/admins")}
            style={{
              backgroundColor: location.pathname === "/admins" ? "#F0F0F0" : "",
            }}
          >
            Admins
          </MenuItem>
          <MenuItem
            icon={<PeopleOutlinedIcon />}
            onClick={() => navigate("/users")}
            style={{
              backgroundColor: location.pathname === "/users" ? "#F0F0F0" : "",
            }}
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<CategoryIcon />}
            onClick={() => navigate("/categories")}
            style={{
              backgroundColor:
                location.pathname === "/categories" ? "#F0F0F0" : "",
            }}
          >
            Categories
          </MenuItem>
          <MenuItem
            icon={<StyleIcon />}
            onClick={() => navigate("/tags")}
            style={{
              backgroundColor: location.pathname === "/tags" ? "#F0F0F0" : "",
            }}
          >
            Tags
          </MenuItem>
          <MenuItem
            icon={<ReportIcon />}
            onClick={() => navigate("/reports")}
            style={{
              backgroundColor:
                location.pathname === "/reports" ? "#F0F0F0" : "",
            }}
          >
            Reports
          </MenuItem>
        </Menu>
      </Sidebar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "64px",
            backgroundColor: "#FBFBFB",
            borderBottom: "1px solid #F0F0F0",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "0 20px",
              cursor: "pointer",
            }}
          >
            <MenuBox />
          </div>
        </div>
        <div
          style={{
            padding: "20px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
