import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from "@mui/material";
import ProposalPreviewModal from "../viewProposal/ViewProposalTalent";
import "./ApplicantList.css";
import { Link, useNavigate } from 'react-router-dom';
import { fetchSingleJob, fetchSingleUser } from '../../utils';


function ApplicantList({applicantsList }) {
  const navigate = useNavigate()
async function handleSendContractClick(applicantId, jobId){
  try {
    const jobDetails = await fetchSingleJob(jobId)
    const applicantDetails = await fetchSingleUser(applicantId)
    navigate("/forms/newContract", {state: {jobDetails, applicantDetails}})
  } catch (error) {
    console.log(error)
  }
}
  return (   
    <TableContainer component={Paper} sx={{ marginTop: "20px", width: "1200px"}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Profile</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Name</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Job Applied to</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}></TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}></TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicantsList.map((applicant, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f4f5f6" : "white",
                }}
                sx={{width: "100%"}}
              >
              
                <TableCell sx={{padding: "0em 0 0 0.5em",Width: "100px",fontSize: "1rem" , color: "#2b2b2b"}}>
                  <img className='applicant-img' src={applicant.author_details[0].profileImage} alt="" />
                </TableCell>
                <TableCell sx={{  minWidth: "150px", fontSize: "1rem", color: "#2b2b2b"}}>
                  {applicant.author_details[0].fullName}
                </TableCell>
                <TableCell sx={{ minWidth: "500px", fontSize: "1rem", color: "#2b2b2b"}}>
                  {applicant.title}
                </TableCell>
                <TableCell sx={{ minWidth: "100px", fontSize: "1rem"}}>
                  <ProposalPreviewModal proposal={applicant.job_proposals} title={applicant.title} author={applicant.author_details[0]}/>
                </TableCell>
                <TableCell sx={{ minWidth: "100px"}}>
                  <Link to={`/forms/newContract?applicant=${applicant.author_details[0]._id}&jobId=${applicant.job_proposals.jobId}`}>
                    <button style={{fontSize: "1rem"}} onClick={()=> {handleSendContractClick(applicant.author_details[0]._id, applicant.job_proposals.jobId)}} className='message-btn'>Send Contract</button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>        
  )
}

export default ApplicantList;