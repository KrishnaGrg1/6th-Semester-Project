import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    otp: {
        type: Number,
        default:null
    },
    expiresAt: {
        type: Date,
        default:null // Expiration date for OTP
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", UserSchema);

export default User;
