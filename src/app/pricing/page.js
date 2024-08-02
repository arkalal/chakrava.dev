import React from "react";
import axios from "../../../axios/api";
import Pricing from "../../../components/Pricing/Pricing";

const getPricing = async () => {
  try {
    const res = await axios.get("prices");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const priceData = await getPricing();

  return (
    <div>
      <Pricing priceData={priceData} />
    </div>
  );
};

export default page;
