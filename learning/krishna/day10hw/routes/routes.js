import express, { Router } from "express";
import model from "../models/model.js";
import { addCurrencySchema, addmainSchema } from "../validation/validate.js";

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

    const valid=await addmainSchema.validate(req.body,{abortEarly:false});
    if(valid.error){
      throw new Error("Validation error"+ valid.error.message)
    }
    const data=await model.updateOne(
      valid.value
    );
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



currencyRouter.post('/', async (req, res) => {
  try {
    let { name, exchangeRate, foundIn } = req.body;
    const valid=await addCurrencySchema.validate(req.body,{abortEarly:false});
    if(valid.error){
      throw new Error("Validation error"+ valid.error.message)
    }
    let existing=await model.findOne({});;
    let id=existing._id;

    let data=await model.updateOne(
      {_id:id},
      {
      $push:{
        currencies:{
          name,
          exchangeRate,
          foundIn
        }
      }
    });
    return res.json({
      msg:`Succesfully added Curriency:`+name })
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

currencyRouter.get('/:currencyID', async (req, res) => {
  try {
    let currencyID=req.params.currencyID
    let intial=await model.findOne({});

    
    
    let data = intial.currencies.findOne(currency => currency._id === currencyID);



    return res.json({
      data
    })
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});


export { currencyRouter };
