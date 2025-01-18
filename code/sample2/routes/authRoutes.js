import { Router } from "express";
import authController from "../controller/authController.js";

const authRouter = Router();

authRouter.post("/register", authController.register);

authRouter.get("/register", (req, res) => {
  res.render("register",{message:""});
});

// Login Routes
authRouter.get("/login", (req, res) => {
  res.render("login", { message: "" });
});

authRouter.post("/login", authController.login);

authRouter.post("/forget-password", authController.forgetPassword);



authRouter.post('/verify-otp', authController.verifyOtp);  // To verify OTP and update password



authRouter.get("/forget-password", (req, res) => {
  res.render("forget-password", { message: "" });
});

// Logout Route
authRouter.get("/logout", (req, res) => {
  // Clear the session cookie
  res.clearCookie("uid");
  res.redirect("/login");
});

// Add other routes as needed
authRouter.get('/', (req, res) => {
    res.redirect('/login');
});



export default authRouter;