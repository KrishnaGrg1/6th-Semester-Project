// routes/routes.js
import express, { Router } from 'express';
import authRouter from './authRoutes.js';
import movieRouter from './movieRouter.js';
import playlistRouter from './playlistRouter.js';
import profileManagementRouter from './profileManagementRoutes.js';


const mainRouter=Router();


mainRouter.use('/',authRouter)

mainRouter.use('/',movieRouter)

mainRouter.use('/',playlistRouter)


mainRouter.use('/',profileManagementRouter)







export default mainRouter