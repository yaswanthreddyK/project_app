import React, { Suspense, useContext, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import "./NewContract.css";
import { Await, defer, useLoaderData, useLocation, useOutletContext, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner"
import Error from "../../components/Error/Error"
import UserContext from "../../context/Usercontext";


const NewContract = () => {
 const location = useLocation()
 const navigate = useNavigate()
const {user} = useContext(UserContext)
if(!user.isCompany){
  return navigate('/page-not-found')
}
 const applicantDetails = location.state.applicantDetails
 const jobDetails = location.state.jobDetails
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: "",
    severity: "",
  });
  const initialState = {
    receiverName: applicantDetails.fullName,
    jobTitle: jobDetails.title,
    message: "",
    paymentType: "",
   amount: "",
    deadline: "",
    startDate: ""
  };
  const [formData, setFormData] = useState({ ...initialState });

  const handleSubmit =  (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    formData.append('jobId', jobDetails._id)
    formData.append('employeeId', applicantDetails._id)
    setIsSubmitting(true);
    const payload = Object.fromEntries(formData)
    try{
      fetch('http://localhost:8800/api/offers/createOffer',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      })
      .then(res => {
        if(res.ok){
          return res.json()
        }else{
          setOpenSnackbar(true)
          setIsSubmitting(false)
          setSnackbarMessage({
            message: res.statusText,
            severity: "error"
          })
        }
      })
      .then(result => {
        if(result.success){
          setIsSubmitting(false)
          setOpenSnackbar(true)
          setSnackbarMessage({
            message: "Contract Sent!",
            severity: "success"
          })
        }else{
          setIsSubmitting(false)
          setOpenSnackbar(true)
          setSnackbarMessage({
            message: 'Failed to send Contract!',
            severity: 'error'
          })
        }
      })
    }catch(error){
      console.log(error)
      setIsSubmitting(false)
      setOpenSnackbar(true)
      setSnackbarMessage({
        message: 'Failed to send contract',
        severity: "error"
        
      })
    }
    
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  function handlePaymentTypeChange(e){
    setFormData(prev => ({
      ...prev,
      paymentType: e.target.value
    }))
  }

  function handleAmountChange(e){
    setFormData(prev => ({
      ...prev,
      amount: e.target.value
    }))
  }

  return (
    <div className="contract-form">
      {
        location.state.jobDetails ? 
        <form onSubmit={handleSubmit}>  
  <h2>Contract Creation Form</h2>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Receiver's Name"
        value={applicantDetails.fullName}
        required
        />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Job Title"
        value={jobDetails.title}
        required
        />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Message"
        name="message"
        value={formData.message}
        onChange={(e) =>
          setFormData({
            ...formData,
            message: e.target.value,
          })
        }
        />
    </Grid>
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel sx={{backgroundColor: "white"}}>Payment Terms</InputLabel>
        <Select
          value={formData.paymentType}
          name="paymentType"
          onChange={handlePaymentTypeChange}
          required
          >
          <MenuItem value="Hourly" name="hourly">Hourly</MenuItem>
          <MenuItem value="Fixed" name="fixed">Fixed</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="number"
        label="Payment Amount"
        placeholder="$"
        name="amount"
        value={formData.amount}
        onChange={handleAmountChange}
        required
        />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="date"
        label="Start Date"
        name="startDate"
        value={formData.startDate}
        onChange={(e) =>
          setFormData({ ...formData, startDate: e.target.value })
        }
        InputLabelProps={{
          shrink: true,
        }}
        required
        />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="date"
        label="Deadline"
        name="deadline"
        value={formData.deadline}
        onChange={(e) =>
          setFormData({ ...formData, deadline: e.target.value })
        }
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
    </Grid>
   
    <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        sx={{backgroundColor: "#4cae9b", "&:hover": {backgroundColor: "#4cae9b"}}}
        >
        {isSubmitting ? (
          <CircularProgress size={24} sx={{color: "white"}}/>
        ) : (
          "Send Offer"
          )}
      </Button>
    </Grid>
  </Grid>

      </form> 
      :
      <CircularProgress sx={{color: "white"}}/>
    }
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
    </div>
  );
};

export default NewContract;
