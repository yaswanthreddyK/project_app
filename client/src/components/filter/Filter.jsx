import React, {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import "./Filter.css"
function Filter() {
  const [sortOption, setSortOption] = useState('latestFirst');
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <div>
    <h3 className='filter'>Filters</h3>
<FormControl variant="outlined" sx={{margin: "0.5em"}}>
<InputLabel id="sort-select-label">Sort By</InputLabel>
<Select
  labelId="sort-select-label"
  id="sort-select"
  value={sortOption}
  onChange={handleSortChange}
  label="Sort By"
>
  <MenuItem value="latestFirst">Latest First</MenuItem>
  <MenuItem value="latestLast">Latest Last</MenuItem>
</Select>
</FormControl>
</div>
  )
}

export default Filter