import React, { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBalance(response.data.balance);
    };
    fetchBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your Balance :</div>
      <div className="font-semibold ml-4 text-lg">{balance.toFixed(3)}</div>
    </div>
  );
};

export default Balance;
