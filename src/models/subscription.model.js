import mongoose,{Schema} from "mongoose"

const scubscriptionSchema=new Schema({
    Subsciption:{
      
        type: Schema.Types.ObjectId, //subscribing jo karraga
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps:true
})










export const Subsciption=mongoose.model("Subsciption",scubscriptionSchema)