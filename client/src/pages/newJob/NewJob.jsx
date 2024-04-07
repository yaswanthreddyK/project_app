import React, { useContext, useState } from "react";
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
import "./NewJob.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import UserContext from "../../context/Usercontext.js";


const NewJob = () => {
  const navigate = useNavigate()
const {user} = useContext(UserContext)
if(!user.isCompany){
  return navigate('/page-not-found')
}
  const userData = useOutletContext()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: "",
    severity: "",
  });
  const initialState = {
    title: "",
    description: "",
    budget: {
        "min": "",
        "max": "",
    },
    skillsRequired: [],
    experienceRequired: "",
    duration: "",
    jobType: "",
    hourly: false,
    jobRole: "",
    location:"",
    deadline: "",
    responsibilities: ""

  }
  const [formData, setFormData] = useState({
   ...initialState
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    try {
        fetch('http://localhost:8800/api/jobs/createJob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formData : {
                    ...formData,
                    author: userData._id
                }
            }),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(result => {
            setSnackbarMessage({
             message: result.message,
             severity: result.success ? 'success' : 'error'
            })
            if(result.success){
                formData({...initialState})
            }
        })
    } catch (error) {
        setSnackbarMessage({
            message: error.message,
            severity: 'error'
        })
        console.log(error.message)
    }finally{
        setOpenSnackbar(true)
        setIsSubmitting(false)
    }
    
  };


  function handleLocationChange(event){
    setFormData(prevData => (
        {
            ...prevData,
            location: event.target.value
        }
    ))
  }

  function handleDeadlineChange(event){
    setFormData(prevData => (
        {
            ...prevData,
            deadline: event.target.value
        }
    ))
  }

  function handleTitleChange(event){
    setFormData(prevData => (
        {
            ...prevData,
            title: event.target.value
        }
    ))
  }

  function handleDescriptionChange(event){
    setFormData(prevData => (
        {
            ...prevData,
            description: event.target.value
        }
    ))
  }

  function handleExperienceChange(event){
    setFormData(prevData => (
        {
            ...prevData,
            experienceRequired: event.target.value
        }
    ))
  }

  function handleSkillsChange(event, value){
    setFormData(prevData => (
        {
            ...prevData,
            skillsRequired: value
        }
    ))
  }

  function handleBudgetChange(event){
    if(event.target.value < 0){
        event.target.value = ""
        return
    }
    setFormData(prevData => ({
        ...prevData,
        budget: {
            ...prevData.budget,
            [event.target.name]: event.target.value > 0 ? Number(event.target.value) : ''
        }
    }))
  }

  function handleJobType(event){
    setFormData(prevData => ({
        ...prevData,
        jobType: event.target.value
    }))
  }


  function handleDurationChange(event){
    setFormData(prevData => ({
        ...prevData,
        duration: event.target.value
    }))
  }

  function handleJobRoleChange(event){
    setFormData(prevData => ({
        ...prevData,
        jobRole: event.target.value
    }))
  }

  function handleHourlyChecked(event){
    setFormData(prevData => ({
        ...prevData,
        hourly: event.target.checked
    }))
  }

  function handleResponsibilitiesChange(event){
    setFormData(prevData => ({
        ...prevData,
        responsibilities: event.target.value
    }))
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="job-form">
      <form onSubmit={handleSubmit}>
        <h2>Job posting form</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              placeholder="eg: MERN Stack developer needed"
              value={formData.title}
              onChange={handleTitleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={formData.description}
              onChange={handleDescriptionChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="skills required"
              name="skills required"
              options={[
                "HTML",
                "CSS",
                "JavaScript",
                "Python",
                "Java",
                "MongoDB",
                "React",
                "Flask",
                "Django",
                "NodeJS",
                "ExpressJS",
              ]}
              value={formData.skillsRequired}
              onChange={handleSkillsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Skills needed"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ backgroundColor: "white" }}>
                Experience Needed
              </InputLabel>
              <Select
                value={formData.experienceRequired}
                onChange={handleExperienceChange}
                required
              >
                <MenuItem value="Entry">Entry</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ backgroundColor: "white" }}>
               Duration
              </InputLabel>
              <Select
                value={formData.duration}
                onChange={handleDurationChange}
                required
              >
                <MenuItem value="less than 1 month">
                   less than 1 month
                </MenuItem>
                <MenuItem value="1 to 3 months">1 to 3 months</MenuItem>
                <MenuItem value="more than 6 months">more than 6 months</MenuItem>
              </Select>
            </FormControl>
          </Grid>
         
         
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Minimun Budget"
              placeholder="$ min"
              name="min"
              onWheel={(e) => e.target.blur()}
              inputMode="numeric"
              value={formData.budget["min"]}
              onChange={handleBudgetChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              onWheel={(e) => e.target.blur()}
              name="max"
              label="Maximum Budget"
              placeholder="$ max"
              value={formData.budget["max"]}
              onChange={handleBudgetChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={<Checkbox checked={formData.hourly} onChange={handleHourlyChecked} />}
            label="Is it an hourly payment Job?"
          />
        </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ backgroundColor: "white" }}>
                Job Type
              </InputLabel>
              <Select
                value={formData.jobType}
                onChange={handleJobType}
              >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Volunteer">Volunteer</MenuItem>
                <MenuItem value="Paid Fellowship">Paid Fellowship</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Role"
            placeholder="eg: Software Engineer"
            value={formData.jobRole}
            onChange={handleJobRoleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            placeholder="City, Country"
            value={formData.location}
            onChange={handleLocationChange}
          />
        </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Deadline"
            type="date"
            value={formData.deadline}
            onChange={handleDeadlineChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Job Responsibilities"
              placeholder="1) Build an application"
              value={formData.responsibilities}
              onChange={handleResponsibilitiesChange}
            />
          </Grid>
          <Grid item xs={12} sx={{display: "flex",justifyContent: "flex-end"}}>
            <Button variant="contained" type="submit" disabled={isSubmitting} sx={{backgroundColor: "#4cae9b", "&:hover": {backgroundColor: "#4cae9b"}}}>
            {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Post Job"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
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

export default NewJob;
