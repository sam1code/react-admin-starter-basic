import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Navigate, useLocation } from "react-router-dom";
import MenuBox from "./Menu";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ReportIcon from "@mui/icons-material/Report";

function Layout({ isAuthenticated, children }) {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // currently active route

  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
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
            icon={<ReportIcon />}
            onClick={() => navigate("/repots")}
            style={{
              backgroundColor: location.pathname === "/repots" ? "#F0F0F0" : "",
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
