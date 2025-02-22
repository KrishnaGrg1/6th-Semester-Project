import catchAsync from "../helpers/catchAsync.js";
import khaltifunction from "../services/khalti.js";
import Payment from "../models/payment.js";

import SubscriptionPlan from "../models/subscriptionPlan.js";
import PurchasedPlan from "../models/purchase.js";
import UserModel from "../models/model.js";

const initiatePayment = catchAsync(async (req, res) => {
  const { planid, paymentMethod } = req.body;

  const userId = req.user;

  console.log("User: " + userId._id);

  // Check if user has an existing subscription plan
  const existingSubscription = await PurchasedPlan.findOne({
    user: userId,
    status: "completed",
    expiryDate: { $gte: new Date() } // Ensure the subscription has not expired
  });

  console.log(existingSubscription);

 

  // Check if subscription plan exists
  const existingsubscriptionPlan = await SubscriptionPlan.findOne({
    _id: planid
  });
  if (!existingsubscriptionPlan) {
    throw new Error("Subscription Plan not found");
  }

  // Check if the payment method is Khalti
  if (paymentMethod !== "khalti") {
    throw new Error("Other payment methods are not available");
  }

  if (existingSubscription) {
    const subscriptionPlans =await SubscriptionPlan.find({});
    const loggedInUser = await UserModel.findById(req.user._id);
    return res.status(400).render("purchase", {
      user: loggedInUser,
      subscriptionPlans,
      message: "You already have an active subscription.",
    });
  }
  // Calculate the expiry date based on the plan duration (e.g., 30 days)

  const expiryDate = new Date();
  expiryDate.setMonth(
    expiryDate.getMonth() + existingsubscriptionPlan.durationMonth
  ); // Adds 30 days to the current date

  // Create the purchased plan in the database
  const purchasedPlan = await PurchasedPlan.create({
    user: userId._id,
    plan_id: planid,
    totalPrice: existingsubscriptionPlan.price * 100,
    paymentMethod: paymentMethod,
    expiryDate: expiryDate
  });

  // Initialize Khalti payment
  try {
    const paymentInitate = await khaltifunction.initializeKhaltiPayment({
      amount: existingsubscriptionPlan.price * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedPlan._id, // purchase_order_id to verify later
      purchase_order_name: existingsubscriptionPlan.plan_name,
      return_url: `${process.env.BACKEND_URI}payment/verify`, // return URL for the redirect

      website_url: `${process.env.FRONTEND_URI}` // the website URL
    });

    // Return the success response
    // res.json({
    //   success: true,
    //   purchasedPlan,
    //   payment: paymentInitate
    // });
    // res.redirect(paymentInitate.return_url, {
    //   success: true,
    //   paymentUrl: paymentInitate.payment_url, // Assuming this is returned from Khalti
    //   message: "Payment initiation successful. You will be redirected shortly.",

    // });

    res.redirect(paymentInitate.payment_url);
  } catch (error) {
    // Handle error during Khalti payment initialization
    console.error("Error initializing Khalti payment:", error.message || error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to initialize payment"
    });
  }
});

const completepayment = catchAsync(async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id
  } = req.query;
  try {
    const userId = req.user;

    console.log("User Id: " + userId._id);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    const paymentInfo = await khaltifunction.verifyPayment(pidx);

    console.log(paymentInfo);

    // Check if payment is completed and details match
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete information",
        paymentInfo
      });
    }
    const purchasePlan = await PurchasedPlan.findOne({
      _id: purchase_order_id,
      totalPrice: amount
    });
    if (!purchasePlan) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found"
      });
    }
    purchasePlan.status = "completed";
    await purchasePlan.save();

    const paymentData = await Payment.create({
      user: userId._id,
      pidx,
      transactionId: transaction_id,
      productId: purchase_order_id,
      amount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "khalti",
      status: "success"
    });
    // res.json({
    //   success: true,
    //   message: "Payment Successful",
    //   paymentData
    // });

    const subscriptionPlans = await SubscriptionPlan.find({});
    const loggedInUser = await UserModel.findById(req.user._id); // Get the logged-in user by ID

    res.render("purchase", {
      user: loggedInUser,
      subscriptionPlans,
      message: "Payment Successful"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error
    });
  }
});

const paymentController = {
  initiatePayment,
  completepayment
};

export default paymentController;
