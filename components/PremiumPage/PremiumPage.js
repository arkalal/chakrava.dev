"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "../../axios/api";

const PremiumPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      const res = await axios.post("subscription", {
        userId: session.user.id,
      });
      window.location.href = res.data.short_url; // Redirect to Razorpay payment page
    } catch (error) {
      console.log("Error creating subscription:", error);
    }
  };

  return (
    <div>
      {session ? (
        <>
          {session.user.subscriptionStatus === "active" ? (
            <>
              <h1>Premium Content</h1>
              <p>Welcome to the premium content!</p>
            </>
          ) : (
            <button onClick={handleSubscribe}>Subscribe for ₹850/month</button>
          )}
        </>
      ) : (
        <p>Please sign in to access premium content.</p>
      )}
    </div>
  );
};

export default PremiumPage;
