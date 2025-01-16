import { Router } from "express";
import authRouter from "./auth.js";

const mainRoutes=Router();


mainRoutes.use('/auth',authRouter)


export default mainRoutes