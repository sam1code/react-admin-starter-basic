import React, { useEffect, useState } from "react";
import { getTags } from "./api/interceptor";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TagModal from "./components/TagModal";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [hoveredTagId, setHoveredCategoryId] = useState();
  const [selectedTag, setSelectedTag] = useState(null);
  const [reload, setReload] = useState(true);

  const tagsFun = async () => {
    try {
      const resp = await getTags();
      setTags(resp.articleTag || []);
      setReload(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (reload) tagsFun();
  }, [reload]);

  return (
    <div>
      <TagModal
        open={selectedTag}
        handleClose={() => setSelectedTag(null)}
        setReload={setReload}
        key={selectedTag?._id}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Tags({tags.length})</h1>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "40px",
            backgroundColor: "black",
            ":hover": {
              backgroundColor: "black",
            },
          }}
          onClick={() => setSelectedTag({})}
        >
          + Add Tag
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Updated On</TableCell>
              <TableCell>Article Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags?.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: hoveredTagId === row._id ? "#F0F0F0" : "",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredCategoryId(row._id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
                onClick={() => setSelectedTag(row)}
              >
                <TableCell component="th" scope="row">
                  {row.name || "N/A"}
                </TableCell>
                <TableCell>{row.slug}</TableCell>
                <TableCell>
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString() +
                      " " +
                      new Date(row.createdAt).toLocaleTimeString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {row.updatedAt
                    ? new Date(row.updatedAt).toLocaleDateString() +
                      " " +
                      new Date(row.updatedAt).toLocaleTimeString()
                    : "N/A"}
                </TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tags;
