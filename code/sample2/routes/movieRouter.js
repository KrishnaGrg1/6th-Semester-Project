import { Router } from "express";
import movieController from "../controller/movieController.js";

import {checkPayment, restrictToLoggedinUserOnly} from '../middleware/auth.js'


const movieRouter=Router();

movieRouter.get('/home', restrictToLoggedinUserOnly,checkPayment,movieController.viewHome );


movieRouter.get('/contact', restrictToLoggedinUserOnly,movieController.viewContact);

movieRouter.get('/about',restrictToLoggedinUserOnly,movieController.viewAbout);

movieRouter.get('/pricing', restrictToLoggedinUserOnly,movieController.viewPricing);



// Movie Details Route
movieRouter.get('/movie/:id', restrictToLoggedinUserOnly,movieController.viewMoviebyMovieID );


export default movieRouter;