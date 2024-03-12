import { Card, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import generateRandomColor from "../utilities/generateRandomColor";
import EditIcon from "@mui/icons-material/Edit";

const AdminCard = ({ admin, setEdit }) => {
  const [hover, setHover] = React.useState(false);
  const [color] = React.useState(generateRandomColor());

  useEffect(() => {
    console.log(admin);
  }, [admin]);

  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{ margin: "10px" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        setEdit(admin);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          maxWidth: 345,
        }}
      >
        <CardContent>
          <div
            style={{
              backgroundColor: color,
              color: "white",
              borderRadius: "50%",
              height: "60px",
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {hover ? (
              <EditIcon style={{ fontSize: "30px" }} />
            ) : (
              admin?.email[0]?.toUpperCase()
            )}
          </div>
        </CardContent>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          flexDirection: "column",
          cursor: "pointer",
          maxWidth: 345,
          lineHeight: ".1px",
          padding: "20px",
        }}
      >
        <p>
          <b>Email: </b>
          {admin?.email}
        </p>
        <p>
          <b>F Name: </b>
          {admin?.fName}
        </p>
        <p>
          <b>L Name: </b>
          {admin?.lName}
        </p>
        <p>
          <b>Phone: </b>
          {admin?.phone}
        </p>
        <p>
          <b>Roles: </b>
          {admin?.isSuperAdmin ? "Super Admin" : admin?.allowedRoles.join(", ")}
        </p>

        <p>
          <b>Categories: </b>
          {admin?.isSuperAdmin
            ? "Super Admin"
            : admin?.allowedCategories?.join(", ")}
        </p>

        <p>
          <b>Status: </b>
          {admin?.status}
        </p>
        <p>
          <b>Created At: </b>
          {new Date(admin?.createdAt).toLocaleDateString() +
            " " +
            new Date(admin?.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </Card>
  );
};

export default AdminCard;
