import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
import ProposalPreviewModal from '../viewProposal/ViewProposalTalent';
import JobRecommendations from '../recommendations/JobRecommendations';

function ProposalList({proposals}) {

  return (
    <TableContainer component={Paper} sx={{ marginTop: "20px", padding: "2em", backgroundColor: "white", borderRadius: "8px"}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Job Title</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Job Role</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Initiated</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proposals.map((proposal, index) => (
              <TableRow
                key={proposal._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f4f5f6" : "white",
                }}
                sx={{width: "100%"}}
              >
              
                <TableCell sx={{ padding: "1em",width: "300px",fontSize: "1rem" , color: "#2b2b2b"}}>{proposal.job_details[0].title}</TableCell>
                <TableCell sx={{ padding: "1em",width: "300px",fontSize: "1rem" , color: "#2b2b2b"}}>{proposal.job_details[0].jobRole}</TableCell>
                <TableCell sx={{ padding: "1em" , minWidth: "100px", fontSize: "1rem", color: "#2b2b2b"}}>
                  {new Date(proposal.createdAt).toLocaleString().split(",")[0]}
                </TableCell>
               
                <TableCell sx={{ padding: "1em" , minWidth: "150px", fontSize: "1rem", color: "#2b2b2b"}}>
                  <JobRecommendations jobTitle={proposal.job_details[0].title}/>
                </TableCell>
                <TableCell sx={{ padding: "0em" , minWidth: "100px", fontSize: "1rem"}}>
                <ProposalPreviewModal proposal={proposal} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>        
  )
}

export default ProposalList;