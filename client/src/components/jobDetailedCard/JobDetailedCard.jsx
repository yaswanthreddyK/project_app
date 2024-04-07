import { LocationCity, Payment, Verified, VerifiedUserOutlined } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import React, { useState } from 'react'
import "./JobDetailedCard.css"

function JobDetailedCard({job}) {

  return (
    <div>
      <div>
        <div className='job-card-container'>
          <div className=''>
              Posted 29 minutes ago.
          </div>
          <div className='job-title font-bold'>
           {job.title}
          </div>
          <div className='job-details'>
              <div className='job-type'>{job.jobType}</div>
              <div className='experience'>{job.experienceRequired}</div>
              <div className='estimated-budget'>{`Est budget: $${job.budget.min} - $${job.budget.max} `}</div>
          </div>
          <div className='job-description font-light'>
            {job.description}
          </div>
          <div className='skills'>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {job.skillsRequired.map(skill => (
              <Chip key={skill} label={skill} sx={{backgroundColor: "#9fe4d636"}}/>
              ))}
          </Box>
          </div>
          <div className='client-details'>
              <div className='payment-verified'>
                <Verified className='icon' />
                Payment verified
              </div>
              <div className='money-spent'>$500 Spent</div>
              <div className='location'>
                <LocationCity className="icon"/>
                {job.location}
              </div>
          </div>
          <div className='no-of-proposals'>
            Proposals : 5 - 10
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailedCard