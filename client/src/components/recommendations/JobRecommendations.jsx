import { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, Divider } from '@mui/material';
import JobDetailedCard from "../jobDetailedCard/JobDetailedCard";
import { Link, defer } from 'react-router-dom';
import CompanyRecommendations from './CompanyRecommendations';
import "./JobRecommendations.css"
import { getRecommendedJobs } from '../../utils';
import Spinner from '../Spinner/Spinner';

export function loader(){
  return defer({jobsList : ""})
}

const   JobRecommendations = ({jobTitle}) => {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect( ()=>{
    setError("")
    setIsLoading(true)
    const fetchDetails = async () => {
      const result = await getRecommendedJobs(jobTitle)
      if(result.message){
        setError(message)
        setIsLoading(false)
      }else{
        setIsLoading(false)
        setJobs(result)
      }
      console.log("fetch call")
    }
    
      fetchDetails()  
  },[])

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} sx={{color: "#4cae9c", border: 0, "&:hover": {backgroundColor: "transparent", border: 0}}}>Recommendations</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" >
        <DialogTitle>Similar Jobs</DialogTitle>
        <DialogContent>
    {
      (error) ?
       <Error /> 
       : isLoading ? <Spinner /> :
          <Grid container spacing={2}>
            <div className="all-recommendations">
            <div className='job-recommendations'>
              {
                jobs.map((job, index) => {
                  return (
                    <Link key={index} to={`/jobs/${job._id}`}>
                      <JobDetailedCard job={job}/>
                    </Link>
                  )
                })
              }
            </div>
            </div>
          </Grid>
      }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobRecommendations;
