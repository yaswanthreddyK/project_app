import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import CompanyCard from "../companyCard/CompanyCard"
import { getRecommendedCompanies } from '../../utils';

function CompanyRecommendations({organisationType, companyId}) {
  
      const [companies, setCompanies] = useState([])

      useEffect(()=>{
        const fetchData = async () => {
          const result = await getRecommendedCompanies(organisationType, companyId)
          if(result.message){
            return
          }
          setCompanies(result)
        }
        fetchData()
      },[])
  return (
    <div className='company-recommendation-container'>
           {
            companies.map((company, index) => {
                  return <Link key={index} to="/companies/1">
                    <CompanyCard company={company}/>
                  </Link>
            })
           }
    </div>
  )
}

export default CompanyRecommendations