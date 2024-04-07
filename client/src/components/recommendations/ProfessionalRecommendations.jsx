import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ProfessionalCard from "../professionalCard/ProfessionalCard"
import { getRecommendedProfessionals } from '../../utils'

function ProfessionalRecommendations({skills, jobRole, professionalId}) {

  
const [experts, setExperts] = useState([])
useEffect(() => {
  const fetchDetails = async() => {
   const result =  await getRecommendedProfessionals(jobRole, skills,professionalId)
   if(result?.message){
      return
   }
   setExperts(result)
  }

  fetchDetails()
  
},[])
  return (
    <div className='professional-recommendation-container'>
           {
            experts.map((profile, index) => {
              console.log(profile)
                  return <Link key={index} to="/professionals/1">
                    <ProfessionalCard professional={profile}/>
                  </Link>
            })
           }
    </div>
  )
}

export default ProfessionalRecommendations