import React from 'react'
import {Box, Chip} from "@mui/material"
import "./ProposalPreview.css"

function ProposalPreviewTalent({proposal}) {
  return (
    <div className='proposal-preview-data-container'>
        <div className='proposal-content'>
            <div>
            <div className='heading'>Job Title</div>
            <p className='light'>{proposal.job_details[0].title}</p>
            </div>
            <div>
                <div className='heading'>Description</div>
                <p className='light cover-letter'>{proposal.job_details[0].description}</p>
            </div>
            <div>
                <div className='heading'>Skills Required</div>
                <p className='light'>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                 {proposal.job_details[0].skillsRequired.map(skill => (
                    <Chip key={skill} label={skill} sx={{backgroundColor: "#9fe4d636", color: "#2b2b2b"}}/>
              ))}
                </Box>
                </p>
            </div>
            <div>
                <div className='heading'>Proposed Bid</div>
                <div className='light bid-amount'>$ {`${proposal.jobType === "hourly" ? proposal.price.hourly+"/hr" : proposal.price.fixed}`}</div>
            </div>
            <div>
                <div className='heading'>Cover Letter</div>
                <p className='light cover-letter'>{proposal.coverLetter}</p>
            </div>
            <div>
                <div className='heading'>Duration</div>
                <p className='light'>{proposal.duration}</p>
            </div>
          
        </div>
    </div>
  )
}

export default ProposalPreviewTalent;