import React, { useEffect, useState } from "react";
import "./freelancers.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../images/pfp.jpg";
import { toast } from "sonner";

const MyGigs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
  });
  const load = async () => {
    try {
      const res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/gig/getgigs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("AUTHUSERUNIQUEID"),
          }),
        }
      );

      const result = await res.json();
      setData(result.gigs);
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const deletegig = async () => {
    try {
      const res = await fetch(
        `https://lcbp-earn-api.vercel.app/api/gig/deletegig`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: showConfirmation,
          }),
        }
      );
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message);
        setShowConfirmation("");
      } else {
        toast.success("Gig deleted successfully");
        setShowConfirmation("");
        load();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="lcfreelancers">
      <div className="Back" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <h1 className="lcfreelancersheading">Your GIGs</h1>

      <div className="cards" style={{ marginBottom: "50px" }}>
        <div className="card addgig" onClick={() => navigate("/addgig")}>
          <h2>+</h2>
        </div>
        {data?.map((gig, index) => (
          <div
            className="card"
            key={index}
            onClick={() => {
              console.log(gig);
              navigate(`/gigdetails/${gig._id}`);
            }}
            style={
              showConfirmation === ""
                ? { pointerEvents: "auto" }
                : { pointerEvents: "none" }
            }
          >
            <div className="buttonsincard" style={{ zIndex: 5 }}>
              <button
                className="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/editgig/${gig._id}`);
                }}
              >
                EDIT
              </button>
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();

                  setShowConfirmation(gig._id);
                }}
              >
                DELETE
              </button>
            </div>
            <div className="imageDiv">
              <img src={gig.imageurl} alt="Image" />
            </div>
            <div className="textDiv">
              <div className="infoDiv">
                <img
                  src={
                    gig.byimage ||
                    "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                  }
                  alt="Image"
                />
                <p>{gig.byname}</p>
              </div>
              <h3>{gig.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div
        className="confirm"
        style={{ display: showConfirmation === "" ? "none" : "flex" }}
      >
        <h1>Are you sure you want to delete this gig?</h1>
        <div className="innerConfirm">
          <button onClick={deletegig}>Yes</button>
          <button onClick={() => setShowConfirmation("")}>No</button>
        </div>
      </div>
    </div>
  );
};

export default MyGigs;
