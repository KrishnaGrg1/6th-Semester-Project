import { Router } from "express";

import validate from "../middleware/valdation.js";
import validationSchema from "../validations/subscriptionPlan.js"
import subscriptionPlanController from "../controller/subscriptionController.js";


const subscriptionPlanRouter=Router()



subscriptionPlanRouter.post('/add',validate(validationSchema.addsubscriptionPlan),subscriptionPlanController.addsubscriptionPlan);

subscriptionPlanRouter.get('/',subscriptionPlanController.getSubscriptionPlans)

export default subscriptionPlanRouter