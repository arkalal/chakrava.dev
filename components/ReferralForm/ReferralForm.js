"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "../../axios/api";

const ReferralForm = () => {
  const { data: session } = useSession();
  const [referralId, setReferralId] = useState("");

  const handleReferral = async () => {
    try {
      await axios.post("referral", {
        userId: session.user.id,
        referralId,
      });
      alert("Referral ID applied successfully!");
    } catch (error) {
      console.log("Error applying referral ID:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={referralId}
        onChange={(e) => setReferralId(e.target.value)}
        placeholder="Enter referral ID"
      />
      <button onClick={handleReferral}>Apply Referral</button>
    </div>
  );
};

export default ReferralForm;
