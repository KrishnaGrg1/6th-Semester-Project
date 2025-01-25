import { Router } from "express";



import SubscriptionPlan from "../models/subscriptionPlan.js";
import paymentController from "../controller/paymentController.js";
import UserModel from "../models/model.js";


const paymentRouter=Router()

paymentRouter.get('/add',async(req,res)=>{
    const subscriptionPlans =await SubscriptionPlan.find({});
    const loggedInUser = await UserModel.findById(req.user._id); // Get the logged-in user by ID
   
    res.render('purchase',{
        user: loggedInUser,
        subscriptionPlans,
        message:''
    })
})

paymentRouter.post('/add',paymentController.initiatePayment);

// paymentRouter.get('/',paymentController.getpayments)
paymentRouter.get('/verify',paymentController.completepayment);

export default paymentRouter