import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import "./SearchInput.css";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";

function SearchInput({
  jobType,
  location,
  handleJobTypeChange,
  handleLocationChange,
  handleSearch,
  labels
}) {
  return (
    <div className="search-input">
      <Grid container spacing={2} alignItems="center" sx={{ width: "80vw" , display: 'flex', justifyContent: "center"}}>
        <Grid item xs={12} md={4}>
          <TextField
            label={`${labels?.label1 ? labels.label1 : "Search Jobs, People"}`}
            variant="outlined"
            value={jobType}
            onChange={handleJobTypeChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="icon" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
            label={`${labels?.label2 ? labels.label2 : "Location"}`}
            variant="outlined"
            value={location}
            onChange={handleLocationChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                <LocationOnIcon className="icon" />
              </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            fullWidth
            sx={{
              backgroundColor: "#4cae9b",
              minWidth: "10em",
              "&:hover": { backgroundColor: "#4cae9b" },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchInput;
