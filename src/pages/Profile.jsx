import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pfp from "../images/pfp.jpg";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SchoolIcon from "@mui/icons-material/School";

const Profile = () => {
  const navigate = useNavigate();

  //
  // const userid = localStorage.getItem("AUTHUSERUNIQUEID");

  const name = localStorage.getItem("LCBPNAME");
  const username = localStorage.getItem("LCBPUSERNAME");
  const email = localStorage.getItem("LCBPEMAIL");
  const phone = localStorage.getItem("LCBPPHONE");

  return (
    <div className="dahboardPage">
      <div className="Back" onClick={() => navigate("/")}>
        {" "}
        <ArrowBackIcon />
      </div>
      <div className="info">
        <div className="profileImageContainer">
          <img src={localStorage.getItem("LCBPIMAGEURL")} alt="profile image" />
        </div>
        <div className="textContainer">
          <h1>{name}</h1>
          <p>{username}</p>
          <p>{email}</p>
          <p>{phone}</p>
          <button
            className="logout"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
          <div className="editIcon" onClick={() => navigate("/updateprofile")}>
            <EditIcon />
          </div>
        </div>
      </div>
      <div className="profileoptions">
        <div className="profileoption" onClick={() => navigate("/referrals")}>
          <PersonIcon />
          <h1>Referrals</h1>
        </div>
        <div
          className="profileoption"
          onClick={() => navigate("/basicearning")}
        >
          <LocalAtmIcon />
          <h1>Basic Earning</h1>
        </div>
        <div className="profileoption" onClick={() => navigate("/mygigs")}>
          <MonetizationOnIcon />
          <h1>Professional Earning</h1>
        </div>
        <div
          className="profileoption"
          onClick={() => {
            window.open("https://lcbp-community.vercel.app", "_blank");
          }}
        >
          <SchoolIcon />
          <h1>Learn Skills</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
