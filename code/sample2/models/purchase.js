import { Schema, model } from "mongoose";

const purchasedPlanSchema = new Schema(
  {
    plan_id: {
      type: Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      enum: ["khalti"],
      required: true
    },
    expiryDate: {
      type: Date, // Store the expiry date
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "refunded"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const PurchasedPlan = model("PurchasedPlan", purchasedPlanSchema);

export default PurchasedPlan;
