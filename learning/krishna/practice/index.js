import express from "express";
import fs from "fs";
const server= express();
const port=8001;


server.get('/files',(req,res)=>{
    fs.readFile('./files/a.txt',{encoding:"utf-8"},(err,data)=>{
        res.json(data)
    });  
})

server.get('/files/:filename',(req,res)=>{
    const filename=req.params.filename;


    fs.readFile(`./files/${filename}`,{encoding:"utf-8"},(err,data)=>{
        res.json(data)
    });  
})



server.listen(port,(req,res)=>{
    console.log("Server started on port:8001");
})

