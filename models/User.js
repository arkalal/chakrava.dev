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
    stripeCustomerId: String,
    stripeAccountId: String,
    subscriptionStatus: {
      type: String,
      enum: ["active", "past_due", "canceled", "incomplete"],
      default: "canceled",
    },
    wallet: {
      type: Number,
      default: 0,
    },
    referralId: String,
    referredBy: String,
    subscriptions: [subscriptionSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
