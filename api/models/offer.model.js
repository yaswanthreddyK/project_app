import mongoose, { Schema, model } from "mongoose";

const offerSchema = Schema({
 jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
 },
amount: {
    type: Number,
    default: null,
    required: true
},
paymentType: {
    type: String,
    enum: ["hourly", "fixed"]
},
  message: {
    type: String,
    default: ""
 },
 startDate: {
    type: Date,
    required: true
},
contractEnded: {
    type: Boolean,
    default: false
},
inEscrow: {
    type: Number,
    default: 0
},
deadline: {
    type: Date,
    required: true
},
author: {
    type: mongoose.Types.ObjectId,
    required: true
},
employeeId: {
    type: mongoose.Types.ObjectId,
    required: true
},
offerStatus: {
    type: String,
    enum: ['active', 'rejected', 'accepted'],
    default: 'active'
}
},{timestamps: true})

const Offer = model('offer', offerSchema)

export default Offer