"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PremiumPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = async () => {
    router.push("/pricing");
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
