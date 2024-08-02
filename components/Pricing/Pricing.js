"use client";

import React, { useState } from "react";
import ReferralForm from "../ReferralForm/ReferralForm";
import Subscription from "../Subscription/Subscription";

const Pricing = ({ priceData }) => {
  const [referralId, setReferralId] = useState("");

  const handleReferralChange = (e) => {
    setReferralId(e.target.value);
  };

  return (
    <div>
      {/* <ReferralForm /> */}

      <div>
        <input
          type="text"
          value={referralId}
          onChange={handleReferralChange}
          placeholder="Enter referral ID"
        />
        <Subscription priceData={priceData} referralId={referralId} />
      </div>
    </div>
  );
};

export default Pricing;
