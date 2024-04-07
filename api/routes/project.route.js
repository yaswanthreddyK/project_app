import express from "express";
import { addProject, deleteProject, editProject, getAllProjects, getProject } from "../controllers/project.controller.js";

const router = express.Router()

router.get("/", getAllProjects)
router.get('/project',getProject)
router.post("/addProject", addProject)
router.patch('/editProject', editProject)
router.delete('/deleteProject',deleteProject)
export default router