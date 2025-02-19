import { Router } from "express";
import profileManagementController from "../controller/profileManagementController.js";


import {restrictToLoggedinUserOnly} from '../middleware/auth.js'

const profileManagementRouter = Router();

// Profile Edit Route (GET)
profileManagementRouter.get('/edit-profile', restrictToLoggedinUserOnly, profileManagementController.viewProfileEdit);


// Profile Update Route (POST)
profileManagementRouter.post('/profile-update', restrictToLoggedinUserOnly, profileManagementController.updateUserProfile);

// Admin Profile Update Route (POST)
profileManagementRouter.post('/admin-profile-update', restrictToLoggedinUserOnly, profileManagementController.updateAdminProfile);

//View Profile(Get)
profileManagementRouter.get('/profiledetails',restrictToLoggedinUserOnly,profileManagementController.viewProfileDetails)

export default profileManagementRouter