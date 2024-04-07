import { v2 as cloudinary } from "cloudinary";
import fs from "fs"



const uploadOnCloudinary = async (localFilePath) => {

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
  try {
    if (!localFilePath) return null;
     
    const response = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto" }
    );
   
    console.log("File uploaded on cloudinary")
    removeTemperaryFileFromServer(localFilePath)
    return response 
  } catch (err) {
    console.log(err)
    removeTemperaryFileFromServer(localFilePath)
    return null
  }
};

function removeTemperaryFileFromServer(filePath){
    fs.unlinkSync(filePath)
}

const deleteOldProfileImageOnCloudinary = async (url) => {
  try{
    const imageName = url.split("/").pop().split(".")[0]
    const response = await cloudinary.uploader.destroy(imageName)
    if(response.result === "ok"){
      console.log("Image deleted")
    }else{
      console.log("Image not deleted!")
    }
  }catch(err){
    console.log(err)
  } 

}


export { uploadOnCloudinary, deleteOldProfileImageOnCloudinary }