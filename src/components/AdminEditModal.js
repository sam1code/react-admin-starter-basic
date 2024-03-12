import {
  Backdrop,
  Box,
  Fade,
  Modal,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MultipleSelectChip from "./MultiSelect";
import { createUpdateAdmin, getCategories } from "../api/interceptor";
import { LoadingContext } from "../context/LoadingContext";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import roles from "../utilities/roles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AdminEditModal = ({ open, handleClose, create, setReload }) => {
  const [admin, setAdmin] = useState(open);
  const [categories, setCategories] = useState([]);
  const { setLoading, setSnackbar } = useContext(LoadingContext);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    setAdmin(open);
  }, [open]);

  const getCategoriesFun = async () => {
    try {
      const articleCategories = await getCategories();
      if (articleCategories?.articleCategory?.length > 0) {
        const categories = articleCategories.articleCategory.map((category) => {
          return {
            name: category.name,
            value: category._id,
          };
        });
        setCategories(categories);
      } else setCategories([]);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!categories.length) getCategoriesFun();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      admin.allowedCategories = selectedCategories?.map(
        (category) => category.value
      );
      admin.allowedRoles = selectedRoles?.map((role) => role.value);
      await createUpdateAdmin(admin);
      handleClose();
      setSnackbar({
        open: true,
        message: "Admin Created/Updated Successfully",
        severity: "success",
      });
      setReload(true);
    } catch (err) {
      console.log(err.message);
      setSnackbar({
        open: true,
        message: "Failed to create/update admin",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
    const response = await createUpdateAdmin(admin);
    if (response) {
      handleClose();
    }
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              fontSize="1.3rem"
              fontWeight={600}
            >
              {create ? "Create new Admin!" : `Edit ${admin?.email}`}
            </Typography>
            <Button onClick={handleClose}>X</Button>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              label="Username"
              type="email"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
              value={admin?.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            />
            {create && (
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                variant="outlined"
                fullWidth
                required
                value={admin?.password}
                onChange={(e) =>
                  setAdmin({ ...admin, password: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <TextField
                label="F Name"
                placeholder="Enter F Name"
                variant="outlined"
                fullWidth
                required
                value={admin?.fName}
                onChange={(e) => setAdmin({ ...admin, fName: e.target.value })}
              />
              <TextField
                label="L Name"
                placeholder="Enter L Name"
                variant="outlined"
                fullWidth
                value={admin?.lName}
                onChange={(e) => setAdmin({ ...admin, lName: e.target.value })}
              />
            </div>
            <TextField
              label="Phone"
              placeholder="Enter Phone Number"
              variant="outlined"
              type="number"
              fullWidth
              value={admin?.phone}
              onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
            />
            {!admin?.isSuperAdmin && (
              // roles
              <>
                <MultipleSelectChip
                  names={roles}
                  title="Select Roles"
                  setValues={setSelectedRoles}
                  // values={admin?.allowedRoles}
                />
                <MultipleSelectChip
                  title="Select Categories"
                  names={categories}
                  setValues={setSelectedCategories}
                  // values={admin?.allowedCategories}
                />
              </>
            )}
            <button
              type="submit"
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "14px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Submit
            </button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AdminEditModal;
