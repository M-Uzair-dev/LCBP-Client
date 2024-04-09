import React, { useEffect, useRef, useState } from "react";
import "./dashboard.css";
import logo from "../../images/logo.png";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Users from "./Userspage";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import Pending from "./Pending";
import Withdwalreq from "./Withdwalreq";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { toast } from "sonner";

const Dashboard = () => {
  const [showdropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState("Today");
  const [showSidebar, setShowSidebar] = useState(false);

  const [page, setPage] = useState("stats");
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const scrollableDivRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    scrollableDivRef.current?.scrollTo({ top: 0 });
  };
  const loadStats = async () => {
    setLoading(true);
    const response = await fetch(
      `https://lcbp-earn-api.vercel.app/api/auth/getstats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response?.json();
    if (!res.success) {
      console.error(res);
      toast.error(res.message || "An unexpected error occured");
      setLoading(false);
      return;
    }
    setStats(res.stats);
    console.log(res.stats);
    setLoading(false);
    try {
    } catch (e) {
      toast.error("An unexpected error occured");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);
  function formatNumber(num) {
    // Convert the number to a string with at most 2 decimal places
    let formattedNum = num.toFixed(2);

    // Remove trailing zeros
    formattedNum = formattedNum.replace(/\.?0*$/, "");

    return formattedNum;
  }
  return (
    <>
      <div className="dashboard">
        <div
          className={
            showSidebar ? "dashboardsidebar showsidebar" : "dashboardsidebar"
          }
        >
          <div className="sidebarCloseIconWrapper">
            <MenuOpenIcon
              className="sidebarCloseIcon"
              onClick={() => {
                setShowSidebar(false);
              }}
            />
          </div>
          <div className="dashboardlogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="dashboardmenu">
            <ul>
              <li
                className="dashboardbuttons dashboardbutton1"
                onClick={() => {
                  setPage("stats");
                  setShowSidebar(false);
                }}
              >
                <a>
                  {" "}
                  <QueryStatsIcon /> Stats
                </a>
              </li>
              <li
                className="dashboardbuttons dashboardbutton2"
                onClick={() => {
                  setPage("users");
                  setShowSidebar(false);
                }}
              >
                <a>
                  <PeopleAltIcon /> Users
                </a>
              </li>
              <li
                className="dashboardbuttons dashboardbutton3"
                onClick={() => {
                  setPage("products");
                  setShowSidebar(false);
                }}
              >
                <a>
                  <InventoryIcon /> Plans
                </a>
              </li>

              <li
                className="dashboardbuttons dashboardbutton5"
                onClick={() => {
                  setPage("pending");
                  setShowSidebar(false);
                }}
              >
                <a>
                  <TaskAltIcon />
                  Pending
                </a>
              </li>
              <li
                className="dashboardbuttons dashboardbutton7"
                onClick={() => {
                  setPage("withdraw");
                  setShowSidebar(false);
                }}
              >
                <a>
                  <CurrencyExchangeIcon />
                  Withdraws
                </a>
              </li>
              <li
                className="dashboardbuttons dashboardbutton6"
                onClick={() => {
                  navigate("/");
                }}
              >
                <a>
                  <LogoutIcon /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboardmaincontainer">
          <div className="dashboardwrapper" ref={scrollableDivRef}>
            {page === "stats" ? (
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
                    setShowSidebar(true);
                  }}
                />
                <h1 className="dash">Dashboard</h1>
                {/* <div className="dashboarddropdown">
                  <div
                    className="selected"
                    onClick={() => {
                      setShowDropdown((prev) => !prev);
                    }}
                  >
                    <p>
                      {selected}{" "}
                      <KeyboardArrowDownIcon
                        style={
                          showdropdown
                            ? { transform: "rotate(180deg)" }
                            : { transform: "rotate(0deg)" }
                        }
                      />
                    </p>
                  </div>
                  <div
                    className="dashboarddrop"
                    style={
                      showdropdown ? { display: "block" } : { display: "none" }
                    }
                  >
                    <p
                      onClick={() => {
                        setShowDropdown(false);
                        setSelected("Today");
                      }}
                    >
                      Today
                    </p>
                    <p
                      onClick={() => {
                        setShowDropdown(false);
                        setSelected("This week");
                      }}
                    >
                      This week
                    </p>
                    <p
                      onClick={() => {
                        setShowDropdown(false);
                        setSelected("This month");
                      }}
                    >
                      This month
                    </p>
                    <p
                      onClick={() => {
                        setShowDropdown(false);
                        setSelected("This year");
                      }}
                    >
                      This year
                    </p>
                  </div>
                </div> */}
                <div className="dashboardboxes">
                  <div className="dashboardcontainer container1">
                    <p>Users</p>
                    <h1>{stats.users ? formatNumber(stats.users) : 0}</h1>
                  </div>
                  <div className="dashboardcontainer container2">
                    <p>Plans</p>
                    <h1>{stats.plans ? formatNumber(stats.plans) : 0}</h1>
                  </div>
                  <div className="dashboardcontainer container3">
                    <p>Gigs</p>
                    <h1>{stats.gigs ? formatNumber(stats.gigs) : 0}</h1>
                  </div>
                  <div className="dashboardcontainer container4">
                    <p>Plans sold</p>
                    <h1>
                      {stats.plansSold ? formatNumber(stats.plansSold) : 0}
                    </h1>
                  </div>
                  <div className="dashboardcontainer container5">
                    <p>Pending</p>
                    <h1>
                      {stats.plansPending
                        ? formatNumber(stats.plansPending)
                        : 0}
                    </h1>
                  </div>
                  <div className="dashboardcontainer container6">
                    <p>Profit</p>
                    <h1>{stats.profit ? formatNumber(stats.profit) : 0}</h1>
                  </div>
                  <div className="dashboardcontainer container7">
                    <p>Paid</p>
                    <h1>{stats.paid ? formatNumber(stats.paid) : 0}</h1>
                  </div>
                </div>
                <div className="charts">
                  <div className="chart1">
                    <h1 className="chartheading">Visits</h1>
                    <LineChart
                      data={{
                        "2023-05-1": 19,
                        "2023-05-2": 32,
                        "2023-05-3": 8,
                        "2023-05-4": 45,
                        "2023-05-5": 34,
                        "2023-05-6": 54,
                        "2023-05-7": 23,
                        "2023-05-8": 10,
                        "2023-05-9": 65,
                        "2023-05-10": 34,
                        "2023-05-11": 24,
                        "2023-05-12": 34,
                        "2023-05-13": 65,
                        "2023-05-14": 27,
                        "2023-05-15": 29,
                        "2023-05-16": 26,
                        "2023-05-17": 35,
                        "2023-05-18": 65,
                        "2023-05-19": 34,
                        "2023-05-20": 53,
                        "2023-05-21": 25,
                        "2023-05-22": 28,
                        "2023-05-23": 13,
                        "2023-05-24": 44,
                        "2023-05-25": 37,
                        "2023-05-26": 23,
                        "2023-05-27": 43,
                        "2023-05-28": 21,
                        "2023-05-29": 30,
                        "2023-05-30": 27,
                      }}
                    />
                  </div>
                  <div className="chart2">
                    <h1 className="chartheading chartheading2">Orders</h1>
                    <LineChart
                      data={{
                        "2023-05-1": 4,
                        "2023-05-2": 6,
                        "2023-05-3": 12,
                        "2023-05-4": 8,
                        "2023-05-5": 10,
                        "2023-05-6": 6,
                        "2023-05-7": 0,
                        "2023-05-8": 0,
                        "2023-05-9": 7,
                        "2023-05-10": 5,
                        "2023-05-11": 9,
                        "2023-05-12": 3,
                        "2023-05-13": 8,
                        "2023-05-14": 11,
                        "2023-05-15": 5,
                        "2023-05-16": 6,
                        "2023-05-17": 3,
                        "2023-05-18": 5,
                        "2023-05-19": 4,
                        "2023-05-20": 5,
                        "2023-05-21": 2,
                        "2023-05-22": 8,
                        "2023-05-23": 1,
                        "2023-05-24": 4,
                        "2023-05-25": 7,
                        "2023-05-26": 3,
                        "2023-05-27": 4,
                        "2023-05-28": 2,
                        "2023-05-29": 0,
                        "2023-05-30": 7,
                      }}
                    />
                  </div>
                </div>
              </>
            ) : page === "users" ? (
              <>
                <Users
                  show={() => {
                    setShowSidebar(true);
                  }}
                  scroll={() => {
                    scrollToTop();
                  }}
                />
              </>
            ) : page === "products" ? (
              <>
                <Products
                  show={() => {
                    setShowSidebar(true);
                  }}
                />
              </>
            ) : page === "pending" ? (
              <>
                <Pending
                  show={() => {
                    setShowSidebar(true);
                  }}
                />
              </>
            ) : page === "withdraw" ? (
              <>
                <Withdwalreq
                  show={() => {
                    setShowSidebar(true);
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
