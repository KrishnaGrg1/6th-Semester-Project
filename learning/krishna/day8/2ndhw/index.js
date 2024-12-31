import express from "express";
const server=express();
const port=9001;
import { viewallcars,addcars,viewcars,editcars,deletecars } from "./routes/cars.js";
import { error } from "console";


server.use(express.json());


server.get('/cars',(req,res)=>{
    res.json(viewallcars())
});

server.get('/cars/:index',(req,res)=>{
    
    try{
        res.json(viewcars(req.params.index));
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
});

server.put('/cars/:index',(req,res)=>{
    
    try{
        res.json(editcars(req.params.index,req.body));
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
});
server.delete('/cars/:index',(req,res)=>{
    
    try{
        res.json(deletecars(req.params.index));
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
});

server.post('/cars',(req,res)=>{
    try{
        res.json(addcars(req.body));
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
   
})



server.listen(port,()=>{
    console.log("Server started on port:"+port);
})