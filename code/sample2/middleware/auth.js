

import PurchasedPlan from '../models/purchase.js';
import { setUser, getUser } from '../services/auth.js';

async function checkForAuthentication(req,res,next){
  const authorizationHeaderValue = req.headers["authorization"];
  if(!authorizationHeaderValue || !authorizationHeaderValue)
  
  next();
}

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
 console.log(userUid)
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

async function checkPayment(req, res, next) {
  try {
    const userUid = req.cookies?.uid;

    if (!userUid) {
      return res.redirect("/login"); // Redirect to login if no UID found
    }

    const user = await getUser(userUid); // Await the function if it's async

    if (!user) {
      return res.redirect("/login"); // Redirect to login if user not found
    }

    req.user = user;

    const existingUser = await PurchasedPlan.findOne({ user: req.user._id });

    if (!existingUser || existingUser.expiryDate < Date.now()) {
      // return res.redirect("/pricing"); // Redirect to pricing if no payment
      return res.redirect(`/pricing?message=Payment required`);

    }

    next(); // Allow access if payment is valid
  } catch (error) {
    console.error("Error in checkPayment middleware:", error);
    res.status(500).render("home", { message: "Internal Server Error" });
  }
}



export {
  restrictToLoggedinUserOnly,
  checkAuth,
  checkPayment
};
