import React, { useEffect, useState } from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputAdornment, Select, MenuItem, Input, Button, CircularProgress, Snackbar, Alert, IconButton, Grid, Box } from '@mui/material';
import "./ProposalForm.css";
import Spinner from '../Spinner/Spinner';

function ProposalForm({jobId}) {
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialState = {
    coverLetter: "",
    paymentType: "",
    price: {
      hourly: "",
      fixed: ""
    },
    duration: "",
    resume: ""
  }

  
  const [formData, setFormData] = useState({
   ...initialState
  })
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

  const handleCoverLetterChange = (event) => {
    setFormData(prevData => (
      {
        ...prevData,
        coverLetter: event.target.value
      }
    ))
  };

  const handlePaymentTypeChange = (event) => {
    setFormData(prevData => ({
      ...prevData,
      paymentType: event.target.value
    }))
  };

  const handleHourlyRateChange = (event) => {
   setFormData(prevData => ({
    ...prevData,
    price: {
      ...prevData.price,
      hourly: event.target.value
    }
   }))
  };

  const handleFixedPriceChange = (event) => {
    setFormData(prevData => ({
      ...prevData,
      price: {
        ...prevData.price,
        fixed: event.target.value
      }
     }))
  };

  const handleDurationChange = (event) => {
    setFormData(prevData => ({
      ...prevData,
      duration: event.target.value
    }))
  };

  const handleCancelResumeUpload = (e) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          resume: '',
        }));
      
  }

  const handleResumeChange =  (e) => {
    const file = e.target.files[0];
    const fileSize = e.target.files[0].size/1000
    if(fileSize > 300){
      setOpenSnackbar(true)
      setSnackbarMessage({
        message: 'File size is too big (Max: 280KB)',
        severity: 'error' 
      })
      e.target.value = "";
      return;
    }
    if(file){
      setUploading(true)
      try{
        const reader = new FileReader()
        reader.onload = () => {
          setFormData(prevData => ({
            ...prevData,
            resume: reader.result
          }))
        }
        reader.readAsDataURL(file)
        setOpenSnackbar(true)
        setSnackbarMessage({
          message: 'Resume uploaded',
          severity: 'success'
        })
        setUploading(false)
      }catch(error){
        setOpenSnackbar(true)
        setSnackbarMessage({
          message: 'Resume upload failed!',
          severity: 'error'
        })
        setUploading(false)
      }
    }
  };


  const handleSubmit =  (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    const newFormData = new FormData(event.target)
   newFormData.append('coverLetter', formData.coverLetter)
   console.log(jobId)
   newFormData.append('jobId', jobId)
   newFormData.append('price', JSON.stringify(formData.price))
   newFormData.append('resume', formData.resume)
   newFormData.append('duration', formData.duration)
   console.log(newFormData.get('price'))
  try {
     fetch("http://localhost:8800/api/proposals/createProposal", {
      method: "POST",
      body: newFormData,
      credentials: 'include'
    })
    .then(res => {
      if(res.status)
      return res.json()
  })
  .then(result => {
       setOpenSnackbar(true)
       setSnackbarMessage({
         message: result.message,
         severity: result.success ? 'success' : 'error'
        })
        setIsSubmitting(false)
      })
      .catch((error)=>{ 
         setOpenSnackbar(true)
         setIsSubmitting(false)
         setSnackbarMessage({
          message: 'Something went wrong! Try again.',
          severity: 'error'
         })
         setIsSubmitting(false)
      })
    } catch (error) {
      setOpenSnackbar(true)
      setSnackbarMessage({
        message: 'Failed to submit proposal',
        severity: 'error'
      })
      setIsSubmitting(false)
    }

  console.log(formData)

  };

  return (
    <div className='proposal-flex-direction'>
      <form  onSubmit={handleSubmit} encType='multipart/form-data' >
        <Box sx={{display: "flex", flexDirection: "column", gap: "1em"}}>

      <TextField
        label="Cover Letter"
        multiline
        rows={4}
        value={formData.coverLetter}
        onChange={handleCoverLetterChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ width: "100%" }}
        required
        />
      <FormControl component="fieldset" sx={{borderBottom: "1px solid #e1e1e1"}}>
        <FormLabel component="legend" >Payment Type</FormLabel>
        <RadioGroup aria-label="payment-type" name="paymentType" value={formData.paymentType} onChange={handlePaymentTypeChange} >
          <FormControlLabel value="fixed" control={<Radio />} label="Fixed Price" required />
          {formData.paymentType === 'fixed' && (
            <TextField
              label="Price"
              type="number"
              value={formData.price.fixed}
              onChange={handleFixedPriceChange}
              onWheel={(e) => e.target.blur()}
              fullWidth
              margin="normal"
              variant="outlined"
              inputProps={{ min: 5 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              required
              />
              )}
          <FormControlLabel value="hourly" control={<Radio />} label="Hourly Rate" required/>
          {formData.paymentType === 'hourly' && (
            <TextField
            label="Rate"
            type="number"
            value={formData.price.hourly}
            onChange={handleHourlyRateChange}
            onWheel={(e) => e.target.blur()}
            fullWidth
            margin="normal"
            variant="outlined"
            inputProps={{ min: 5 }}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              required
              />
              )}
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined" sx={{display: 'block', maxWidth: "200px" }} >
        <Select
          value={formData.duration}
          onChange={handleDurationChange}
          displayEmpty
          inputProps={{ 'aria-label': 'time' }}
          sx={{width: "200px"}}
          required
          >
          <MenuItem value="" disabled>
            Duration
          </MenuItem>
          <MenuItem value={'less than a month'}> less than a month</MenuItem>
          <MenuItem value={'1 to 3 months'}>1 to 3 months</MenuItem>
          <MenuItem value={'more than 6 months'}>more than 6 months</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" >
        <FormLabel >Upload Resume</FormLabel>
        <Input
          type="file"
          onChange={handleResumeChange}
          sx={{ display: 'none' }}
          inputProps={{ accept: '.pdf,.doc,.docx' }}
          id="upload-resume"
          name='resume'
          />
          {
            formData.resume && (
              <>
            <Button variant="contained"  onClick={handleCancelResumeUpload}  component="span" sx={{maxWidth: "180px",backgroundColor: "#ff474c",'&:hover': {backgroundColor: "red"}}}>
              Cancel
            </Button>
              </>
            )
          }
          {
            !formData.resume &&
            <label htmlFor="upload-resume">
          <Button variant="contained"  component="span" sx={{ backgroundColor: "#4cae9b",'&:hover': {backgroundColor: "#4cae9b"}}}>
            {
              uploading ? <Spinner/> : formData.resume ? 'Cancel' : 'Upload'
            }
          </Button>
        </label>
        }
      </FormControl>
      <div className="submit-button ">
         <Grid container sx={{display: "flex", justifyContent: "flex-end"}}>
        <Button variant="contained" type='submit' sx={{backgroundColor: "#4cae9b", '&:hover': {backgroundColor: "#4cae9b"}}}>
          {
            isSubmitting  ? <CircularProgress sx={{color: "white"}} size={20}/> : "Submit"
          }
        </Button>
         </Grid>
      </div>
      </Box>
      </form>
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
    </div>
  );
}

export default ProposalForm;
