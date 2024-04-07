import { CircularProgress } from '@mui/material'
import React from 'react'
import "./Spinner.css"
function Spinner({classes}) {
  return (
    <div className={`spinner `+classes}>
       <CircularProgress size={40} sx={{ color: "#4cae9b" }}/>
    </div>
  )
}

export default Spinner