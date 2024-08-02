"use client";

import React from "react";
import styles from "./Subscription.module.scss";
import PricingCard from "../PricingCard/PricingCard";

const Subscription = ({ priceData, referralId }) => {
  return (
    <div className={styles.Subscription}>
      <div className={styles.subHead}>
        <h2>Our Pricing Plans</h2>
        <p>Choose it right away!</p>
      </div>

      <div className={styles.priceCards}>
        {priceData &&
          priceData.map((item, index) => (
            <PricingCard
              key={index}
              data={item}
              referralId={referralId}
            ></PricingCard>
          ))}
      </div>
    </div>
  );
};

export default Subscription;
