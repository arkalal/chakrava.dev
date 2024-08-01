"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "../../axios/api";

const PremiumPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = async () => {
    router.push("/pricing");
  };

  const handleManageSubscription = async () => {
    try {
      const res = await axios.post("manageSubscription", {
        userId: session.user.id,
      });
      window.location.href = res.data;
    } catch (error) {
      console.log("Error creating billing portal session:", error);
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
              <button onClick={handleManageSubscription}>
                Manage Subscription
              </button>
            </>
          ) : (
            <button onClick={handleSubscribe}>Subscribe for $20/month</button>
          )}
        </>
      ) : (
        <p>Please sign in to access premium content.</p>
      )}
    </div>
  );
};

export default PremiumPage;
