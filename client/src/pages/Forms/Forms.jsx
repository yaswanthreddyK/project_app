import React, { Suspense } from 'react'
import { Await, Outlet, defer, redirect, useLoaderData } from 'react-router-dom'
import { getUser } from '../../utils.js'
import Spinner from '../../components/Spinner/Spinner.jsx'
export function loader(){
    return defer({userData: getUser()})
}

function Forms() {
 const loaderPromise = useLoaderData()

 function renderForms(userData){
    if(!userData || userData.length === 0){
        return redirect('/login')
    }
    return <Outlet context={userData}/>
 }

  return (
    <div>
        <Suspense fallback={<Spinner />}>
            <Await resolve={loaderPromise.userData}>
                {renderForms}
            </Await>
        </Suspense>
    </div>
  )
}

export default Forms