import React, { useState } from "react";
import { toast } from "sonner";

const Withdraw = ({ user }) => {
  const [data, setData] = useState({
    AccountPlatform: "",
    accountName: "",
    accountnum: "",
    amount: "",
  });
  function isValidNumber(inputString) {
    return /^\d+$/.test(inputString);
  }
  const withdrawamount = async () => {
    try {
      if (!isValidNumber(data.amount)) {
        toast.error("Amount can only contain numbers");
        return;
      }
      if (user.balance && data.amount > user.balance) {
        toast.error("Insufficient Balance");
        return;
      }

      let response = await fetch(
        `https://lcbp-earn-api.vercel.app/api/withdraws/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            userid: user._id,
            balance: user.balance,
            username: user.username,
          }),
        }
      );
      const res = await response?.json();
      if (!res.success) {
        toast.error(res.message || "An unexpected error occured");
        return;
      }

      toast.success(res.message);
    } catch (e) {
      toast.error("An unexpected error occured");
    }
  };

  return (
    <div className="mainrightpage" style={{ padding: "30px" }}>
      <div className="withdrawCard">
        <h1>Withdraw : </h1>
        <p>Account Balance : {user.balance || 0} pkr</p>
        <input
          placeholder="Enter Amount"
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: e.target.value })}
        />
        <input
          placeholder="Enter Account Name"
          value={data.accountName}
          onChange={(e) => setData({ ...data, accountName: e.target.value })}
        />
        <input
          placeholder="Enter Account Number"
          value={data.accountnum}
          onChange={(e) => setData({ ...data, accountnum: e.target.value })}
        />
        <input
          placeholder="Enter Account Platform"
          value={data.AccountPlatform}
          onChange={(e) =>
            setData({ ...data, AccountPlatform: e.target.value })
          }
        />
        <button onClick={withdrawamount}>Withdraw</button>
      </div>
    </div>
  );
};

export default Withdraw;
