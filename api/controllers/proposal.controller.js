import mongoose from "mongoose";
import Proposal from "../models/proposal.model.js";
import Job from "../models/job.model.js";
import ApiResponse from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllProposals = async (req, res) => {
    try {
        const allProposals = await Proposal.aggregate([
            {
                $match: {
                    author: req.user._id
                }
            },
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "job_details"
                }
            },
            
        ]);
        
        return res.status(200).json(new ApiResponse('List of Proposals.',200,allProposals))
    } catch (error) {
        console.log('proposal.controller :: getAllProposals :: Error: ', error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong! Try again.",500))
    }
}


export const createProposal = async (req, res) => {
    try {
      if(req.user.isCompany){
        return res.status(400).json(new ApiResponse('Submission not allowed!',400))
      }
      const {jobId} = req.body
      req.body.price = JSON.parse(req.body.price)
      req.body.price = {
        hourly: Number(req.body.price.hourly),
        fixed: Number(req.body.price.fixed)
      }
      console.log(req.body.price)
      const job = await Job.findById(jobId)
      if(!job) return res.status(400).json(new ApiResponse('Job does not exist', 400))
      const proposalAlreadyExists = await Proposal.findOne({jobId: job._id, author: req.user._id})
    if(proposalAlreadyExists) return res.status(400).json(new ApiResponse('Proposal already submitted', 400))
    
    if(req.file?.path){
        const resume = await uploadOnCloudinary(req.file.path)
        req.body.resume = resume.url
        if(!resume.url){
            return res.status(500).json(new ApiResponse('Faild to upload resume', 500))
        }
    }
    const proposal = await Proposal.create({
    ...req.body,
    price: {
        hourly: req.body.price.hourly,
        fixed: req.body.price.fixed
    },
    author: req.user._id
    })

      const createdProposal = await Proposal.findOne({_id: proposal?._id})
      if(!proposal || !createdProposal){
        return res.status(500).json(new ApiResponse('Faild to create proposal', 500))
      }

      return res.status(200).json(new ApiResponse('Proposal submitted successfully!', 200))
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            console.log('proposal.controller :: createProposal :',error)
            return res.status(400).json(new ApiResponse("All mandatory fields are required and should be correct.", 400))
        }
        console.log('proposal.controller :: createProposal :: Error: ', error)
        return res.status(500).json(new ApiResponse(error.message || "Something went wrong! Try again.",500))   
    }
}


export const editProposal = async (req, res) => {
     try {
        const {proposalId, ...updates} = req.body
        if(!proposalId) return res.status(400).send('Required fields are missing')
        const newProposal = await Proposal.findOneAndUpdate({_id: proposalId},{$set: updates},{runValidation: true, returnOriginal: false})
       if(!newProposal) return res.status(500).send('Proposal does not exist.')
       return res.status(200).send(`Proposal updated successfully: ${newProposal}`)
     } catch (error) {
        console.log('proposal.controller :: editProposal :: Error: ', error)
        return res.status(500).send(error.message || "Something went wrong! Try again.")
     }
}

export const deleteProposal = async (req, res) => {
    try{
        const {proposalId} = req.body
        if(!proposalId) return res.status(400).send('Required fields are missing')
        const result = await Proposal.findOneAndDelete({_id:  new mongoose.Types.ObjectId(proposalId)})
        if(!result) return res.status(400).send("Proposal doesn't exits")
        return res.status(200).send('Proposal deleted successfully!')
    }catch(error){
        console.log('proposal.controller :: deleteProposal :: Error: ', error)
        return res.status(500).send(error.message || "Something went wrong! Try again.")
    }
}


export const getListOfProposals = async (req, res) => {
    try {

        const filters = req.body.jobId ? {jobId: req.body.jobId} : {}
        const proposalList = await Proposal.find({...filters}).exec()
        if(!proposalList){
            return res.status(400).json(new ApiResponse('No applicants found!',400))
        }

        return res.status(200).json(new ApiResponse('List of applicants', 200, proposalList))
        
    } catch (error) {
        console.log('proposal.controller :: getListOfProposals : ', error)
        return res.status(500).send(error.message || "Something went wrong! Try again.")
    }
}