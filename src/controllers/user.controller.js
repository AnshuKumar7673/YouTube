import {asyncHandler} from "../utils/asyncHandler.js";

import {ApiError} from"../utils/ApiError.js"
import{User} from "../models/user.model.js"
import{uplodOnCloudinar} from "../utils/cloudinary.js"
import{ApiResponse} from "../utils/ApiResponse.js"


const registerUser=asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok success full port work"
    })
//user alrady exist or not
    const existedUaer=User.findOne({
        $or:[{username},{email}]
         })

         if(existedUaer){
            throw new ApiError(409,"User with email or username already exits")
        }


const{fullName,email,username,password}=req.body
console.log("email is ",email);

//chack condition not empty

if(
    [fullName,email,username,password].some((field)=>
    field?.trim()===""
     
    )
){

throw new ApiError(400,"All filed are required")
}

const avatarLocalPath= req.files?.avatar[0].path;
const coverImageLocalPath=req.field?.coverImage[0]?.path;


if(!avatarLocalPath){
    throw new ApiError(400,"Avtar file is  required")
}


const avatar=await uplodOnCloudinar(avatarLocalPath)
const coverImage=await uplodOnCloudinar(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400,"Avatar file is required")
}


const user=await User.create({

    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()


})

const createdUSer=await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUSer){
    throw new ApiError(50,"Something went wrong while register the user ")
}



return res.status(201).json(
    new ApiResponse(200,createdUSer,"User register successfullu")
)





})



export {
    registerUser,
}