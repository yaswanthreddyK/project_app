import mongoose, { Schema, model } from "mongoose";

const projectSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatarImage: {
        type: String,
    },
    projectURL: {
        type: String
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    skills: [
        String,
    ]
},{timestamps: true})

const Project = model('project', projectSchema)
projectSchema.index({title: "text", description: "text", skills: "text"})

export default Project