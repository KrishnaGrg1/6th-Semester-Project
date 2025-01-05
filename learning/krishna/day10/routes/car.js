import { Router } from "express";
import Car from "../models/cars.js";
import { addCarSchema } from "../validation/validate.js";
const carRouter = Router();



carRouter.get("/", async (req, res) => {
  try {
    // const {namme,price,manufacturer,makeYear}=
    const carDetails = await Car.find({});
    return res.json(carDetails);
  } catch (e) {
    return res.json({
      error: e.message
    });
  }
});


carRouter.put("/:id", async (req, res) => {
  let carID = req.params.id;
  let { name, price, manufacturer, makeYear } = req.body;
  // console.log(makeYear);
  try {
    const existingCar = await Car.findOne({ _id: carID });
    
    if (!existingCar) {
      return res.status(400).json({ msg: `Car Name: ${carID} not found` });
    }
    const ValidationResult=addCarSchema.validate(req.body,{abortEarly:false});
    if(ValidationResult.error){
      throw new Error ("Validation error:" + ValidationResult.error.message)
    }
    const carDetails = await Car.updateOne( req.body);
    return res.json(carDetails);
  } catch (e) {
    return res.json({
      error: e.message
    });
  }
});

carRouter.post("/", async (req, res) => {
  let { name, price, manufacturer, makeYear } = req.body;
  
  try {
    const existingCar = await Car.findOne({name });
    
    if (existingCar) {
      return res.status(400).json({
        msg: `Car Name: ${name} already exist`
      });
    }
    const ValidationResult=addCarSchema.validate(req.body,{abortEarly:false});
    if(ValidationResult.error){
      throw new Error ("Validation error:" + ValidationResult.error.message)
    }
    console.log(ValidationResult.value, req.body);
    const carDetails = await Car.create(req.body);
    
    return res.json(carDetails);
  } catch (e) {
    return res.json({
      error: e.message
    });
  }
});

carRouter.delete("/:carName", async (req, res) => {
  let carName = req.params.carName;
  try {
    const existingCar = await Car.findOne({ name: carName });
    
    
    if (existingCar) {
      const carDetails = await Car.deleteOne({ name: carName });
      return res.json(carDetails);
      
    }
    return res.json({
      msg: `Car's Name :${carName} not found`
    });
    
    
  } catch (e) {
    return res.json({
      error: e.message
    });
  }
});

carRouter.get("/:carName", async (req, res) => {
  let carName = req.params.carName;
  try {
    // const {name,price,manufacturer,makeYear}=
    let existingCar = await Car.findOne({ name: carName });

    if (existingCar) {
        const carDetails = await Car.findOne({ name: carName });
        return res.json(carDetails);
    }
    return res.json({
        msg: `Car's Name: ${carName} not found`
      });
   
  } catch (e) {
    return res.json({
      error: e.message
    });
  }
});
export { carRouter };
