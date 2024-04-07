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
import ContractPreviewModal from '../viewContract/ViewContractClient';

function OnHireList({contractList}) {

   
  return (   
    <TableContainer component={Paper} sx={{ marginTop: "20px"}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Profile</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Name</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Job</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Initiated Date</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractList.map((contract, index) => (
              <TableRow
                key={contract._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f4f5f6" : "white",
                }}
                sx={{width: "100%"}}
              >
              
                <TableCell sx={{ padding: "0.2em",fontSize: "1rem" , color: "#2b2b2b"}}>
                  <img style={{width: "50px", height: "50px"}} src={contract.employee_details[0].profileImage} alt="" />
                </TableCell>
                <TableCell sx={{ padding: "0.2em" , minWidth: "150px", fontSize: "1rem", color: "#2b2b2b"}}>
                 {contract.employee_details[0].fullName}
                </TableCell>
                <TableCell sx={{ padding: "0.2em" , minWidth: "100px", fontSize: "1rem", color: "#2b2b2b"}}>
                  {contract.job_details[0].title}
                </TableCell>
                <TableCell sx={{ padding: "0.2em" , minWidth: "100px", fontSize: "1rem", color: "#2b2b2b"}}>
                  {new Date(contract.startDate).toLocaleString('en', {day: 'numeric', month: 'long', year: 'numeric'})}
                </TableCell>
                <TableCell sx={{ padding: "0.2em" , minWidth: "100px", fontSize: "1rem"}}>
                <ContractPreviewModal contract={contract}/>
                </TableCell>
                <TableCell sx={{ padding: "0.2em" , minWidth: "100px"}}>
                    <button style={{fontSize: "1rem"}} className='message-btn'>Message</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>        
  )
}

export default OnHireList;