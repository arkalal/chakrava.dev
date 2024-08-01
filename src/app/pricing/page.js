import React from "react";
import axios from "../../../axios/api";
import Subscription from "../../../components/Subscription/Subscription";
import ReferralForm from "../../../components/ReferralForm/ReferralForm";

const getPricing = async () => {
  try {
    const res = await axios.get("prices");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Pricing = async () => {
  const priceData = await getPricing();
  console.log("priceData", priceData);

  return (
    <div>
      <ReferralForm />
      <Subscription priceData={priceData}></Subscription>
    </div>
  );
};

export default Pricing;
