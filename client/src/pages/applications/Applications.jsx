import React, { Suspense, useContext, useState } from 'react';
import ApplicantList from "../../components/applicantList/ApplicantList"
import "./Applications.css"
import { Typography } from '@mui/material';
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { getListOfJobsPostedAndApplications } from '../../utils';
import UserContext from '../../context/Usercontext.js';

export function loader(){
  return defer({applicantsList : getListOfJobsPostedAndApplications()})
}
export 
function Applications() {
const loaderPromise = useLoaderData()
const navigate = useNavigate()
const {user} = useContext(UserContext)
if(!user.isCompany){
  return navigate('/page-not-found')
}
function renderApplicantsList(applicantsList){

  return (
      
       <div className='applicants-list scroll-function'>
        <ApplicantList   applicantsList={applicantsList}/>
        </div>
    
  )
}
  return (
    <div>
      <div className='applications-container'>
      <Typography variant='h5' >Applications</Typography>
        <Suspense fallback={<Spinner />}>
          <Await resolve={loaderPromise.applicantsList} errorElement={<Error />}>
              {renderApplicantsList}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}

export default Applications