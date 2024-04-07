import multer from "multer"
import path from "path"
import ApiResponse from "../utils/ApiResponse.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/temp'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  

  
 export  const upload = multer({ storage: storage, limits: {fileSize: 0.300 * 1024 * 1024, fieldSize: 25* 1024 * 1024}, }) 

          
