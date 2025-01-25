// routes/routes.js
import express, { Router } from 'express';
import authRouter from './authRoutes.js';
import movieRouter from './movieRouter.js';
import playlistRouter from './playlistRouter.js';
import profileManagementRouter from './profileManagementRoutes.js';
import subscriptionPlanRouter from './subscriptionRoutes.js';
import paymentRouter from './paymentRoutes.js';
import { restrictToLoggedinUserOnly } from '../middleware/auth.js';


const mainRouter=Router();


mainRouter.use('/',authRouter)

mainRouter.use('/',movieRouter)

mainRouter.use('/',playlistRouter)
mainRouter.use('/subscriptionPlan',subscriptionPlanRouter)
mainRouter.use('/payment',restrictToLoggedinUserOnly,paymentRouter)

mainRouter.use('/',profileManagementRouter)







export default mainRouter