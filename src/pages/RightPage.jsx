import React from "react";

const RightPage = ({ user, transactions, planpending, plan, formatDate }) => {
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
  function formatNumber(num) {
    // Convert the number to a string with at most 2 decimal places
    let formattedNum = num.toFixed(2);

    // Remove trailing zeros
    formattedNum = formattedNum.replace(/\.?0*$/, "");

    return formattedNum;
  }
  return (
    <div className="mainrightpage">
      <div
        className="planBox"
        style={
          planpending
            ? { borderLeft: "5px solid red" }
            : { borderLeft: "5px solid green" }
        }
      >
        {planpending ? (
          <p>Your plan is pending at the moment. </p>
        ) : (
          <div>You are subscribed to {plan?.name} plan.</div>
        )}
      </div>
      <div className="dashbardinfo">
        <h1>
          Your Balance :{" "}
          <span style={{ fontSize: "35px", fontWeight: "bold" }}>
            {user.balance ? formatNumber(user.balance || 0) : 0}
          </span>{" "}
          pkr
        </h1>
        <h1>
          All time earnings :{" "}
          <span style={{ fontSize: "35px", fontWeight: "bold" }}>
            {user.alltimeearned ? formatNumber(user.alltimeearned || 0) : 0}
          </span>{" "}
          pkr
        </h1>
        <h1>
          Amount withdrawn :{" "}
          <span style={{ fontSize: "35px", fontWeight: "bold" }}>
            {user.withdrawn ? formatNumber(user.withdrawn || 0) : 0}
          </span>{" "}
          pkr
        </h1>
        <h1>
          Earned through reffers :{" "}
          <span style={{ fontSize: "35px", fontWeight: "bold" }}>
            {user.earnedbyreffers ? formatNumber(user.earnedbyreffers || 0) : 0}
          </span>{" "}
          pkr
        </h1>
        <h1>
          Earned through Box and spin :{" "}
          <span style={{ fontSize: "35px", fontWeight: "bold" }}>
            {user.earnedbyspinandbox
              ? formatNumber(user.earnedbyspinandbox || 0)
              : 0}
          </span>{" "}
          pkr
        </h1>
      </div>

      <h1 className="titletransactions">Transactions : </h1>
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
              <p>{e.from}</p>
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

export default RightPage;
