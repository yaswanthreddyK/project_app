import mongoose, { Schema, model, mongo } from "mongoose";

const jobSchema = new Schema({
    title: {
       type: String,
       required: true
    },
    description: {
        type: String,
        required: true
    },
    skillsRequired: [
        String
    ],
    experienceRequired: {
        type: String,
        enum: ['Entry', 'Intermediate', 'Expert']
    },
    location: {
       type: String,
       default: ""
    },
    duration: {
        type: String,
        default: ""
    },
    jobType:{
        type: String,
        enum: ["Full Time", "Part Time", "Volunteer", "Contract", "Internship", "Paid Fellowship"]
    },
    jobRole: {
        type: String,
        default: ""
    },
    budget: {
        "min": {
            type: Number,
            
        },
        "max": {
            type: Number
        }
    },
    hourly: {
        type: Boolean,
        default: false
    },
    responsibilities: {
        type: String,
        default: ""
    },
    deadline: {
        type: Date
    },
    author: {
       type: mongoose.Schema.Types.ObjectId,
       required: true
   },
},{timestamps: true})

jobSchema.index({title: "text", description: "text", skillsRequired: "text"})
const Job = model('job', jobSchema)

export default Job