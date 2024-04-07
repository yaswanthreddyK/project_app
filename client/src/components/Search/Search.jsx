import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "./Search.css"

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Grid container spacing={1} sx={{display: "flex", justifyContent: "center"}}>
      <Grid item>
        <TextField
          label="Search companies"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ minWidth: '320px'}}
          inputProps={{
            style: {
              padding: "1em"
            }
         }}
        />
      </Grid>
      <Grid item sx={{display: "flex", }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{backgroundColor: "#25ae81"}}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
