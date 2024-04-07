import React, { Suspense, useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar, CircularProgress } from "@mui/material";
import { makeStyles } from '@mui/styles';
import "./Invites.css"
import {Await, defer, useLoaderData, useNavigate} from "react-router-dom"
import { getListOfInvites } from '../../utils';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';
import UserContext from '../../context/Usercontext.js';
const useStyles = makeStyles({
  tableContainer: {
    marginTop: "20px",
    padding: "2em",
    backgroundColor: "white",
    borderRadius: "8px",
  },
});

export function loader(){
  return defer({invitesData: getListOfInvites()})
}


function Invites() {
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  if(user?.isCompany){
    return navigate('/page-not-found')
  }
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: "",
    severity: "",
  });
  const [selectedInvite, setSelectedInvite] = useState(null);
  const loaderPromise = useLoaderData()
 
  const handleViewOffer = (invite) => {
    setSelectedInvite(invite);
    setOpenDialog(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAcceptOffer = (invite) => {
    setIsSubmitting(true)
    try{
      fetch("http://localhost:8800/api/offers/editOffer", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({offerId: invite._id, offerStatus: "accepted"}),
        credentials: 'include'
      })
      .then(res => {
        if(!res.ok){
          setIsSubmitting(false),
          setOpenSnackbar(true),
          setSnackbarMessage({
            message: res.statusText,
            severity: 'error'
          })
          return null
        }

        return res.json()
      })
      .then(result => {
        setIsSubmitting(false)
        setOpenSnackbar(true)
        if(!result?.success){
          setSnackbarMessage({
            message: 'Failed to Accept!',
            severity: 'error'
          })
        }
        setSnackbarMessage({
          message: 'Offer Accepted Successfully,',
          severity: 'success'
        })
       
      })
      
    }catch(error){
      console.log(error)
      setOpenSnackbar(true)
      setSnackbarMessage({
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  };

  function renderInvitesList(invitesData){

    return (
      <>
      <h1>Invites</h1>
      <TableContainer component={Paper} className={classes.tableContainer} sx={{minWidth: "800px"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1rem", color: "#2b2b2b"}}>Company</TableCell>
              <TableCell sx={{ fontSize: "1rem", color: "#2b2b2b" }}>Company Name</TableCell>
              <TableCell sx={{ fontSize: "1rem", color: "#2b2b2b" }}>Job Title</TableCell>
              <TableCell sx={{ fontSize: "1rem", color: "#2b2b2b" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitesData.map((invite, index) => (
              <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#f4f5f6" : "white" ,}}>
                <TableCell sx={{padding: "0.8em"}}>
                  <img src={invite.company_details[0].profileImage} className='invites-image' alt="" />
                </TableCell>
                <TableCell sx={{padding: "0.8em", fontSize: "16px"}}>{invite.company_details[0].companyName}</TableCell>
                <TableCell sx={{padding: "0.8em", fontSize: "16px"}}>{invite.job_details[0].title}</TableCell>
                <TableCell sx={{padding: "0.8em"}}>
                  <Button variant="outlined" sx={{border: "0px", color: "#4cae9b", "&:hover": {color: "#4cae9b", border: "0", backgroundColor: "transparent"}}} onClick={() => handleViewOffer(invite)}>View Offer</Button>
                </TableCell>
                <TableCell sx={{padding: "0.8em"}}>
                  <Button variant="outlined" disabled={isSubmitting} sx={{border: "0px", color: "white",backgroundColor: "#4cae9b", "&:hover": {color: "white", border: "0", backgroundColor: "#4cae9b"}}} onClick={() => handleAcceptOffer(invite)}>
                   {isSubmitting ? <CircularProgress sx={{color: "white"}} size={20} />: "Accept Offer"}
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedInvite && (
          <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
            <DialogTitle>Offer Letter</DialogTitle>
            <DialogContent>
            <div className='proposal-preview-data-container'>
        <div className='proposal-content'>
        <div>
                <div className='heading '>Job Title</div>
                <p className='light cover-letter'>{selectedInvite.job_details[0].title}</p>
            </div>
        <div>
                <div className='heading '>Description</div>
                <p className='light cover-letter'>{selectedInvite.job_details[0].description}</p>
            </div>
            <div>
                <div className='heading '>Company</div>
                <div className='light cover-letter flex'>
                  <div>
                  <img src={selectedInvite.company_details[0].profileImage} alt=""  className="invites-image"/>
                  </div>
                  {selectedInvite.company_details[0].companyName}
                  </div>
            </div>
            <div >
                <div className='heading'>Payment Amount</div>
                <div className='light bid-amount'>$ {selectedInvite.paymentType === "hourly" ? selectedInvite.amount+" /hr" : selectedInvite.amount}</div>
            </div>
           
            <div>
                <div className='heading'>Start Date</div>
                <div className='light bid-amount'>
                {new Date(selectedInvite.startDate).toLocaleString('en', {day: 'numeric', month: 'long', year: 'numeric'})}
                </div>
            </div>
            <div>
                <div className='heading'>Deadline</div>
                <div className='light bid-amount'>
                {new Date(selectedInvite.deadline).toLocaleString('en', {day: 'numeric', month: 'long', year: 'numeric'})}
                </div>
            </div>
            <div>
                <div className='heading '>Message</div>
                <p className='light cover-letter'>{selectedInvite.message}</p>
            </div>
        </div>
    </div>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </TableContainer>
      <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
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
  return (
    <>
    <div className='invites-container'>

    <Suspense fallback={<Spinner />}>
      <Await resolve={loaderPromise.invitesData} errorElement={<Error />}>
        {renderInvitesList}
      </Await>
    </Suspense>

   
      </div>
          </>
  );
}

export default Invites;
