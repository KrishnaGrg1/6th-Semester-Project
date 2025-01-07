import { config } from "dotenv";
import mongoose from "mongoose";
config();


const connecToMongoDB=()=>mongoose.connect(process.env.MONGODB_URL).then(async()=>{
    return Promise.resolve("Connected to MongoDB")
}).catch((e)=>{
    return Promise.reject("Error:"+e)
});


export default connecToMongoDB;