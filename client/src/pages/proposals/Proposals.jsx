import React, { Suspense, useContext } from 'react'
import ProposalList from '../../components/proposalList/ProposalList'
import "./Proposals.css"
import { Typography } from '@mui/material'
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom'
import { getListOfProposals } from '../../utils'
import Spinner from '../../components/Spinner/Spinner'
import Error from "../../components/Error/Error"
import UserContext from '../../context/Usercontext.js'

export function loader(){
  return defer({proposalData: getListOfProposals()})
}

function Proposals() {
  const loaderPromise = useLoaderData()
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  if(user?.isCompany){
    return navigate('/page-not-found')
  }
  function renderProposalList(proposalData){

    return (
      <div>
      <ProposalList proposals={proposalData}/>
      </div>
    )

  }
  return (
    <div className='proposals-container'>

    <div className='proposal-heading'>
    <Typography variant='h4' gutterBottom>Proposals</Typography>
    </div>
    
    <Suspense fallback={<Spinner />}>
      <Await resolve={loaderPromise.proposalData}>
        {renderProposalList}
      </Await>
    </Suspense>
   
    </div>
  )
}

export default Proposals