import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./profile.css";

const AdminPass = () => {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <div>
      {validated || localStorage.getItem("ISLCBPADMINAPPROVES") === "true" ? (
        <Outlet />
      ) : (
        <div className="validateUser">
          <div className="passworddiv">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => {
                if (password === "lcbpbusinessplanpass") {
                  setValidated(true);
                  localStorage.setItem("ISLCBPADMINAPPROVES", true);
                } else {
                  alert("Invalid Password");
                }
              }}
            >
              Validate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPass;
