"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "../../axios/api";

const Wallet = () => {
  const { data: session } = useSession();
  const [wallet, setWallet] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get(`wallet?userId=${session.user.id}`);
        setWallet(res.data.wallet);
      } catch (error) {
        console.log("Error fetching wallet:", error);
      }
    };

    if (session) {
      fetchWallet();
    }
  }, [session]);

  const handlePayout = async () => {
    try {
      const res = await axios.post("api/wallet", {
        userId: session.user.id,
        amount,
      });
      alert(res.data.message);
      setWallet(wallet - amount);
    } catch (error) {
      console.log("Error processing payout:", error);
    }
  };

  return (
    <div>
      <h2>Wallet Balance: ${wallet}</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to withdraw"
      />
      <button onClick={handlePayout}>Withdraw</button>
    </div>
  );
};

export default Wallet;
