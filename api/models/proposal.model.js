import mongoose, { Schema, model } from "mongoose";


const proposalSchema = Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    coverLetter: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['hourly','fixed'],
    },
    price: {
        hourly: {
            type: Number,
            default: null
        },
        fixed: {
            type: Number,
            default: null
        }
    },
    duration: {
        type: String,
        default : ""
    },
    withdrawn: {
        type: Boolean,
        default: false
    },
    resume: {
        type: String,
        default: ""
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},{timestamps: true})


const Proposal = model('proposal', proposalSchema)

export default Proposal