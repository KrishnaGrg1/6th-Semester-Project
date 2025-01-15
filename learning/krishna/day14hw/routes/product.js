
import { Router } from "express";

import productController from "../controllers/product.js";
import validate from "../middlewares/validation.js";

import validationSchema from '../validations/product.js'
import requireLogin from "../middlewares/requireLogin.js";
import captureUserAuthToken from "../middlewares/captureUserauthToken.js";
import existingProduct from "../middlewares/existingProuct.js";



const productRouter=Router();


productRouter.get('/',productController.get)
productRouter.get('/byuserid/:userid',productController.getBUserId)
productRouter.get('/byproduct/:productid',existingProduct,productController.getByProductId)
productRouter.post('/',captureUserAuthToken,requireLogin,validate(validationSchema.created),productController.post)

productRouter.put('/:productid',captureUserAuthToken,requireLogin,validate(validationSchema.created),existingProduct,productController.edit)

productRouter.delete('/:productid',captureUserAuthToken,requireLogin,existingProduct,productController.remove)
export default productRouter
