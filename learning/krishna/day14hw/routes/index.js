import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from "./product.js";

const mainRoutes=Router();

mainRoutes.use('/auth',authRouter);


mainRoutes.use('/products',productRouter)


export default mainRoutes 