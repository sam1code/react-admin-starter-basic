import {
  Backdrop,
  Box,
  Fade,
  FormControl,
  InputLabel,
  Modal,
  Select,
  TextField,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import React from "react";
import MultipleSelectChip from "./MultiSelect";

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

const AdminEditModal = ({ open, handleClose, create }) => {
  const [admin, setAdmin] = React.useState(open);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleCreate = (admin) => {};

  const handleEdit = (admin) => {};

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
              Edit {admin?.email}
            </Typography>
            <Button onClick={handleClose}>X</Button>
          </div>
          <form
            onSubmit={
              create
                ? (e) => {
                    e.preventDefault();
                    handleCreate(admin);
                  }
                : (e) => {
                    e.preventDefault();
                    handleEdit(admin);
                  }
            }
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
                value={admin?.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              />
              <TextField
                label="L Name"
                placeholder="Enter L Name"
                variant="outlined"
                fullWidth
                value={admin?.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              />
            </div>
            <TextField
              label="Phone"
              placeholder="Enter Phone Number"
              variant="outlined"
              type="number"
              fullWidth
              value={admin?.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            />
            {!admin?.isSuperAdmin && (
              // roles
              <>
                <MultipleSelectChip
                  names={["Editor", "Reviewer", "Publisher"]}
                  title="Select Roles"
                />
                <MultipleSelectChip
                  title="Select Categories"
                  names={["Politics", "Sports", "Entertainment"]}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
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
