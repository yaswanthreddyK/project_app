import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  getListOfJobsPostedAndApplications,
  getListOfJobsPostedAndApplicationsCount,
  getRecommendedJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/", getAllJobs);
router.post("/createJob", createJob);
router.post("/job", getJob);
router.delete("/deleteJob", deleteJob);
router.get("/jobsPosted", getListOfJobsPostedAndApplicationsCount);
router.get("/applicants", getListOfJobsPostedAndApplications);
router.post("/recommendedJobs", getRecommendedJobs);


export default router;
