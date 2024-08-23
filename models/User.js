import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    priceId: String,
    status: {
      type: String,
      enum: ["active", "canceled", "past_due", "unpaid", "incomplete"],
      default: "incomplete",
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    razorpaySubscriptionId: String,
    subscriptionStatus: {
      type: String,
      enum: ["active", "past_due", "canceled", "incomplete"],
      default: "canceled",
    },
    subscriptions: [subscriptionSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
