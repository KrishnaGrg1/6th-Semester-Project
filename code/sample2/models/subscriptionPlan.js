import  { Schema, model } from "mongoose";

const subscriptionPlanSchema = new Schema({
  plan_name: {
    type: String,
    required: true
  },
  durationMonth: {
    type: Number,
    required: true,
    enum: [1, 3, 6, 12] // Duration can only be 1, 3, 6, or 12 months
  },
  price: {
    type: Number,
    required: true,
    enum: [999, 2500,4500 , 8000] // Price can only be one of these values
  }
});

const SubscriptionPlan = model('SubscriptionPlan', subscriptionPlanSchema);
export default SubscriptionPlan;
