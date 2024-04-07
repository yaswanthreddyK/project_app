import mongoose from "mongoose";
import Offer from "../models/offer.model.js";
import User from "../models/user.model.js";
import Job from '../models/job.model.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAllActiveOffers = async (req, res) => {
    try {
        const allActiveOffers = await Offer.aggregate([
            {
                $match: {offerStatus: "active", employeeId: req.user._id}
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'company_details'
                }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'job_details'
                },
                
            },
        ])
        return res.status(200).json(new ApiResponse('List of Invites', 200, allActiveOffers))
    } catch (error) {
        console.log('proposal.controller :: getAllProposals :: Error: ', error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong! Try again.",500))
    }
}

export const getAllContracts = async (req, res) => {
    try {

        let matchFilter = {}
        if(req.user.isCompany){
            matchFilter = {offerStatus: "accepted", author: req.user._id}
        }else{
            matchFilter =  {offerStatus: "accepted", employeeId: req.user._id}
        }
        const allActiveOffers = await Offer.aggregate([
            {
                $match: {...matchFilter}
            },
            {
                $lookup: {
                    from: 'users',
                    localField: req.user.isCompany ? "employeeId" : "author",
                    foreignField: '_id',
                    as: req.user.isCompany ? "employee_details" : "company_details",
                }
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'jobId',
                    foreignField: '_id',
                    as: 'job_details'
                },
                
            },
        ])
        return res.status(200).json(new ApiResponse('List of Invites', 200, allActiveOffers))
    } catch (error) {
        console.log('proposal.controller :: getAllProposals :: Error: ', error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong! Try again.",500))
    }
}

export const createOffer = async (req, res) => {
    try {
      const {jobId, employeeId} = req.body
      const proposalExists = await Job.findById(jobId)
      const employeeExists = await User.findById(employeeId)
      if(!proposalExists || !employeeExists){
        return res.status(400).json(new ApiResponse('Invalid Credentials', 400))
      }
 
      const offer = await Offer.create({
        ...req.body,
        paymentType: req.body.paymentType.toLowerCase(),
        author: req.user._id
      })

      const createdOffer = await Offer.findOne({_id: offer?._id})
      if(!offer || !createdOffer){
        return res.status(500).json(new ApiResponse('Faild to create Offer', 500))
      }

      return res.status(200).json(new ApiResponse('Offer created successfully!',200))
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            console.log('offer.controller :: createOffer :',error)
            return res.status(400).json(new ApiResponse("All mandatory fields are required and should be correct.",400))
        }
        console.log('offer.controller :: createOffer :', error)
    return res.status(500).json(new ApiResponse(error.message || "Something went wrong! Try again.",500))
    }
}


export const editOffer = async (req, res) => {
    try {
        const {offerId, ...updates} = req.body
        const editedOffer = await Offer.findOneAndUpdate({_id: offerId}, {$set: {...updates}},{returnOriginal: false})
        if(!editedOffer) return res.status(500).json(new ApiResponse('Faile to update offer',500))
        return res.status(200).json(new ApiResponse(`Offer updated successfully.`,200))
    } catch (error) {
        console.log('offer.controller :: editOffer :', error)
    return res.status(500).josn(new ApiResponse(error.message || "Something went wrong! Try again."),500)
    }
}




