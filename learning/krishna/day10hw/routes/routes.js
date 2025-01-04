import express, { Router } from "express";
import model from "../models/model.js";
const currencyRouter = Router();

currencyRouter.get('/',async(req,res)=>{
  try{
    const data=await model.find({});
    res.json({
      data
    })
  }
  catch(e){
    res.json({
      error:e.message
    })
  }
})


currencyRouter.put('/',async(req,res)=>{
  try{
    let {source,updatedBy}=req.body

    const data=await model.updateOne({
      source:source,
      updatedBy:updatedBy
    });


    res.json({
      data
    })
  }
  catch(e){
    res.json({
      error:e.message
    })
  }
})

currencyRouter.post('/',async(req,res)=>{
  try{
    let {name,exchangeRate,foundIn}=req.body
    
    const data=await model.updateOne({
      $push:{
        curriences:[{
          name,exchangeRate,foundIn
        }]
      }
    });


    res.json({
      data
    })
  }
  catch(e){
    res.json({
      error:e.message
    })
  }
})

export { currencyRouter };
