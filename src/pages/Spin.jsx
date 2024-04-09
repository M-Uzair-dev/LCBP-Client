import React, { useState } from "react";
import "./spin.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Spin = ({ user }) => {
  const navigate = useNavigate();
  const [spin, setSpin] = useState(0);
  const [loading, setLoading] = useState(false);
  const getspinvalue = async () => {
    try {
      if (!user._id) {
        toast.error("Your plan is pending at the moment");
        return;
      }
      setLoading(true);
      let res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/auth/openspin`,
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
        toast.error(result.timeMessage);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        setSpin(result.prize);
        setTimeout(() => {
          toast.success(`You won ${result.prize} from Spin.`);
          navigate("/userdashboard");
        }, 6000);
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  return (
    <div className="spindiv">
      {loading ? (
        <button id="spin">Wait</button>
      ) : (
        <button id="spin" onClick={getspinvalue}>
          Spin
        </button>
      )}

      <span class="arrow"></span>
      <div
        className="container"
        style={
          spin === 0.05
            ? { rotate: "360deg" }
            : spin === 0.1
            ? { rotate: "500deg" }
            : spin === 0.15
            ? { rotate: "800deg" }
            : { rotate: "770deg" }
        }
      >
        <div class="one">0.05</div>
        <div class="two">0.1</div>
        <div class="three">0.15</div>
        <div class="four">0</div>
        <div class="five">0.05</div>
        <div class="six">0.1</div>
        <div class="seven">0.15</div>
        <div
          class="eight"
          onClick={() => {
            console.log(spin);
          }}
        >
          0
        </div>
      </div>
    </div>
  );
};

export default Spin;
