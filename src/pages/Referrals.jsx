import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./referrals.css";
import { TailSpin } from "react-loader-spinner";

const Referrals = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("LCBPUSERNAME");

  const [referrs, setReferrs] = React.useState(0);
  const [chainTwo, setChainTwo] = React.useState(0);
  const [chainThree, setChainThree] = React.useState(0);
  const [chainFour, setChainFour] = React.useState(0);
  const [chainFive, setChainFive] = React.useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) {
          navigate("/login");
        } else {
          setLoading(true);
          const res = await fetch(
            `https://lcbp-earn-api.vercel.app/api/auth/getReffers`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
              }),
            }
          );

          const result = await res.json();
          if (!res.ok || result.success === false) {
            toast.error(result.message);

            localStorage.clear();
            navigate("/login");
            setLoading(false);
            return;
          } else {
            console.log(result);
            let { referrs, chaintwo, chainthree, chainfour, chainfive } =
              result;

            setReferrs(referrs);
            setChainTwo(chaintwo);
            setChainThree(chainthree);
            setChainFour(chainfour);
            setChainFive(chainfive);
            setLoading(false);
          }
        }
      } catch (e) {
        toast.error(e.message);
        localStorage.clear();
        navigate("/login");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="referralsPage">
      <div className="Back" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <h1 className="MainHeading">Referrals</h1>
      <div className="link">
        <p>
          Your referral link :{" "}
          <span
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:5173/login/${username}`
              );
              toast.success("copied to clipboard");
            }}
          >
            http://localhost:5173/login/{username}
          </span>
        </p>
      </div>
      <div className="profileoptions">
        <div className="profileoption" onClick={() => navigate("/referrals")}>
          <h1 className="numbers">
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#000000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              referrs
            )}
          </h1>
          <h1>Direct Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#000000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              chainTwo
            )}
          </h1>
          <h1>Second chain Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#000000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              chainThree
            )}
          </h1>
          <h1>Third Chain Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#000000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              chainFour
            )}
          </h1>
          <h1>Fourth chain Referrals</h1>
        </div>
        <div className="profileoption">
          <h1 className="numbers">
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#000000"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              chainFive
            )}
          </h1>
          <h1>Fifth Chain Referrals</h1>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
