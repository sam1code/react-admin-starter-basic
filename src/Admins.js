import React, { useContext, useEffect, useState } from "react";
import DataCard from "./components/DataCard";
import { getAdmins } from "./api/interceptor";
import { Button } from "@mui/material";
import { LoadingContext } from "./context/LoadingContext";
import AdminCard from "./components/AdminCard";
import AdminEditModal from "./components/AdminEditModal";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const [edit, setEdit] = useState(null);
  const [create, setCreate] = useState(false);

  const adminsFun = async () => {
    setLoading(true);
    try {
      const resp = await getAdmins();
      console.log(resp.admins);
      setAdmins(resp.admins);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    adminsFun();
  }, []);

  return (
    <div>
      <AdminEditModal
        open={edit}
        handleClose={() => setEdit(null)}
        create={create}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admins({admins.length})</h2>
        <Button
          variant="contained"
          sx={{
            height: "40px",
            backgroundColor: "black",
            ":hover": {
              backgroundColor: "grey",
            },
          }}
          onClick={() => {
            setCreate(true);
            setEdit({
              fName: "",
              lName: "",
              email: "",
              phone: "",
              allowedCategories: [],
              allowedRoles: [],
              status: "pending",
            });
            setCreate(true);
          }}
        >
          + Create One
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {admins.map((admin) => (
          <AdminCard key={admin.id} admin={admin} setEdit={setEdit} />
        ))}
      </div>
    </div>
  );
};

export default Admins;
