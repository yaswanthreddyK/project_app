import React, { Suspense, useContext } from 'react'
import ClientDashboard from './ClientDashboard'
import TalentDashboard from './TalentDashboard'
import UserContext from '../../context/Usercontext.js'
import Error from '../../components/Error/Error'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { getListOfContracts, getStats  } from '../../utils'
import Spinner from '../../components/Spinner/Spinner'

export function loader(){
  return defer({contractList: getListOfContracts(), stats: getStats()})
}

function Dashboard() {
  const {user} = useContext(UserContext)
  const loaderPromise = useLoaderData()

function renderDashboard([contractList, stats]){
    return (
      <>
      {user.isCompany ? <ClientDashboard contractList={contractList} stats={stats[0]}/> : <TalentDashboard contractList={contractList} stats={stats[0]}/>}
      </>
    )
  }
  return (
    <div>
       <Suspense fallback={<Spinner />}>
              <Await resolve={Promise.all([loaderPromise.contractList, loaderPromise.stats])} errorElement={<Error />}>
                {renderDashboard}
              </Await>
            </Suspense>
    </div>
  )
}

export default Dashboard