import UserModel from "../models/model.js";
import { setUser, getUser } from "../services/auth.js";
import bcrypt from 'bcrypt';
import sendmail from "../middleware/sendmail.js";

const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const saltRounds = 10;
    if (!fname || !lname || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .render("register", { message: "Email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await UserModel.create({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword
    });

    console.log(user);
    res.render("login", { message: "Succesfully Signup" });
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).send({
      error: error.message
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.render("login", { message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { message: "Invalid email or password" });
    }

    if (user.isVerify === false) {
      return res.render("otp-profile", { message: "User is not verified" });
    }

    const token = setUser(user);
    res.cookie("uid", token, { httpOnly: true, secure: true });
    res.redirect("/home");
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).render("login", { message: error.message });
  }
};


const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res
        .status(404)
        .render("forget-password", { message: "Email not found" });
    }

    const result = await sendmail(existingUser.email, existingUser.fname);
    if (!result) {
      console.error("Failed to generate OTP or send email");
      return res
        .status(500)
        .render("forget-password", {
          message: "OTP could not be generated or email sending failed"
        });
    }

    existingUser.otp = result.otp;
    existingUser.otpAttempts=0;
    existingUser.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expiration time (15 minutes)
    await existingUser.save();

    console.log(existingUser.email);
    // Pass 'email' to the view so it's available in the form
    return res.render("verify-otp", {
      email: existingUser.email,
      message: "OTP sent successfully. Please verify it."
    });
  } catch (e) {
    console.error("Error in forgetPassword:", e);
    return res
      .status(500)
      .render("forget-password", {
        message: "An unexpected error occurred. Please try again later."
      });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, newPassword, email } = req.body; // Extract email, otp, and newPassword from req.body

    console.log("Email received in verifyOtp:", email); // Log email to check its value

    const existingUser = await UserModel.findOne({ email: email });
    const MAX_OTP_ATTEMPTS = 10; // Define the maximum allowed OTP attempts
    if (existingUser.otpAttempts >= MAX_OTP_ATTEMPTS) {
      return res.status(403).render("forget-password", {
        message: "Too many incorrect OTP attempts. Please request a new OTP.",
        email: email
      });
    }
    console.log("ex" + existingUser.otp);
    console.log("otp" + otp);

    if (!existingUser) {
      return res
        .status(404)
        .render("verify-otp", { message: "User not found", email: email });
    }

    // Check if OTP is correct and has not expired
    if (String(otp) !== String(existingUser.otp)) {
      existingUser.otpAttempts += 1;
      await existingUser.save();
      return res
        .status(400)
        .render("verify-otp", { message: `Invalid OTP, Attempt left:${10-existingUser.otpAttempts}`, email: email });
    }

    if (new Date() > existingUser.expiresAt) {
      return res
        .status(400)
        .render("verify-otp", { message: "OTP has expired", email: email });
    }
    const saltRounds=10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Set new password (make sure to hash it)
    existingUser.password = hashedPassword;
    existingUser.otp = undefined; // Clear OTP after use
    existingUser.expiresAt = undefined; // Clear expiration date
    existingUser.otpAttempts = 0;
    await existingUser.save();

    // After successful reset, redirect to login
    return res.redirect("/login");
  } catch (e) {
    console.error("Error in verifyOtp:", e);
    return res
      .status(500)
      .render("verify-otp", {
        message: "An unexpected error occurred. Please try again later."
      });
  }
};

const otpProfile = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res
        .status(404)
        .render("otp-profile", { message: "Email not found" });
    }
    if(existingUser.isVerify===true){
      return res
      .render("login", {
        message: "User is already verified"
      });
    }

    const result = await sendmail(existingUser.email, existingUser.fname);
    if (!result) {
      console.error("Failed to generate OTP or send email");
      return res
        .status(500)
        .render("otp-profile", {
          message: "OTP could not be generated or email sending failed"
        });
    }

    existingUser.otp = result.otp;
    existingUser.otpAttempts=0;
    existingUser.expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expiration time (15 minutes)
    await existingUser.save();

    console.log(existingUser.email);
    // Pass 'email' to the view so it's available in the form
    return res.render("verify-profile", {
      email: existingUser.email,
      message: "OTP sent successfully. Please verify it."
    });
  } catch (e) {
    console.error("Error in forgetPassword:", e);
    return res
      .status(500)
      .render("otp-profile", {
        message: "An unexpected error occurred. Please try again later."
      });
  }
};

const verifyProfile = async (req, res) => {
  try {
    const { otp,email } = req.body; // Extract email, otp, and newPassword from req.body

    console.log("Email received in verifyOtp:", email); // Log email to check its value

    const existingUser = await UserModel.findOne({ email: email });
    const MAX_OTP_ATTEMPTS = 10; // Define the maximum allowed OTP attempts
    if (existingUser.otpAttempts >= MAX_OTP_ATTEMPTS) {
      existingUser.otp = undefined; // Clear OTP after use
    existingUser.expiresAt = undefined; // Clear expiration date
    existingUser.otpAttempts = 0;
    await existingUser.save();
      return res.status(403).render("otp-profile", {
        message: "Too many incorrect OTP attempts. Please request a new OTP.",
        email: email
      });
    }
    console.log("ex" + existingUser.otp);
    console.log("otp" + otp);

    if (!existingUser) {
      return res
        .status(404)
        .render("verify-profile", { message: "User not found", email: email });
    }

    // Check if OTP is correct and has not expired
    if (String(otp) !== String(existingUser.otp)) {
      existingUser.otpAttempts += 1;
      await existingUser.save();
      return res
        .status(400)
        .render("verify-profile", { message: `Invalid OTP, Attempt left:${10-existingUser.otpAttempts}`, email: email });
    }

    if (new Date() > existingUser.expiresAt) {
      return res
        .status(400)
        .render("verify-profile", { message: "OTP has expired", email: email });
    }

    existingUser.isVerify=true;
    existingUser.otp = undefined; // Clear OTP after use
    existingUser.expiresAt = undefined; // Clear expiration date
    existingUser.otpAttempts = 0;
    await existingUser.save();

    // After successful reset, redirect to login
    return res.redirect("/login");
  } catch (e) {
    console.error("Error in verifPrile:", e);
    return res
      .status(500)
      .render("verify-otp", {
        message: "An unexpected error occurred. Please try again later."
      });
  }
};

const authController = {
  register,
  login,
  forgetPassword,
  verifyOtp,
  otpProfile,
  verifyProfile
};

export default authController;
