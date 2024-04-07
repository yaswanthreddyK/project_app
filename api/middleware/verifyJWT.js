import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const verifyJWT = async function (req, res, next){
    try {
        const token = req.cookies?.token || req.headers["Authorization"]?.replace('Bearer ', "");
    
    if(!token) return res.status(401).json(new ApiResponse("Unauthorised requrest!", 401))
    
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    
    if(!decodedToken) return res.status(401).json(new ApiResponse("Token expired! Please login.", 401))
    
    const user = await User.findById(decodedToken._id).select("-passowrd")
    if(!user) return res.status(401).json(new ApiResponse("Invalid token", 401))
    
    req.user = user;
    return next()
    } catch (error) {
        console.log("verifyJWT :: Error : ",error);
        return res.status(500).json(new ApiResponse("Something went wrong!", 500))
    }
}

export default verifyJWT;