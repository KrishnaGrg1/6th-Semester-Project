
import { Router } from "express";
import Product from "../models/product.js";
import productController from "../controllers/product.js";
import validate from "../middlewares/validation.js";

// import authController from "../controllers/auth.js";
// import validate from "../middlewares/validation.js";
import validationSchema from '../validations/product.js'



const productRouter=Router();


productRouter.get('/',productController.get)
productRouter.post('/',validate(validationSchema.created),productController.post)

export default productRouter