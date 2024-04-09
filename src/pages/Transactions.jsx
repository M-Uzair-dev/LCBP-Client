import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Transactions = ({ user }) => {
  const [transactions, setTransactions] = useState([]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${hours}:${minutes
      .toString()
      .padStart(2, "0")}${ampm}, ${day} ${month} ${year}`;

    return formattedDate;
  }
  const fetchTransactions = async () => {
    let response = await fetch(
      `https://lcbp-earn-api.vercel.app/api/transactions/get`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
        }),
      }
    );
    const res = await response?.json();
    if (!res.success) {
      toast.error(res.message || "An unexpected error occured");
      return;
    }
    if (res.transactions) {
      setTransactions(res.transactions);
    }
    try {
    } catch (e) {}
  };
  useEffect(() => {
    try {
      if (user) {
        fetchTransactions();
      }
    } catch (e) {
      toast.error(e.message || "An unexpected error occured");
    }
  }, [user]);
  return (
    <div className="mainrightpage" style={{ padding: "30px" }}>
      <h1>Transactions : </h1>
      <div className="transactions">
        {transactions.length > 0 ? (
          transactions?.map((e, i) => (
            <div
              className={
                e.type === "reffer"
                  ? "trnsaction bordergreen"
                  : "trnsaction borderred"
              }
              key={i}
            >
              <p>{e.type}</p>
              <p>{e.amount}pkr</p>
              <p>{formatDate(e.date)}</p>
            </div>
          ))
        ) : (
          <p>No transactions.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
