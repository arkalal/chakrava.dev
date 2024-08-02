"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Wallet from "../Wallet/Wallet";
import { useState, useEffect } from "react";
import axios from "../../axios/api"; // Adjust path as necessary
import { createStripeAccountLink } from "../../utils/actions";

const PremiumPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [referralId, setReferralId] = useState("");

  console.log("session", session);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`user/${session.user.id}`);
        setReferralId(res.data.referralId);
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };

    if (session) {
      fetchUserDetails();
    }
  }, [session]);

  const handleSubscribe = async () => {
    router.push("/pricing");
  };

  const handleManageSubscription = async () => {
    try {
      const res = await axios.post("manageSubscription", {
        userId: session.user.id,
      });
      window.location.href = res.data.url;
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
              <Wallet />
              <form action={createStripeAccountLink}>
                <input type="hidden" name="userId" value={session.user.id} />
                <button type="submit">Join as Affiliate</button>
              </form>
              {referralId && (
                <div>
                  <p>Your Referral ID: {referralId}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(referralId)}
                  >
                    Copy Referral ID
                  </button>
                </div>
              )}
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
