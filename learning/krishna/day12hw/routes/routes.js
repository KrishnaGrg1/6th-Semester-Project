import { Router } from "express";
import { User } from "../models/model.js";
import validate from "../middleware/validate.js";
import { UserValidation } from "../validation/user.js";
const UserRouter = Router();

// POST /auth/login
//  accept email and password here

// POST /auth/register
//  accept all user details here

UserRouter.post(
  "/register",
  validate(UserValidation.register),
  async (req, res) => {
    try {
      let { name, email, address, phone, password } = req.body;
      const existing = await User.findOne({ email: email });
      if (existing) {
        throw new Error("Already used email: " + email);
      }
      let UserDetail = await User.create({
        name,
        email,
        address,
        phone,
        password
      });
      return res.json({
        message: "Successfully registered",
        data: UserDetail
      });
    } catch (e) {
      return res.status(400).json({
        error: e.message
      });
    }
  }
);

UserRouter.post("/login", validate(UserValidation.login), async (req, res) => {
  try {
    let { email, password } = req.body;
    let UserDetail = await User.findOne(req.body);
    if (UserDetail) {
      return res.json({
        message: "Successfully Login",
        data: UserDetail
      });
    }
    return res.json({
      message: "Incorrect email and password"
    });
  } catch (e) {
    return res.status.json({
      error: e.message
    });
  }
});

export { UserRouter };
