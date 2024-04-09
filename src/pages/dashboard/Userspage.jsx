import React, { useEffect, useState } from "react";
import "./users.css";
import { toast } from "sonner";
import pfp from "./pfp.jpg";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img1 from "./img1.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Users = ({ show, scroll }) => {
  const [details, setDetails] = useState({});
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);
      let res = await fetch(`https://lcbp-earn-api.vercel.app/api/auth/load`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skip: data.length,
        }),
      });

      let result = await res?.json();

      if (!res.ok || res.success === false) {
        toast.error(result.message);
        setLoading(false);
        return;
      }

      if (!result.data && data.length === 0) {
        toast.error("No users found");
        setLoading(false);
        return;
      } else if (result.data.length === 0 && data.length !== 0) {
        toast.success("No more users found");
        setLoading(false);
        return;
      }
      setData((prev) => [...prev, ...result.data]);
      setLoading(false);
    } catch (e) {
      toast.error("An unexpected error occured");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const searchuser = async () => {
    try {
      setSearchLoading(true);
      const respose = await fetch(
        `https://lcbp-earn-api.vercel.app/api/auth/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: search,
          }),
        }
      );
      const result = await respose.json();
      if (!result.success) {
        toast.error(result.message);
        setSearchLoading(false);
        return;
      } else {
        if (!result.user) {
          toast.error("No user found");
          setSearchLoading(false);
          return;
        } else {
          setDetails(result.user);
          setSearchLoading(false);
        }
      }
    } catch (e) {
      toast.error("An unexpected error occured");
      setSearchLoading(false);
    }
  };

  return (
    <div>
      {details._id ? (
        <>
          <ArrowBackIcon
            style={{
              marginBottom: "10px",
              fontSize: "2.5rem",
              cursor: "pointer",
              color: "rgb(90, 90, 90)",
            }}
            onClick={() => {
              setDetails(false);
              scroll();
            }}
          />
          <div className="userDetailsImage">
            <img
              src={
                details.imageurl ||
                "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
              }
            />
          </div>
          <div className="text">
            <h1 className="userDetailsHeading">Name : {details.name || "-"}</h1>
            <p className="userDetailsEmail">Email : {details.email || "-"}</p>
            <p className="userDetailsEmail">
              Username : {details.username || "-"}
            </p>
            <p className="userDetailsEmail">Phone : {details.phone || "-"}</p>
            <p className="userDetailsEmail">
              Balance : {details.balance || "-"}
            </p>
            <p className="userDetailsEmail">
              All time earned : {details.alltimeearned || "-"}
            </p>
            <p className="userDetailsEmail">
              Withdrawn : {details.withdrawn || "-"}
            </p>
            <p className="userDetailsEmail">
              Earned by Reffers : {details.earnedbyreffers || "-"}
            </p>
            <p className="userDetailsEmail">Reffer : {details.reffer || "-"}</p>
            <p className="userDetailsEmail">
              Chain Two : {details.chaintwo || "-"}
            </p>
            <p className="userDetailsEmail">
              Chain Three : {details.chainthree || "-"}
            </p>
            <p className="userDetailsEmail">
              Chain Four : {details.chainfour || "-"}
            </p>
            <p className="userDetailsEmail">
              Chain Five : {details.chainfive || "-"}
            </p>
            <div className="userdetailbuttons">
              <button
                className="userdetailbutton"
                onClick={() => {
                  navigate(`/edituserprofileinfo/${details._id}`);
                }}
              >
                Edit
              </button>
              <button
                className="userdetailbutton"
                onClick={() => {
                  toast.success("Feature coming soon");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
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
          <div className="searchdiv">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setSearch(e.target.value)}
            />
            {searchLoading ? (
              <button
                style={{
                  cursor: "pointer",
                }}
              >
                Locding...
              </button>
            ) : (
              <button
                onClick={() => {
                  searchuser();
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            )}
          </div>
          <h1 className="usersheading">Users</h1>
          <div className="headings">
            <h3 className="image">Image</h3>
            <h3 className="name">Name</h3>
            <h3 className="email">Username</h3>
            <h3 className="ordered">Email</h3>
          </div>
          {data?.map((e, index) => {
            return (
              <div
                className="usercard"
                onClick={() => {
                  setDetails(e);
                  scroll();
                }}
                title="Click to see more"
                key={index}
              >
                <div className="userimage">
                  <img
                    src={
                      e.imageurl ||
                      "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                    }
                  />
                </div>
                <p className="usersname">{e.name}</p>
                <p className="useremail" style={{ color: "rgb(90, 90, 90)" }}>
                  {e.username}
                </p>
                <p className="ordered" style={{ color: "rgb(90, 90, 90)" }}>
                  {e.email}
                </p>
              </div>
            );
          })}
          {!loading && data.length !== 0 && (
            <button
              className="loadmore"
              onClick={load}
              style={{ margin: "30px auto" }}
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
