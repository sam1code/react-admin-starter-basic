import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { getCategories } from "./api/interceptor";
import { LoadingContext } from "./context/LoadingContext";

const Article = () => {
  const [category, setCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  const { setLoading, setSnackbar } = React.useContext(LoadingContext);

  const getCategoriesFun = async () => {
    try {
      setLoading(true);
      const articleCategories = await getCategories();
      if (articleCategories?.articleCategory?.length > 0) {
        const cs = articleCategories.articleCategory.map((category) => {
          return {
            name: category.name,
            value: category._id,
          };
        });
        cs.unshift({ name: "All", value: "all", _id: "all" });
        console.log(cs);
        setCategories(cs);
      } else setCategories([]);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!categories.length) getCategoriesFun();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Article</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category?._id}
              label="Select Category"
              onChange={(e) => setCategory(e.target._id)}
              sx={{ width: "160px" }}
            >
              {categories.map((category, index) => {
                return (
                  <MenuItem key={index} value={category._id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Sources
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category?._id}
              label="Select Sources"
              onChange={(e) => setCategory(e.target._id)}
              sx={{ width: "160px" }}
            >
              {categories.map((category, index) => {
                return (
                  <MenuItem key={index} value={category._id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              height: "40px",
              backgroundColor: "black",
              ":hover": {
                backgroundColor: "grey",
              },
              width: "100px",
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Article;
