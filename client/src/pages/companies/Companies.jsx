import React, { Suspense, useEffect, useState } from 'react'
import "./Companies.css"
import CompanyCard from '../../components/companyCard/CompanyCard'
import { Await, Link, defer, useLoaderData, useOutletContext } from 'react-router-dom'
import { getSearchResult } from '../../utils'
import Spinner from '../../components/Spinner/Spinner'

export function loader(){
  return defer({companyList : getSearchResult()})
}

function Companies() {
  const [searchCredentials, setSearchCredentials] = useOutletContext()
  const [emptyRecords, setEmptyRecords] = useState(false)
  const [companies, setCompanies] = useState([])
  const loaderPromise = useLoaderData()

  useEffect(()=>{
    const fetchResults = async () => {
      const result = await getSearchResult(searchCredentials)
      setCompanies(result.companies)
      if(result.companies.length === 0){
        setEmptyRecords(true)
      }else{
        setEmptyRecords(false)
      }
    }
    fetchResults()
  },[searchCredentials])


 function renderCompanyList(companyList){
   return ( 
   <div className='companies-list'>
        {
          companies.map((company, index) => {
            return <Link key={company._id} to={`/companies/${company._id}`}>
              <CompanyCard company={company}/>
            </Link>
          })
        }
        {emptyRecords && <h2>No results found.</h2>}
       </div>
   )
 }

  return (
    <div className='companies-container'>
       <div className='size-adjust'>

        <Suspense fallback={<Spinner />}>
          <Await resolve={loaderPromise.companyList}>
            {renderCompanyList}
          </Await>
        </Suspense>

     
       </div>
    </div>
  )
}

export default Companies