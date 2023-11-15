import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const useSchema=new Schema(
    {
        username:{
            type: String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true

        },
        email:{
            
                
                    type: String,
                    required:true,
                    unique:true,
                    lowercase:true,
                    trim:true,
                   
        },
        fullName:{
            
            type: String,
            required:true,
             
            
            trim:true,
            index:true
        },
        avatara:{           
            type: String,//cloudinary url
            required:true
             
        },
        coverImage:{
            type:String
        },
        watchHistory:[
            {
                type:Schema.Type.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            require:[true,'password is requred']
        },
        refreshToken:{
            type:String
        },
       
},
   {
      timestamps:true
   }
)

useSchema.pre("save",async function (next){
    if(!this.isModified("password"))  return next();

    this.password=bcrypt.hash(this.password,10)
    next()
})

useSchema.method.isPasswordCorrect =async function (password){
  return await bcrypt.compare(password,this.password)
}

useSchema.method.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        

    )
}
useSchema.method.generateRefreshToken=function(){

    return jwt.sign(
        {
            _id:this._id,
             
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        

    )
}

export const User =mongoose.model("User",useSchema)