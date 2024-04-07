import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Divider,
  Chip,
  Box
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./JobCard.css";
import { MonetizationOn, Money } from '@mui/icons-material';
import { fetchSingleUser } from '../../utils';

function JobCard({ job }) {
  const [company, setCompany] = useState("")

  useEffect(()=> {
    const fetchUser = async () =>{
      const result = await fetchSingleUser(job.author)
      setCompany(result)
    }
    fetchUser()
  },[job])


  return (
    <div className='job-card'>

    <Card sx={{ display: 'flex', flexDirection: 'column', padding: "1em", backgroundColor: "white", margin: "1em", width: "100%"}}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' } }}>
        <CardMedia
          component="img"
          sx={{ width: 70, height: 70, borderRadius: '0%', objectFit: 'cover', marginRight: "0.5em"}}
          image={company.profileImage}
          alt={company.companyName}
          />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, ml: { xs: 0, md: 1 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: "column" }}>
            <div>
              <Typography variant="h6">{company.companyName}</Typography>
              <Typography variant="subtitle1">{job.jobRole}</Typography>
            </div>
              <Box sx={{display: "flex", gap: "0.5em", }}>
              <Typography variant="subtitle2" sx={{ fontFamily: 'prompt-light !important'}}>{job.jobType}</Typography>
        <Typography variant="subtitle2" sx={{fontFamily: 'prompt-light !important'  }}>{job.experienceRequired}</Typography>
              </Box>
            <Typography variant="subtitle1" sx={{display: "flex", gap: "0.5em"}}>
              <MonetizationOn className='icon'/>
              {`$${job.budget.min} - $${job.budget.max}`}
              </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {job.skillsRequired.map(skill => (
              <Chip key={skill} label={skill} sx={{backgroundColor: "#9fe4d636", color: "#2b2b2b"}}/>
              ))}
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1, color: "#4cae9b"}} />
          <Typography variant="subtitle2">{job.location}</Typography>
        </Box>
        
      </Box>
    </Card>
    </div>
  );
}

export default JobCard;




