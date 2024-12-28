import express from 'express';
import { config } from 'dotenv';
import {getCurrentViews,increasedViews,resetViews,decreaseViews} from './helpers/views.js'
config();
const port=process.env.PORT || 4000;
const server=new express();



server.get('/',function(req,res){
    res.send("Views App.")
})

server.get('/views',function(req,res){
    // res.send({});
   res.send(getCurrentViews());
})
server.get('/views/increase',function(req,res){
    // res.send({});
   res.send(increasedViews());
})

// /views/reset
//Reset the count to 0.
server.get('/views/reset',function(req,res){
    // res.send({});
   res.send(resetViews());
})
server.get('/views/decrease',function(req,res){
    // res.send({});
   res.send(decreaseViews());
})

server.listen(port,function(){
    console.log("server started on Port:",port);
})

