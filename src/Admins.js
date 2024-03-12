import React, { useContext, useEffect, useState } from "react";
import { getAdmins } from "./api/interceptor";
import { Button } from "@mui/material";
import { LoadingContext } from "./context/LoadingContext";
import AdminCard from "./components/AdminCard";
import AdminEditModal from "./components/AdminEditModal";
import randomString from "./utilities/string";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const [edit, setEdit] = useState(null);
  const [create, setCreate] = useState(false);
  const [reload, setReload] = useState(false);

  const adminsFun = async () => {
    setLoading(true);
    try {
      const resp = await getAdmins();
      setAdmins(resp.admins);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    adminsFun();
  }, []);

  useEffect(() => {
    if (reload) {
      adminsFun();
      setReload(false);
    }
  }, [reload]);

  return (
    <div>
      <AdminEditModal
        open={edit}
        handleClose={() => {
          setEdit(null);
          setCreate(false);
        }}
        create={create}
        setReload={setReload}
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
              password: randomString(8),
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
          gap: "10px",
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
