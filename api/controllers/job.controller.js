import mongoose from "mongoose"
import Job from "../models/job.model.js"
import User from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"


export const getAllJobs = async (req, res) => {
   try {
     const allJobs = await Job.find({}).exec()
     return res.status(200).send(allJobs)
   } catch (error) {
    console.log("Job Controller :: getAllJobs  Error:",error)
    return res.status(500).send(error.message || "Something went wrong.")
   }
}


export const createJob = async (req, res) => {
    try{
        const {formData} = req.body
        console.log(formData)
        if(!formData.title || !formData.description || !formData.author){
            return res.status(400).json(new ApiResponse("All mandatory fields are required!", 400))
        }

      const job =  await Job.create({
         ...formData
        })

    const createdJob = await Job.findById(job._id)
    if(!createdJob){
        return res.status(500).json(new ApiResponse('Job creation failed!', 500))
    }

    return res.status(201).json(new ApiResponse(`Job created successfully: ${createdJob.title}`,201))


    }catch(error){
      console.log("Job Controller :: createJob  Error:",error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong.", 500))
    }
}

export const deleteJob = async (req, res) => {
  try {
    const {jobId} = req.body
  
    if(!jobId) return res.status(400).json(new ApiResponse("All mandatory fields are required!",400))
  
    const result = await Job.deleteOne({_id: jobId})
    if(result.deletedCount === 0) return res.status(400).json(new ApiResponse('Nothing found to delete', 400))
    
    return res.status(200).json(new ApiResponse("Job deleted Sucessfully!",200))
  } catch (error) {
    console.log("Job Controller :: deleteJob ",error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong.",500))
  }
}


export const getJob = async (req, res) => {
  try {
    const {jobId} = req.body
    if(!jobId) return res.status(400).json(new ApiResponse("All mandatory fields are required!",400))

    const job = await Job.findById(jobId)
    if(!job) return res.status(400).json(new ApiResponse("Job doesn't exist.",400))
    return res.status(200).json(new ApiResponse('Job found',200,job))
  } catch (error) {
    console.log("Job Controller :: getJob ",error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong.",500))
  }
}

export const getListOfJobsPostedAndApplicationsCount = async(req, res) => {
  try {
    const listOfJobs = await Job.aggregate([
      {
        $match: {
          author: req.user._id  
        },

      },
      {
        $lookup: {
          from: "proposals",
          localField: "_id",
          foreignField: "jobId",
          as: "job_proposals"
        },
      },
       {
        $addFields: {
          proposalsCount: {$size: "$job_proposals"}
        }
       }
      ,
      {
        $project: {
          job_proposals: 0
        }
      }
    ])

    if(!listOfJobs){
      return res.status(400).json(new ApiResponse('No jobs found',400))
    }
    return res.status(200).json(new ApiResponse('List of all the jobs posted',200, listOfJobs))
  } catch (error) {
    console.log("Job Controller :: getListOfJobsPostedAndApplicationsCount ",error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong.",500))
  }
}


export const getListOfJobsPostedAndApplications = async (req, res) => {
  try {
    console.log('hi')
    const listOfJobsAndApplications = await Job.aggregate([
      {
        $match: {
          author: req.user._id  
        }
      },
      {
        $lookup: {
          from: "proposals",
          localField: "_id",
          foreignField: "jobId",
          as: "job_proposals"
        }
      },
      {
        $unwind: "$job_proposals"
      },
      {
        $lookup: {
          from: "users",
          localField: "job_proposals.author",
          foreignField: "_id",
          as: "author_details"
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          job_proposals: 1,
          author_details: {
            $map: {
              input: "$author_details",
              as: "author",
              in: {
                _id: "$$author._id",
                fullName: "$$author.fullName",
                profileImage: "$$author.profileImage",
                skills: "$$author.skills",
                shortDescription: "$$author.shortDescription",
                jobRole: "$$author.jobRole"
              }
            }
          }
        }
      }
    ]);
    


      if(!listOfJobsAndApplications){
        return res.status(400).json(new ApiResponse('No Applicants found',400))
      }
      return res.status(200).json(new ApiResponse('List of all the jobs posted',200, listOfJobsAndApplications))

  } catch (error) {
    console.log("Job Controller :: getListOfJobsPostedAndApplications ",error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong.",500))
  }
}


export const getRecommendedJobs = async (req, res) => {
  try {
    const {jobTitle} = req.body
    if(!jobTitle) return res.status(400).json(new ApiResponse(''))
    const jobsList = await Job.find({title: {$regex : new RegExp(jobTitle, 'i')}}).limit(10).exec()
   return res.status(200).json(new ApiResponse('List of similar jobs', 200, jobsList))
  } catch (error) {
    console.log("Job Controller :: getRecommendedJobs ",error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong.",500))
  }
}