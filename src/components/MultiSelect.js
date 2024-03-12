import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, tagName, theme) {
  return {
    fontWeight:
      tagName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({
  names,
  title,
  setValues,
  values,
}) {
  const theme = useTheme();
  const [tagName, setTagName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(typeof value === "string" ? value.split(",") : value);
    setValues(
      typeof value === "string"
        ? value.split(",").map((v) => names[v])
        : value.map((v) => names[v])
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={title} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={names[value].name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name, value) => (
            <MenuItem
              key={name}
              value={value}
              style={getStyles(name, tagName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
