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
import { createTag, updateTag } from "../api/interceptor";
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

const TagModal = ({ open, handleClose, setReload }) => {
  const [tag, setTag] = React.useState(open);
  const { loading, setLoading, setSnackbar } = useContext(LoadingContext);

  useEffect(() => {
    setTag(open);
  }, [open]);

  const handleCreateTag = async () => {
    try {
      setLoading(true);
      await createTag(tag);
      setSnackbar({
        open: true,
        message: "Tag Created Successfully",
        severity: "success",
      });
      setLoading(false);
      setReload(true);
      handleClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Some Error Occured while creating tag",
        severity: "error",
      });
      setLoading(false);
      console.error(err.message);
    }
  };

  const handleUpdateTag = async () => {
    try {
      setLoading(true);
      await updateTag({
        _id: open._id,
        name: tag.name,
        slug: tag.slug,
      });
      setSnackbar({
        open: true,
        message: "Tag Updated Successfully",
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
        message: "Error Updating Tag",
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
              {open?.name ? "Edit Tag" : "Create Tag"}
            </Typography>
            <Button onClick={handleClose}>X</Button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (open?._id) {
                handleUpdateTag();
              } else {
                handleCreateTag();
              }
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              label="Tag Name"
              placeholder="Tag Name"
              variant="outlined"
              fullWidth
              required
              value={tag?.name}
              onChange={(e) => {
                setTag({
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
              value={tag?.slug}
              onChange={(e) => setTag({ ...tag, slug: e.target.value })}
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

export default TagModal;
