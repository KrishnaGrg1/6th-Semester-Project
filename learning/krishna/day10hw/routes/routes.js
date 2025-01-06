import express, { Router } from "express";
import model from "../models/model.js";
import { addCurrencySchema, addmainSchema } from "../validation/validate.js";

const currencyRouter = Router();
const singleRouter=Router();

currencyRouter.get("/", async (req, res) => {
  try {
    const data = await model.find({});
    res.json(
      data
    );
  } catch (e) {
    res.json({
      error: e.message
    });
  }
});

currencyRouter.put("/", async (req, res) => {
  try {
    let {source, updatedBy } = req.body;

    const valid = await addmainSchema.validate(req.body, { abortEarly: false });
    if (valid.error) {
      throw new Error("Validation error:" + valid.error.message);
    }
    const data = await model.updateOne(valid.value);
    res.json({
      data
    });
  } catch (e) {
    res.json({
      error: e.message
    });
  }
});

currencyRouter.post("/", async (req, res) => {
  try {
    let { name, exchangeRate, foundIn } = req.body;
    const valid = addCurrencySchema.validate(req.body, {
      abortEarly: false
    });
    if (valid.error) {
      throw new Error("Validation error" + valid.error.message);
    }
    let existing = await model.findOne({});
    let id = existing._id;

    let data = await model.updateOne(
      { _id: id },
      {
        $push: {
          currencies: {
            name,
            exchangeRate,
            foundIn
          }
        }
      }
    );

    return res.json({
      msg: `Succesfully added Curriency:` + name
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

currencyRouter.use("/:currencyID",async(req,res,next)=>{
  try{
    let currencyID=req.params.currencyID;
    if(!currencyID){
      throw Error("Currency Id is not given")
    }
    let intial = await model.findOne({});

    function check(cu) {
      return cu._id.toString() === currencyID.toString();
    }
    
    let data = intial.currencies.find(check);
    if(!data){
      throw Error("Currency Id not found, Id:"+currencyID)
    }else{
      req.currency=data
      req.intial=intial
      next();
    }

  }catch(e){
    return res.status(411).json({
      error:e.message
    })
  }
},singleRouter)

singleRouter.get("/",async (req, res) => {
  try {
   

    return res.json(
      req.currency
    );
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

singleRouter.put("/", async (req, res) => {
  try {
   
    let { name, exchangeRate, foundIn } = req.body;

    const valid = addCurrencySchema.validate(req.body, {
      abortEarly: false
    });
    
    if (valid.error) {
      throw new Error("Validation error" + valid.error.message);
    }

    
    let currency = req.currency;
    let intial=req.intial
    if(!currency){
      throw Error("currency ID not given")
    }
  
    currency.name = name;
    currency.exchangeRate =exchangeRate;
    currency.foundIn = foundIn;
    
    await intial.save();

   
    return res.json({
      currency
    });

  } catch (e) {
   
    console.error(e);
    res.status(500).json({
      error: e.message
    });
  }
});







export { currencyRouter };
