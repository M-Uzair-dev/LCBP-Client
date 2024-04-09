import React, { useEffect, useState } from "react";
import "./freelancers.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "../images/pfp.jpg";
import { toast } from "sonner";

const Freelancers = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   window.scroll(0, 0);
  // });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const load = async () => {
    try {
      setLoading(true);
      let res = await fetch(`https://lcbp-earn-api.vercel.app/api/gig/load`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skip: data.length,
        }),
      });

      let result = await res.json();

      if (!res.ok || res.success === false) {
        toast.error(result.message);
        setLoading(false);
        return;
      }
      if (!result.data && data.length === 0) {
        toast.error("No freelancers found");
        setLoading(false);
        return;
      } else if (!result.data && data.length !== 0) {
        toast.success("No more freelancers found");
        setLoading(false);
        return;
      }
      setData((prev) => [...prev, ...result.data]);
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="lcfreelancers">
      <div className="Back" onClick={() => navigate(-1)}>
        {" "}
        <ArrowBackIcon />
      </div>
      <h1 className="lcfreelancersheading">LC - Freelancers</h1>
      {/* <div className="search">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div> */}
      <div className="cards">
        {loading && data.length === 0 ? (
          <h1 className="loading">loading...</h1>
        ) : (
          data?.map((item) => (
            <div
              className="card"
              key={item._id}
              onClick={() => navigate(`/gigdetails/${item._id}`)}
            >
              <div className="imageDiv">
                <img src={item.imageurl} alt="Image" />
              </div>
              <div className="textDiv">
                <div className="infoDiv">
                  <img
                    src={
                      item.byimage ||
                      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                    }
                    alt="Image"
                  />
                  <p>{item.byname}</p>
                </div>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))
        )}
      </div>
      {!loading && data.length === 0 && (
        <h1 className="loading">No freelancers found</h1>
      )}
      {!loading && data.length !== 0 && (
        <button className="loadmore" onClick={load}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Freelancers;
