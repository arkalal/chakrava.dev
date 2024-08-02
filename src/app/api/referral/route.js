import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoDB";
import User from "../../../../models/User";

export async function POST(req) {
  try {
    const { userId, referralId } = await req.json();
    await connectMongoDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.referredBy) {
      return NextResponse.json(
        { error: "Referral ID already applied" },
        { status: 400 }
      );
    }

    const referrer = await User.findOne({ referralId });

    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral ID" },
        { status: 400 }
      );
    }

    user.referredBy = referrer._id;
    await user.save();

    return NextResponse.json({ message: "Referral ID applied successfully" });
  } catch (error) {
    console.error("Error applying referral ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
