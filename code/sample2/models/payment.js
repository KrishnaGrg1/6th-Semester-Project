import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Link to the User model
      required: true
    },
    transactionId: {
      type: String,
      unique: true
    },
    pidx: {
      type: String,
      unique: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "PurchasedPlan",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },
    dataFromVerificationReq: {
      type: Object
    },
    apiQueryFromUser: {
      type: Object
    },
    paymentGateway: {
      type: String,
      enum: ["khalti", "esewa", "connectIps"],
      required: true
    },

    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending"
    },
    paymentDate: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const Payment = model("Payment", paymentSchema);
export default Payment;
