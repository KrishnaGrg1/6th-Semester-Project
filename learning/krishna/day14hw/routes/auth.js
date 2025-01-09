
import { Router } from "express";
import User from "../models/user.js";
import authController from "../controllers/auth.js";
import validate from "../middlewares/validation.js";
import validationSchema from '../validations/auth.js'

const authRouter=Router();

authRouter.post('/register',validate(validationSchema.register),authController.register )

authRouter.post('/login',validate(validationSchema.login),authController.login)

export default authRouter