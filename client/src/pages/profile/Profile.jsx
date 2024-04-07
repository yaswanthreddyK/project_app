import React, { Suspense } from 'react';
import ClientProfile from './ClientProfile';
import TalentProfile from './TalentProfile';
import "./Profile.css";
import { getUser } from '../../utils';
import { Await, defer, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/Error/Error';

export async function loader(){
   return defer({userData: getUser()})
}
 
function Profile() {
  const userPromise = useLoaderData()
 const location = useLocation() 
 const navigate = useNavigate()
  function renderProfile(userData){
    if(userData === null){
      navigate("/login", {state: {redirectUrl: `${location.pathname}`}})
    }
    
    return (
      <>
       { userData.isCompany ? (<ClientProfile />) : (<TalentProfile />)}
      </>
    )
  }
  return ( 
    <div>
      <Suspense fallback={<Spinner />}>
       <Await resolve={userPromise.userData} errorElement={<Error />}>
        {renderProfile}
       </Await>
      </Suspense>
   
    </div>
  )
}

export default Profile