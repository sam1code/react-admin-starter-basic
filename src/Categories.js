import React, { useEffect, useState } from "react";
import { getCategories } from "./api/interceptor";
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
import CategoryModal from "./components/CategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reload, setReload] = useState(true);

  const categoriesFun = async () => {
    try {
      const resp = await getCategories();
      setCategories(resp.articleCategory || []);
      setReload(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (reload) categoriesFun();
  }, [reload]);

  return (
    <div>
      <CategoryModal
        open={selectedCategory}
        handleClose={() => setSelectedCategory(null)}
        setReload={setReload}
        key={selectedCategory?._id}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Categories({categories.length})</h1>
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
          onClick={() => setSelectedCategory({})}
        >
          + Add Category
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
            {categories?.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    hoveredCategoryId === row._id ? "#F0F0F0" : "",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredCategoryId(row._id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
                onClick={() => setSelectedCategory(row)}
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

export default Categories;
