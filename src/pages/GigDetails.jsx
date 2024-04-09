import React, { useEffect, useState } from "react";
import "./gigdetails.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../images/pfp.jpg";
import { toast } from "sonner";

const GigDetails = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { gigid } = useParams();
  useEffect(() => {
    const load = async () => {
      try {
        if (!gigid) {
          navigate("/");
          return;
        }
        setLoading(true);
        const res = await fetch(
          `https://lcbp-earn-api.vercel.app/api/gig/getgigdetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gigid,
            }),
          }
        );
        const result = await res.json();
        if (!result.success) {
          toast.error(result.message);
          navigate("/");
          setLoading(false);
          return;
        }
        setData(result.gig);
        console.log(result.gig);
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="gigDetailsPage">
      <div className="Back" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <h1>Gig Details</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="gigdetailswrapper">
            <img src={data.imageurl} alt="image" className="gigImage" />
            <div className="profileInfo">
              <img
                src={
                  data.byimage ||
                  "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                }
                alt="image"
              />
              <h1>{data.byname}</h1>
            </div>
            <div className="price">
              <h1>${data.price}</h1>
            </div>
            <div className="gigdetailstext">
              <h2>{data.title}</h2>
              <h5>{data.description}</h5>
              <div className="personalDetails">
                <h1>Personal Details : </h1>
                <h5>
                  Name : <span>{data.name}</span>
                </h5>
                <h5 className="aboutText">
                  About : <span>{data.about}</span>
                </h5>
                <h5>
                  From : <span>{data.from}</span>
                </h5>
                <h5>
                  Time availiblity : <span>{data.time}</span>
                </h5>
                <h5>
                  Gender : <span>{data.gender}</span>
                </h5>
                <h5>
                  Age : <span>{data.age}</span>
                </h5>
              </div>
              <div className="experienceDetails">
                <h1>Experience Details : </h1>
                <h5>
                  Field : <span>{data.field}</span>
                </h5>
                <h5>
                  Experience : <span>{data.experience}</span>
                </h5>
              </div>
              <div className="contactDetails">
                <h1>Contact Details : </h1>
                <h5>
                  Email : <span>admin.info@lcbpbusinessplan.com</span>
                </h5>
                <h5>
                  Phone : <span>+92 326 6696722</span>
                </h5>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GigDetails;
