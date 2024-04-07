import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Snackbar,
    Alert
  } from "@mui/material";
import { deleteAJob } from '../../utils';

function PostedJobsList({jobsData}) {
  const [selectedJob, setSelectedJob] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: "",
    severity: "",
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

 async function  handleDeleteJob(event, jobId){
   setSelectedJob(prev => (
    [...prev, jobId]
   ))
  const result = await deleteAJob(jobId)
  if(!result.success){
    setOpenSnackbar(true)
    setSnackbarMessage({
      message: result.message,
      severity: 'error'
    })
    setSelectedJob(prev => {
      const newArray = prev.filter(job => job !== jobId )
      return newArray
    })
  }
  else{
      setOpenSnackbar(true)
      setSnackbarMessage({
        message: result.message,
        severity: 'success'
      })
      setSelectedJob(prev => {
        const newArray = prev.filter(job => job !== jobId )
        return newArray
      })
    }
  }

  return (   
    <>
    <TableContainer component={Paper} sx={{ marginTop: "20px", width: "1200px"}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Job Title</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Posted On</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b", textAlign: "center"}}>Total Applications</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Cancel Job</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobsData.map((job, index) => (
              <TableRow
                key={job._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f4f5f6" : "white",
                }}
                sx={{width: "100%"}}
                >
              
                <TableCell sx={{padding: "0em 0 0 0.5em",Width: "100px",fontSize: "1rem" , color: "#2b2b2b"}}>
                 {job.title}
                </TableCell>
                <TableCell sx={{  minWidth: "150px", fontSize: "1rem", color: "#2b2b2b"}}>
                 {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ minWidth: "100px", fontSize: "1rem", textAlign: "center"}}>
                  {job.proposalsCount}
                </TableCell>
                <TableCell sx={{ minWidth: "100px"}}>
                    <button style={{fontSize: "1rem", backgroundColor: " #ff0000"}} onClick={(event)=> {handleDeleteJob(event, job._id)}} className='message-btn'>
                    { selectedJob.includes(job._id) ? <CircularProgress size={20} sx={{color: "white"}}/> : "Cancel"}
                    </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
      <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarMessage.severity}
          >
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
                </>
  )
}

export default PostedJobsList;