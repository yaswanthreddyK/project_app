import React from 'react'
import {Box, Chip} from "@mui/material"
import "./ProposalPreview.css"
import ProfessionalRecommendations from '../recommendations/ProfessionalRecommendations'

function ProposalPreview({proposal, author, title}) {
  
  return (
    <div className='proposal-preview-data-container'>
        <div className='proposal-content'>
            <div>
                <div className='heading '>Cover Letter</div>
                <p className='light cover-letter'>{proposal.coverLetter}</p>
            </div>
            <div>
                <div className='heading'>Proposed Bid</div>
                <div className='light bid-amount'>$ {proposal.paymentType === "hourly" ? proposal.price.hourly+" /hr" : proposal.price.fixed}</div>
            </div>
            <div>
                <div className='heading '>About</div>
                <p className='light cover-letter'>{author.shortDescription}</p>
            </div>
            <div>
                <div className='heading'>Skills</div>
                <div className='light'>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                 {author.skills.map(skill => (
                    <Chip key={skill} label={skill} sx={{backgroundColor: "#9fe4d636", color: "#2b2b2b"}}/>
              ))}
                </Box>
                </div>
            </div>
        </div>
        <div className='professional-recommendation-list'>
            <h3 className='heading'>Recommendations</h3>
          <ProfessionalRecommendations jobRole={author.jobRole} skills={author.skills} professionalId={author._id}/>
        </div>
    </div>
  )
}

export default ProposalPreview