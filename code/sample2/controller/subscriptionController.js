import catchAsync from "../helpers/catchAsync.js";
import SubscriptionPlan from "../models/subscriptionPlan.js";



const addsubscriptionPlan=catchAsync( async(req,res)=>{
    const existingsubscriptionPlan=await SubscriptionPlan.findOne({plan_name:req.body.plan_name})
    
    if(existingsubscriptionPlan){
        throw new Error ("subscriptionPlan already taken or used");
    }
    
    const newsubscriptionPlan=(await SubscriptionPlan.create(req.body)).toObject();

    return res.json({
        message:"subscriptionPlan added Successfully",
        subscriptionPlan:{...newsubscriptionPlan,password:undefined}
    })
});

const getSubscriptionPlans = catchAsync(async (req, res) => {
    // Fetch subscription plans and sort them by price in ascending order
    const plans = await SubscriptionPlan.find({}).sort({ price: 1 }); // 1 for ascending, -1 for descending
    
    // Return the plans as JSON
    res.json({
      success: true,
      plans: plans // No need to call toObject(), Mongoose automatically returns documents as objects
    });
  });
  

  const checkSubscriptionValidity = catchAsync(async (req, res, next) => {
    const userId = req.user.id; // Assume the user ID is in the request (from authentication)
  
    // Find the latest purchased plan of the user
    const purchasedPlan = await PurchasedPlan.findOne({
      user: userId,
      status: "completed"
    }).sort({ createdAt: -1 }); // Get the most recent purchased plan
  
    if (!purchasedPlan) {
      return res.status(400).json({
        success: false,
        message: "No active subscription found"
      });
    }
  
    // Check if the subscription is still valid
    const currentDate = new Date();
    if (currentDate > new Date(purchasedPlan.expiryDate)) {
      purchasedPlan.status = "expired";
      await purchasedPlan.save();
      return res.status(400).json({
        success: false,
        message: "Your subscription has expired"
      });
    }
  
    // Proceed to next middleware or handler
    next();
  });
  
const subscriptionPlanController={
    addsubscriptionPlan,getSubscriptionPlans,checkSubscriptionValidity
}
export default subscriptionPlanController