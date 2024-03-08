import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function DataCard({ children, message, target }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(target, { replace: true });
          }}
        >
          {children}
        </div>
      </CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          paddingBottom: "20px",
        }}
      >
        {message}
      </div>
    </Card>
  );
}
