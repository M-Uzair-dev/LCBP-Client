import React, { useState } from "react";
import box from "../images/box.png";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Box = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [timeState, setTimeState] = useState("");
  const navigate = useNavigate();

  const open = async () => {
    try {
      if (!user._id) {
        toast.error("Your plan is pending at the moment");
        return;
      }
      setLoading(true);
      let res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/auth/openbox`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: user._id,
          }),
        }
      );

      let result = await res.json();
      console.log(result);

      if (!res.ok || res.success === false) {
        toast.error(result.message);
        setLoading(false);
        return;
      }
      if (result.timeRemaining) {
        setTimeState(result.RemainingTime);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        toast.success(result.message);
        navigate("/");
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  function formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      if (minutes < 60) {
        return `${minutes} minute${
          minutes !== 1 ? "s" : ""
        } and ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} hour${
          hours !== 1 ? "s" : ""
        } ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
      }
    }
  }

  return (
    <div className="boxPage">
      <img className="boxImage" src={box} alt="box" />
      {timeState ? (
        <p className="message">
          You can open it again in <span>{formatTime(timeState)}</span>
        </p>
      ) : null}

      {loading ? (
        <button className="open">Loading...</button>
      ) : (
        <button className="open" onClick={open}>
          Open
        </button>
      )}
    </div>
  );
};

export default Box;
