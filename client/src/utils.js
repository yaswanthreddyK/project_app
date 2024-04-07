

  export const getUser = async () => {
      try {
        const response = await  fetch('http://localhost:8800/api/users/currentUser',{
              method: 'GET',
              credentials: 'include'
          })

        const data = await response.json()
          if(data.success){
              return data.data
          }else{
              return null
          }
          
      } catch (error) {
          console.log('Utils :: getUser: ', error)
          return null
      }
  }


  export const getSearchResult = async (searchParams = {professionalFilters : {}, jobFilters: {}}) => {
      try {
        const response = await  fetch("http://localhost:8800/api/users/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              searchQuery: searchParams,
            }),
            credentials: "include",
          })
          const result = await response.json()
          return result.data;
        } catch (error) {
          console.log(error);
          return []
        }
  }


  export const fetchSingleUser = async (userId) =>{
      try {
        const response = await fetch('http://localhost:8800/api/users/getUser',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId
          }),
          credentials: 'include'
        })

        const result = await response.json()
        if(!result.success){
          return {
          
          }
        }
        return result.data
      } catch (error) {
        console.log(error);
        return {}
      }
  }


export  const fetchSingleJob = async (jobId) => {
    try {
      const response = await fetch("http://localhost:8800/api/jobs/job", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
             },
          body: JSON.stringify({jobId}),
          credentials: 'include'
         })

        const result = await response.json()

        if(!result.success){
          return {
            message: 'Error fetching job details'
          }
        }

        return result.data
        
    }catch(error){
      console.log('getsingleJob', error)
      return {
        message: 'Error occured! Try reloading the page'
      }
    }
  }


export const getListOfJobsPosted = async () => {
  try {
    const response = await fetch("http://localhost:8800/api/jobs/jobsPosted",{
      method: "GET",
      credentials: "include"
    })

    const result = await response.json()
    if(!result.success){
      return []
    }

    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}


export const getListOfApplicants = async (jobId) => {
  try {
    const response = await fetch("http://localhost:8800/api/proposals/",{
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({jobId}),
      credentials:"include"
    })

    const result = await response.json()
    if(!result.success){
      return []
    }

    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const deleteAJob = async(jobId) => {
  try {
    const response = await fetch('http://localhost:8800/api/jobs/deleteJob',{
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({jobId}),
      credentials: "include"
    })

    const result = await response.json()

    if(!result.success){
      return {
        message: result.message,
        success: false
      }
    }

    return {
      message: "Job deleted Successfully.",
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      message: "Action failed",
      success: false
    }
  }
}

export const getListOfJobsPostedAndApplications = async () => {
  try {
    const response = await fetch('http://localhost:8800/api/jobs/applicants', {
      method: "GET",
      credentials: "include"
    })

    const result = await response.json()
    if(!result.success){
      return []
    }
    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getListOfProposals = async () =>{
  try {
    const response = await fetch("http://localhost:8800/api/proposals/", {
      method: "GET",
      credentials: "include"
    })

    const result = await response.json()
    if(!result.success){
      console.log(result)
      return []
    }
    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}


export const getListOfInvites = async () => {
  try {
    const response = await fetch("http://localhost:8800/api/offers/getOffers", {
      method: "GET",
      credentials: "include"
    })

    const result = await response.json()
    if(!result.success){
      console.log(result)
      return []
    }
    console.log(result.data)
    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}


export const getListOfContracts = async () => {
  try {
    const response = await fetch("http://localhost:8800/api/offers/getContracts", {
      method: "GET",
      credentials: "include"
    })

    const result = await response.json()
    if(!result.success){
      console.log(result)
      return []
    }
    console.log(result.data)
    return result.data
  } catch (error) {
    console.log(error)
    return []
  }
}


export async function getRecommendedJobs(jobTitle){
  try{
    const response = await fetch('http://localhost:8800/api/jobs/recommendedJobs',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({jobTitle}),
      credentials: 'include'
    })

    const result = await response.json()
    if(!result.success){
      return {
        message: 'Error fetching similar jobs.'
      }
    }
    return result.data
  }catch(error){
    console.log(error)
    return []
  }
}



export async function getRecommendedProfessionals(jobRole, skills,professionalId){
  try{
    const response = await fetch('http://localhost:8800/api/users/recommendedProfessionals',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({jobRole, skills, professionalId}),
      credentials: 'include'
    })

    const result = await response.json()
    if(!result.success){
      return {
        message: 'Error fetching other experts.'
      }
    }
    return result.data
  }catch(error){
    console.log(error)
    return {
      message: 'Error fetching other experst'
    }
  }
}



export async function getRecommendedCompanies(organisationType, companyId){
  try{
    const response = await fetch('http://localhost:8800/api/users/recommendedCompanies',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({organisationType, companyId}),
      credentials: 'include'
    })

    const result = await response.json()
    if(!result.success){
      return {
        message: 'Error fetching other experts.'
      }
    }
    return result.data
  }catch(error){
    console.log(error)
    return {
      message: 'Error fetching other experst'
    }
  }
}


export async function getListOfProjects(){
  try {
    const response = await fetch('http://localhost:8800/api/projects/', {
      method: 'GET',
      credentials: 'include'
    })

    const result = await response.json()
    if(!result.success){
      return {
        message: 'Error fetching projects'
      }
    }
    console.log(result.data)
    return result.data
  } catch (error) {
    console.log(error)
    return {
      message: 'Error fetching projects'
    }
  }
}

export async function getStats(){
  try {
    const response = await fetch('http://localhost:8800/api/users/stats', {
      method: 'GET',
      credentials: 'include'
    })

    const result = await response.json()
    if(!result.success){
      return {
        message: 'Error fetching stats'
      }
    }
    console.log(result.data)
    return result.data
  } catch (error) {
    console.log(error)
    return {
      message: 'Error fetching Stats'
    }
  }
}


export async function getSearchSummary(query = "", location = ""){
  try {
    
    const response = await fetch('http://localhost:8800/api/users/searchSummary/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query, location}),
      credentials: 'include'
    })
    const result = await response.json()

    if(!result.success){
      return {message: "Error"}
    }
    return result.data
  } catch (error) {
    console.log(error)
    return {
      message: 'Error fetching search summary!'
    }
  }
}