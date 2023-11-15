// require('dotenv'.config({path:'./env'}))
import dotenv from "dotenv"
 
import connectDB from "./db/index.js";
import e from "express";
import { app } from "./app.js";
 

dotenv.config({
    path:'./env'
})

connectDB 
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at  port ${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.error("MONGO db connection failed !!!",err);
})










// import { Express } from "express";
// const app=Express()


//  ;(async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URL}/&{DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("ERROR",error);
//         throw error
//        })
//        app.listen(process.env.PORT,()=>{
//         console.log(`App is lisson port ${process.env.PORT}`);
//        })



//     }catch( error)
// {
//     console.error("ERROE",error)
//     throw err
// } })()