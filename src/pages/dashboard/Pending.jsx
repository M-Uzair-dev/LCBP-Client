import React, { useEffect, useState } from "react";
import "./pending.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./users.css";
import pfp from "./pfp.jpg";
import { toast } from "sonner";

const Pending = ({ show }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/request/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res) {
        throw new Error("No response from the server");
      }

      const result = await res.json();

      if (!result) {
        throw new Error("No data in the response");
      }

      if (!res.ok || !result.success) {
        throw new Error(result.message || "An unexpected error occured");
      }

      if (!result.data) {
        throw new Error("No data in the response");
      }

      setData(result.data);
      setLoading(false);
    } catch (e) {
      toast.error(e.message || "An unexpected error occured");
      setLoading(false);
    }
  };

  const approve = async (userid, requstid, planid) => {
    try {
      if (!window.confirm("Are you sure you want to approve this request?")) {
        return;
      }
      const res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/request/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid, requstid, planid }),
        }
      );
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || "Unexpected error on API Endpoint");
        return;
      }
      load();
    } catch (e) {
      toast.error(e.message || "An unexpected error occured");
    }
  };
  const reject = async (id, userid) => {
    try {
      if (!window.confirm("Are you sure you want to reject this request?")) {
        return;
      }
      const res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/request/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            userid,
          }),
        }
      );
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message || "Unexpected error on API Endpoint");
        return;
      }
      load();
    } catch (e) {
      toast.error(e.message || "An unexpected error occured");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="PendingPage">
        <MenuOpenIcon
          className="DashboardMenuIcon"
          style={{
            margin: "0",
            padding: "0",
            transform: "rotate(180deg)",
            color: "black",
            fontSize: "2.5rem",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            show();
          }}
        />
        <h1
          className="usersheading"
          onClick={() => {
            console.log(data);
          }}
        >
          Pending Plans
        </h1>
        <div className="plansDiv">
          {loading ? (
            <h1>Loading...</h1>
          ) : data.length > 0 ? (
            data.map((e, i) => (
              <div className="plan" key={i}>
                <p>
                  <span>Username :</span> {e.usersname}
                </p>
                <p>
                  <span>Plan :</span> {e.planname}
                </p>
                <p>
                  <span>Price :</span> {e.planprice}pkr
                </p>
                <p>
                  <span>By :</span> {e.method}
                </p>
                <p>
                  <span>Account Number :</span> {e.accountnum}
                </p>
                <p>
                  <span>Transaction ID :</span> {e.transactionid}
                </p>
                <p>
                  <span>Date :</span> {formatDate(e.date)}
                </p>
                <p
                  className="proofofpayment"
                  onClick={() => {
                    window.open(e.proof, "_blank");
                  }}
                >
                  Proof of payment
                </p>
                <div className="buttons">
                  <button onClick={() => approve(e.usersid, e._id, e.planid)}>
                    Approve
                  </button>
                  <button onClick={() => reject(e._id, e.usersid)}>
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Pending requests</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pending;
