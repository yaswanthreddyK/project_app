import React, { useContext } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useFormControl
  } from "@mui/material";
  import UserContext from '../../context/Usercontext'
import ContractPreviewModal from '../viewContract/ViewContractClient';
import ContractPreviewModalTalent from '../viewContract/ViewContractTalent';

function ContractList({contractList}) {
 const {user} = useContext(UserContext)

  return (   
    <TableContainer component={Paper} sx={{ marginTop: "20px"}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Job Title</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Job Role</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}>Initiated Date</TableCell>
              <TableCell sx={{fontSize: "1rem", color: "#2b2b2b"}}></TableCell>
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
              
                <TableCell sx={{ padding: "1em",minWidth: "200px",fontSize: "1rem" , color: "#2b2b2b"}}>{contract.job_details[0].title}</TableCell>
                <TableCell sx={{ padding: "1em" , minWidth: "150px", fontSize: "1rem", color: "#2b2b2b"}}>
                  {contract.job_details[0].jobRole}
                </TableCell>
                <TableCell sx={{ padding: "1em" , minWidth: "100px", fontSize: "1rem", color: "#2b2b2b"}}>
                  {new Date(contract.startDate).toLocaleString('en', {day: 'numeric', month: 'long', year: 'numeric'})}
                </TableCell>
                <TableCell sx={{ padding: "0em" , minWidth: "100px", fontSize: "1rem"}}>
               {user.isCompany ?  <ContractPreviewModal contract={contract}/> : <ContractPreviewModalTalent contract={contract}/>}
                </TableCell>
                <TableCell sx={{ padding: "em" , minWidth: "100px"}}>
                    <button style={{fontSize: "1rem"}} className='message-btn'>Message</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>        
  )
}

export default ContractList;