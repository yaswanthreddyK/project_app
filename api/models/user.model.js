import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    default: 'User'
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: ""
  },
  jobRole: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ''
  }, 
  phone: {
    type: Number,
    default: ""
  },
  isCompany: {
    type: Boolean,
    default:false,
  },
  companyName: {
    type: String,
    default: ""
  },
  companyWebsite: {
    type: String,
    default: ""
  },
  longDescription: {
    type: String,
    default: ""
  },
  shortDescription: {
    type: String,
    default: ""
  },
  skills : [
    String
  ],
  organisationType: [
    String
  ],
  projects: [
    {
      title: {
        type: String,
        default: ""
      },
      description: {
        type: String,
        default: ""
      },
      link: {
        type: String,
        default: ""
      }
    }
  ],
  experience: {
    type: String,
    default: 'Entry',
    enum: ["Entry", "Intermediate", "Expert"]
  },
  workExperience: [
    {
      title: String,
      description: String,
      startDate: Date,
      endDate: Date
    }
  ],
  activities: [
    {
      title: String,
      description: String,
      startDate: Date,
      endDate : Date
    }
  ],
 hourlyRate: {
  type: Number,
  default: ""
 },
 token: {
  type: String,
  default: ""
 }
},{
  timestamps:true
});



userSchema.pre('save', async function (next){
  if(!this.isModified("password")) return next()
  
  this.password = await bcrypt.hash(this.password, 10)
  return next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}
  
userSchema.methods.generateToken = async function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    fullName: this.fullName
  },
  process.env.TOKEN_SECRET,
  {expiresIn: process.env.TOKEN_EXPIRY}
  )
}

userSchema.index({fullName: "text", companyName: "text", skills: "text", shortDescription: "text", organisationType: "text"})

const User = mongoose.model('user', userSchema)

export default User