import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    image: String,
    stripeCustomerId: String,
    subscriptionStatus: {
      type: String,
      enum: ["active", "past_due", "canceled"],
      default: "canceled",
    },
    subscriptions: [
      {
        priceId: String,
        status: {
          type: String,
          enum: ["active", "canceled", "past_due", "unpaid", "incomplete"],
          default: "incomplete",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
