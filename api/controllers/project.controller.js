import { ObjectId } from "mongodb"
import Project from "../models/project.model.js"
import ApiResponse from "../utils/ApiResponse.js"



export const getAllProjects = async (req, res) => {
    try {
        const allProjects = await Project.find({}).exec()
        return res.status(200).json(new ApiResponse('List of Products',200,allProjects))
    } catch (error) {
        console.log("project controller :: getAllProjects  Error: ",error)
        return res.status(500).json(new ApiResponse("Something went wrong",500))
    }
}


export const addProject = async (req, res) => {
    try {
        const {title, description} = req.body
        if([title, description].find(field => field === "" || field === null || field === undefined)){
            return res.status(400).send("All the mandatory fields are required.")
        }
        
        const project = await Project.create({
            title,
            description,
            avatarImage: req.body.avatarImage || "",
            projectURL: req.body.projectURL || "",
            owner: req.user._id
        })

        if(!project) return res.status(500).send('Something went wrong')

        return res.status(201).send("Project added successfully")
        
    } catch (error) {
        console.log("project controller :: addProject  Error: ",error)
        return res.status(200).send("Something went wrong")
    }
}

export const editProject = async (req, res) => {
    try{
        const {projectId, ...rest} = req.body
        if(!projectId) res.status(400).send("All mandatory fields are required")
        const updateResult = await Project.updateOne({_id: projectId}, {$set: {...rest}})
        if(updateResult.modifiedCount === 0){
            return res.status(200).send('Nothing found to modify')
        }

        return res.status(200).send('Project updated successfully.')
    }catch(error){
        console.log("project controller :: editProject  Error: ",error)
        return res.status(200).send("Something went wrong")
    }
}

export const deleteProject = async (req, res) => {
    try {
        const {projectId} = req.body
        if(!projectId) res.status(400).send("All mandatory fields are required")
        const result = await Project.deleteOne({_id: new ObjectId(projectId)})
        if(result.deletedCount === 0){
            return res.status(200).send('Nothing found to delete')
        }

        return res.status(200).send('Project deleted successfully.')
    } catch (error) {
        console.log("project controller :: deleteProject  Error: ",error)
        return res.status(200).send("Something went wrong")
    }
}

export const getProject = async (req,res) => {
    try {
        const {projectId} = req.body
    if(!projectId) return res.status(400).send("All mandatory fields are required!")

    const project = await Project.findById(projectId)
    if(!project) return res.status(400).send("Project doesn't exist.")
    return res.status(200).send(project)
    } catch (error) {
        console.log("project controller :: getProject  Error: ",error)
        return res.status(200).send("Something went wrong")
    }
}