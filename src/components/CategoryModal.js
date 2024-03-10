import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { createCategory, updateCategory } from "../api/interceptor";
import { LoadingContext } from "../context/LoadingContext";

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

const CategoryModal = ({ open, handleClose, setReload }) => {
  const [category, setCategory] = React.useState(open);
  const { loading, setLoading, setSnackbar } = useContext(LoadingContext);

  useEffect(() => {
    setCategory(open);
  }, [open]);

  const handleCreateCategory = async () => {
    try {
      setLoading(true);
      await createCategory(category);
      setSnackbar({
        open: true,
        message: "Category Created Successfully",
        severity: "success",
      });
      setLoading(false);
      setReload(true);
      handleClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Some Error Occured while creating category",
        severity: "error",
      });
      setLoading(false);
      console.error(err.message);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      setLoading(true);
      await updateCategory({
        _id: open._id,
        name: category.name,
        slug: category.slug,
      });
      setSnackbar({
        open: true,
        message: "Category Updated Successfully",
        severity: "success",
      });
      setLoading(false);
      setReload(true);
      handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      setSnackbar({
        open: true,
        severity: "error",
        message: "Error Updating Category",
      });
      console.error(err.message);
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
              {open?.name ? "Edit Category" : "Create Category"}
            </Typography>
            <Button onClick={handleClose}>X</Button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (open?._id) {
                handleUpdateCategory();
              } else {
                handleCreateCategory();
              }
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              label="Category Name"
              placeholder="Category Name"
              variant="outlined"
              fullWidth
              required
              value={category?.name}
              onChange={(e) => {
                setCategory({
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().split(" ").join("-"),
                });
              }}
            />

            <TextField
              label="Slug"
              placeholder="Slug"
              variant="outlined"
              focused
              fullWidth
              required
              value={category?.slug}
              onChange={(e) =>
                setCategory({ ...category, slug: e.target.value })
              }
            />

            <button
              type="submit"
              style={{
                backgroundColor: loading ? "grey" : "black",
                color: "white",
                padding: "14px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CategoryModal;
