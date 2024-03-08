import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Navigate } from "react-router-dom";
import MenuBox from "./Menu";

function Layout({ isAuthenticated, children }) {
  const { collapseSidebar } = useProSidebar();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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

          <MenuItem icon={<HomeOutlinedIcon />}>Articles</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Admins</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Users</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Repots</MenuItem>
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
