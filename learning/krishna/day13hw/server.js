import { config } from 'dotenv';
import express from 'express';
import connectToMongoDB from './connect.js';
import mainRoutes from './routes/index.js';
const app=express();
config();
const port=process.env.PORT|| 4000


connectToMongoDB().then(function (connectMessage){
    console.log(connectMessage);
    app.use(express.json());
    app.use(mainRoutes)
    app.listen(port,()=>{
        console.log("Server running on PORT : "+port)
    })
}).catch((e)=>{
    console.log("Error:"+e)
})