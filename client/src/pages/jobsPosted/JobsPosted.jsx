import React, { Suspense, useContext } from 'react'
import {Await, defer, useLoaderData, useNavigate} from "react-router-dom"
import Filter from '../../components/filter/Filter'
import PostedJobsList from '../../components/postedJobsList/PostedJobsList'
import { Typography } from '@mui/material'
import "./JobsPosted.css"
import { getListOfApplicants, getListOfJobsPosted } from '../../utils'
import Spinner from '../../components/Spinner/Spinner'
import UserContext from '../../context/Usercontext'

export function loader(){
  return defer({jobsData: getListOfJobsPosted()})
}

function JobsPosted() {
  const loaderPromise = useLoaderData()
  const navigate = useNavigate()
const {user} = useContext(UserContext)
if(!user.isCompany){
  return navigate('/page-not-found')
}

  function renderPostedJobsList(jobsData){

    return (
      <PostedJobsList jobsData={jobsData}/>
    )
  }
  return (
    <div>
      <div className='jobs-posted-container'>
    <div>
        <Typography variant='h5'>Posted Jobs</Typography>
    </div>
    <div className='jobs-list scroll-function'>
      <Suspense fallback={<Spinner />}>
        <Await resolve={loaderPromise.jobsData}>
          {renderPostedJobsList}
        </Await>
      </Suspense>
    </div>
    
      </div>
    </div>
  )
}

export default JobsPosted