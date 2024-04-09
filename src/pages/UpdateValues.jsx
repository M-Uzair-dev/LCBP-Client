import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UpdateValues = () => {
  const [pass, setPass] = useState("");
  const [val, setVal] = useState("");
  const [allowed, setAllowed] = useState(false);

  const navigate = useNavigate();
  function isValidNumber(inputString) {
    return /^\d+$/.test(inputString);
  }
  const update = async () => {
    try {
      if (!isValidNumber(val)) {
        toast.error("Value can only contain numbers");
        return;
      }
      // First confirm if the user wants to continue through browser confirm
      if (!window.confirm("Are you sure you want to update values?")) return;

      const res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/plan/updatevalue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pkrvalue: val,
          }),
        }
      );

      const result = await res.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      } else {
        toast.success("Operation Completed Successfully");
        navigate("/");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: "20px",
      }}
    >
      {allowed ? (
        <>
          <p>Enter value of 1 pkr</p>
          <input
            placeholder="Enter value of 1 dollar in pkr"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button
            onClick={() => {
              update();
            }}
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <p>Enter Password</p>
          <input
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            onClick={() => {
              pass === "lcbpbusinessplanpass"
                ? setAllowed(true)
                : toast.error("Invalid Password");
            }}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateValues;
