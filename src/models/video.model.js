import mongoose,{Schema} from "mongoose";

const videoSchema=new Schema (
    {
       videoFile:{
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
        fullname:{
            
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

export const  Video =mongoose.model("Video",videoSchema)