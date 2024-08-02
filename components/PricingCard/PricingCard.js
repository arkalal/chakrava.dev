"use client";

import React from "react";
import styles from "./PricingCard.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "../../axios/api";

const PricingCard = ({ data, referralId }) => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log("data", data);

  const handleSubscribe = async () => {
    try {
      const res = await axios.post("checkout", {
        userId: session.user.id,
        priceId: data.id,
        referralId,
      });
      router.push(res.data);
    } catch (error) {
      console.log("Error creating checkout session:", error);
    }
  };

  return (
    <div className={styles.PricingCard}>
      <h3>{data.nickname}</h3>
      <p>
        ${(data.unit_amount / 100).toFixed(2)} per {data.recurring.interval}
      </p>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default PricingCard;
