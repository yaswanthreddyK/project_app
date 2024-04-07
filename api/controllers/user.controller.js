import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import Proposal from "../models/proposal.model.js";
import Offer from "../models/offer.model.js";
import Project from "../models/project.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  deleteOldProfileImageOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { json } from "express";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res
        .status(400)
        .json(new ApiResponse("All the fields are required", 400));
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json(new ApiResponse("Email doesn't exist", 400));

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect)
      return res.status(400).json(new ApiResponse("Incorrect password.", 400));

    const token = await user.generateToken();

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    user.token = token;
    await user.save();
    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(
        new ApiResponse("User logged in successfully!", 200, {
          ...user._doc,
          password: "",
        })
      );
  } catch (error) {
    console.log("loginUser :: Error: ", error);
    return res
      .status(500)
      .json(new ApiResponse("Something went wrong! Please try again.", 500));
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, isCompany } = req.body;
    if (!email || !password || isCompany === null || isCompany === undefined)
      return res.status(400).json(new ApiResponse("Invalid credentials", 400));

    const userAlreadyExists = await User.findOne({
      email: req.body.email,
    }).select("-password");

    if (userAlreadyExists) {
      return res.status(400).send(new ApiResponse("Email already exists", 400));
    }

    await User.create({
      ...req.body,
    });

    const userCreated = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    if (!userCreated) {
      return res
        .status(400)
        .json(new ApiResponse("Signup failed! Try again.", 400));
    }

    return res
      .status(201)
      .json(new ApiResponse("User created successfully.", 201, userCreated));
  } catch (error) {
    console.log("registerUser :: Error: ", error);
    return res
      .status(500)
      .json(new ApiResponse("Something went wrong! Please try again.", 500));
  }
};

export const getAllProfessionals = async (req, res) => {
  try {
    const allUsers = await User.find({ isCompany: false }).exec();
    return res.status(200).send(allUsers);
  } catch (error) {
    console.log("getAllProfessionals :: Error: ", error);
    return res
      .status(500)
      .send(error.message || "Something went wrong! Try again.");
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json(new ApiResponse("User doesn't exist", 400));
    }
    return res.status(200).json(new ApiResponse("User found", 200, user));
  } catch (error) {
    console.log("getSingleUser :: Error: ", error);
    return res
      .status(500)
      .json(new ApiResponse(error.message || "Something went wrong! Try again.",500));
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await User.find({ isCompany: true }).exec();
    return res.status(200).send(allCompanies);
  } catch (error) {
    console.log("getAllCompanies :: Error: ", error);
    return res
      .status(500)
      .send(error.message || "Something went wrong! Try again.");
  }
};

export const editUser = async (req, res) => {
  try {
    

    req.body.activities = req.body.activities ? JSON.parse(req.body.activities) : []
    req.body.projects = req.body.projects ? JSON.parse(req.body.projects) : []
    req.body.organisationType = req.body.organisationType ? JSON.parse(req.body.organisationType) : []
    req.body.skills = req.body.skills ? JSON.parse(req.body.skills) : []
    req.body.workExperience = req.body.workExperience ? JSON.parse(req.body.workExperience) : []
    console.log(req.body.workExperience)
      let profileImage;
      if (req.file?.path) {
        profileImage = await uploadOnCloudinary(req.file.path);
        await deleteOldProfileImageOnCloudinary(req.user.profileImage);
        req.body.profileImage = profileImage.url;
        if (!profileImage?.url) {
          return res
          .status(400)
          .json(
            new ApiResponse("Profile Image upload failed! Reupload", 400)
            );
          }
      }
    const updateResult = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { ...req.body } },
      { new: true }
    );
    if (!updateResult) {
      return res
        .status(400)
        .json(new ApiResponse("Changes are not made!", 400));
    }

    return res
      .status(200)
      .json(new ApiResponse("Update Successful!", 201, updateResult));
  } catch (error) {
    console.log("user.controller :: getAllCompanies: ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          error.message || "Something went wrong! Try again.",
          500
        )
      );
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse("User fetch successful", 200, req.user));
  } catch (error) {
    console.log("user.controller :: getCurrentUser: ", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          error.message || "Something went wrong! Try again.",
          500
        )
      );
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json(new ApiResponse("User not found"));
    }

    return res.status(200).json(new ApiResponse("User found.", user));
  } catch (error) {
    console.log("user.controller :: getUser: ", error);
    return res
      .status(500)
      .send(error.message || "Something went wrong! Try again.");
  }
};

export const searchFilter = async (req, res) => {
  try {
    const { searchQuery } = req.body;
    let professionalFilters = searchQuery.professionalFilters;
    let jobFilters = searchQuery.jobFilters;

    if (!professionalFilters) {
      professionalFilters = {};
    } else {
      let experience = Object.keys(professionalFilters.experience).filter(
        (key) => professionalFilters.experience[key] === true
      );
      if (experience.length === 0) {
        experience = Object.keys(professionalFilters.experience);
      }

      professionalFilters = professionalFilters.includeHourlyRateFilter ? { 
        hourlyRate: {
          $gte: professionalFilters.hourlyRate.min,
          $lte: professionalFilters.hourlyRate.max,
        },
        experience: {$in: [...experience]},
      }
      :
      {
        experience: {$in: [...experience]}
      }
      ;
    }

    if (!jobFilters) {
      jobFilters = {};
    } else {
      let experience = Object.keys(jobFilters.experience).filter(
        (key) => jobFilters.experience[key] === true
      );
      if (experience.length === 0) {
        experience = Object.keys(jobFilters.experience);
      }

      let jobTypesArray = Object.keys(jobFilters.jobType).filter(
        (key) => jobFilters.jobType[key] === true
      );
      if (jobTypesArray.length === 0) {
        jobTypesArray = Object.keys(jobFilters.jobType);
      }

      const jobSearchFilters = {}
       jobFilters.includeHourlyRateFilter ? (jobSearchFilters.$or = [
        {
        "budget.min": { $gte: jobFilters.hourlyRate.min, $lte: jobFilters.hourlyRate.max },
        },
        {
        "budget.max": { $gte: jobFilters.hourlyRate.min, $lte: jobFilters.hourlyRate.max },
        }
       ])
      : (null);

      jobFilters.includeFixedPriceFilter ? (jobSearchFilters.$or = [
        {
          "budget.min": {$gte: jobFilters.fixedPrice.min, $lte: jobFilters.fixedPrice.max},
        },
        {
          "budget.max": {$gte: jobFilters.fixedPrice.min, $lte: jobFilters.fixedPrice.max},
        }
      ])
      : (null);
     
      (jobFilters.includeHourlyRateFilter && jobFilters.includeHourlyRateFilter) ? (
        jobSearchFilters.$or = [
          {$or: [
            {
              "budget.min": { $gte: jobFilters.hourlyRate.min, $lte: jobFilters.hourlyRate.max },
              },
              {
              "budget.max": { $gte: jobFilters.hourlyRate.min, $lte: jobFilters.hourlyRate.max },
              }
          ]
        },
        {
        $or: [
          {
            "budget.min": {$gte: jobFilters.fixedPrice.min, $lte: jobFilters.fixedPrice.max},
          },
          {
            "budget.max": {$gte: jobFilters.fixedPrice.min, $lte: jobFilters.fixedPrice.max},
          }
        ]
        }
        ]
      ) : (null);
      
      jobSearchFilters.experienceRequired =  { $in: experience }
      jobSearchFilters.jobType = { $in: jobTypesArray }
      jobFilters = jobSearchFilters;
      };


    const professionals = await User.aggregate([
      {
        $match: {
          isCompany: false,
          location: { $regex: searchQuery.location, $options: "i" },
          ...professionalFilters,
          $or: [
            { fullName: { $regex: searchQuery.jobType, $options: "i" } },
            {
              shortDescription: { $regex: searchQuery.jobType, $options: "i" },
            },
            {
              skills: {
                $elemMatch: { $regex: searchQuery.jobType, $options: "i" },
              },
            },
          ],
        },
      },
    ]);
    const companies = await User.aggregate([
      {
        $match: {
          isCompany: true,
          location: { $regex: searchQuery.location, $options: "i" },
          $or: [
            { companyName: { $regex: searchQuery.jobType, $options: "i" } },
            {
              organisationType: {
                $elemMatch: { $regex: searchQuery.jobType, $options: "i" },
              },
            },
            {
              shortDescription: { $regex: searchQuery.jobType, $options: "i" },
            },
          ],
        },
      },
    ]);
    const jobs = await Job.aggregate([
      {
        $match: {
          location: { $regex: searchQuery.location, $options: "i" },
          ...jobFilters,
          $or: [
            { title: { $regex: searchQuery.jobType, $options: "i" } },
            { description: { $regex: searchQuery.jobType, $options: "i" } },
            {
              skillsRequired: {
                $elemMatch: { $regex: searchQuery.jobType, $options: "i" },
              },
            },
          ],
        },
      },
    ]);

    const result = {
      professionals,
      companies,
      jobs,
    };
    return res.status(200).json(new ApiResponse("Search result", 200, result));
  } catch (error) {
    console.log("user.controller :: searchFilter: ", error);
    return res
      .status(500)
      .json(new ApiResponse(error.message || "Something went wrong! Try again.",500));
  }
};

export const getRecommendedProfessionals = async (req, res) => {
  try {
    const {jobRole, skills, professionalId} = req.body
    console.log(professionalId)
    if(!jobRole || !skills) return res.status(400).json(new ApiResponse('Job role field is missing!', 400))
    const professionals = await User.find({$or: [{jobRole: {$regex: new RegExp(jobRole, 'i')}},{skills: {$elemMatch: {$in: [...skills]}}}], isCompany: false, _id: {$ne: professionalId}}).limit(10).exec()
    return res.status(200).json(new ApiResponse('List of recommended professionals', 200, professionals))
  } catch (error) {
    console.log("user.controller :: getRecommendedProfessionals: ", error);
    return res
      .status(500)
      .json(new ApiResponse(error.message || "Something went wrong! Try again.",500));
  }
  }


export const getRecommendedCompanies = async (req, res) => {
  try {
    const {organisationType, companyId} = req.body
    if(!organisationType) return res.status(400).json(new ApiResponse('Organisatin type field is missing!', 400))

    const companies = await User.find({organisationType: {$in: [...organisationType]}, isCompany: true, _id: {$ne: companyId}}).limit(10).exec()
    return res.status(200).json(new ApiResponse('List of recommended companies', 200, companies))
  } catch (error) {
    console.log("user.controller :: getRecommendedCompanies: ", error);
    return res
      .status(500)
      .json(new ApiResponse(error.message || "Something went wrong! Try again.",500));
  }
  }


  export const getStats = async (req, res) => {
    try {
       const isCompany = req.user.isCompany
       const result = [];
       if(isCompany){
        const jobsPosted = await Job.find({author: req.user._id}).exec()
        const jobIds = jobsPosted.map(job => {
          return job._id
        })
        const noOfJobsPosted = jobsPosted.length
        const totalApplicants = await Proposal.aggregate([
          {
            $match: {
              jobId : {$in: [...jobIds]}
            }
          },
          {
            $group: {
              _id: null,
              count: {$sum : 1}
            }
          },
          {
            $project: {
              _id: 0,
              count: 1
            }
          }
        ])
        const noOfemployeesHired = await Offer.count({author: req.user._id})

        result.push({noOfJobsPosted, totalApplicants, noOfemployeesHired})
       }else{

        const noOfProposalsSent = await Proposal.count({author: req.user._id})
        const noOfInvites = await Offer.count({employeeId: req.user._id, offerStatus: 'active'})
        const noOfContracts = await Offer.count({employeeId: req.user._id, offerStatus: 'accepted'})
        result.push({noOfContracts,noOfProposalsSent,noOfInvites})
       }

       return res.status(200).json(new ApiResponse('Stats: ', 200, result))
    } catch (error) {
      console.log("user.controller :: getStats: ", error);
    return res
      .status(500)
      .json(new ApiResponse(error.message || "Something went wrong! Try again.",500));
  }
    }



export const getSearchSummary = async (req, res) => {
  try {
    let {query, location} = req.body
    let companyFilters = []
    let professionalFilters = []
    let projectsFilters = []

    if(query){
      companyFilters = [
        {fullName: {$regex: query, $options: "i"}},
        {shortDescription: {$regex: query, $options: "i"}},
        {organisationType : {$elemMatch: {$regex: query, $options: "i"}}}
       ]
      professionalFilters = [
        {fullName: {$regex: query, $options: "i"}},
        {shortDescription: {$regex: query, $options: "i"}},
        {skills: {$elemMatch: {$regex: query, $options: "i"}}}
      ]

      projectsFilters = [
        {title: {$regex: query, $options: "i"}},
        {description: {$regex: query, $options: "i"}},
        {skills: {$elemMatch: {$regex: query, $options: "i"}}}
      ]
    }else{
      professionalFilters = [{title: {$eq: ""}}]
      companyFilters = [{title: {$eq: ""}}]
      projectsFilters = [{title: {$eq: ""}}]
    }

    if(location){
      companyFilters["location"] = {$regex: location, $options: "i"}
      professionalFilters["location"] = {$regex: location, $options: "i"}
      projectsFilters["location"] = {$regex: location, $options: "i"}
    }

    const projectsList = await Project.find({$or: [...projectsFilters]}).exec()
    const companiesList = await User.find({isCompany: true, $or: [...companyFilters]}).limit(5).exec()
    const professionalsList = await User.find({isCompany: false, $or: [...professionalFilters]}).limit(5).exec()
    return res.status(200).json(new ApiResponse('Search results', 200, {projectsList, companiesList, professionalsList}))
  } catch (error) {
    console.log("user.controller :: getSearchSummary: ", error);
    return res
      .status(500)
      .json(new ApiResponse(error.message || "Something went wrong! Try again.",500));
  }
  }


  export const logout = (req, res) => {
    try {
      return res.
      clearCookie("token")
      .json(new ApiResponse("Logout successful", 200))
    } catch (error) {
      console.log("user.controller :: logout: ", error);
      return res
        .status(500)
        .json(new ApiResponse(error.message || "Something went wrong! Try again.",500));
    }
  }