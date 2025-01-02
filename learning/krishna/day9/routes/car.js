import { Router } from "express";
import Car from "../models/cars.js"
const carRouter = Router();


carRouter.get('/',async (req,res)=>{
    try{
        // const {namme,price,manufacturer,makeYear}=
        const carDetails=await Car.find({});
        return res.json(
            carDetails)

    }catch(e){
        return res.json({
            error:e.message
        })
    }
})


carRouter.get('/:carName',async (req,res)=>{
  let carName=req.params.carName;
    try{
        // const {name,price,manufacturer,makeYear}=
        const carDetails=await Car.findOne({name:carName});
        return res.json(
            carDetails)

    }catch(e){
        return res.json({
            error:e.message
        })
    }
})


carRouter.put('/:carName',async (req,res)=>{
    let carName=req.params.carName
    let {name,price,manufacturer,makeYear}=req.body
    console.log(makeYear)
      try{
          const existingCar=await Car.findOne({name:carName});
   
          if(existingCar){
            const carDetails=await Car.updateOne({name,price,manufacturer,makeYear});
            return res.json(carDetails)
          }else{
            return res.status(400).json({
                msg:`Car Name: ${name} not found`
            })
          }
          
  
      }catch(e){
          return res.json({
              error:e.message
          })
      }
  })

  carRouter.post('/',async (req,res)=>{
    
    let {name,price,manufacturer,makeYear}=req.body
   
      try{
          const existingCar=await Car.findOne({name});
   
          if(existingCar){
            return res.status(400).json({
                msg:`Car Name: ${name} already exist`
            })
          }
          const carDetails=await Car.create({name, price, manufacturer, makeYear})
        
          return res.json(carDetails)
  
      }catch(e){
          return res.json({
              error:e.message
          })
      }
  })

carRouter.delete('/:carName',async (req,res)=>{
    let carName=req.params.carName;
      try{
          // const {name,price,manufacturer,makeYear}=
          const carDetails=await Car.deleteOne({name:carName});
          return res.json(
              carDetails)
  
      }catch(e){
          return res.json({
              error:e.message
          })
      }
  })

export {carRouter}