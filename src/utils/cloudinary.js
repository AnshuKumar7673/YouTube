import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

 

cloudinary.config({ 
  cloud_name:  process.env.CLOUDINARY_CLOUDE_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uplodOnCloudinary=async (localFilePath)=>{
  try {
    if(!localFilePath) return null
   const response= await cloudinary.uploader.upload(localFilePath,{
      resource_type:"auto"
    })
    console.log("File is uploded on cloudinary",response.url);
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath) //remove file local jo lode nhi hua
    return null;
  }
}

export{uplodOnCloudinary}



 