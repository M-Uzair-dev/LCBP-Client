import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  let [active, setActive] = useState(true);
  let [active2, setActive2] = useState(false);
  const userID = localStorage.getItem("AUTHUSERUNIQUEID");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let [data, setData] = useState({
    name: "",
    email: "",
    username: "",
    number: 0,
    password: "",
    confirmPassword: "",
    reffer: "@",
  });

  let { id } = useParams();

  useEffect(() => {
    if (userID) {
      navigate("/");
    }
  });

  const login = async () => {
    try {
      setLoading(true);
      if (data.email && data.password) {
        let res = await fetch(
          `https://lcbp-earn-api.vercel.app/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          }
        );

        let result = await res.json();

        if (!res.ok || res.success === false) {
          toast.error(result.message);
          setLoading(false);
          return;
        }
        toast.success("Logged in successfully");
        console.log(result);
        localStorage.setItem("AUTHUSERUNIQUEID", result.user._id);
        localStorage.setItem("LCBPUSERNAME", result.user.username);
        localStorage.setItem("LCBPNAME", result.user.name);
        localStorage.setItem("LCBPPHONE", result.user.phone);
        localStorage.setItem("LCBPEMAIL", result.user.email);
        localStorage.setItem("LCBPIMAGEURL", result.user.imageurl);
        navigate("/profile");
        setLoading(false);
      } else {
        toast.error("Please fill all the fields");
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9]+$/;

    return regex.test(username);
  }
  function isValidNumber(inputString) {
    return /^\d+$/.test(inputString);
  }
  function hasEmail(text) {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    return emailPattern.test(text);
  }
  const signup = async () => {
    try {
      if (
        data.name &&
        data.email &&
        data.username &&
        data.number &&
        data.password &&
        data.confirmPassword &&
        data.reffer
      ) {
        if (data.password === data.confirmPassword) {
          if (!isValidUsername(data.username)) {
            toast.error("Username can only contain letters and numbers");
            return;
          } else if (!isValidNumber(data.number)) {
            toast.error(`Phone number can only contain numbers`);
            return;
          } else if (data.number.length < 11) {
            toast.error("Phone number must be 11 digits");
            return;
          } else if (!hasEmail(data.email)) {
            toast.error("Invalid Email");
            return;
          }
          setLoading(true);

          let res = await fetch(
            `https://lcbp-earn-api.vercel.app/api/auth/signup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: data.name,
                email: data.email,
                username: `@${data.username}`,
                phone: data.number,
                password: data.password,
                reffer: id || data.reffer,
              }),
            }
          );

          let result = await res.json();

          if (!res.ok || res.success === false) {
            toast.error(result.message);
            setLoading(false);
            return;
          }
          console.log(result);
          toast.success("Account created successfully");
          localStorage.setItem("AUTHUSERUNIQUEID", result.user._id);
          localStorage.setItem("LCBPUSERNAME", result.user.username);
          localStorage.setItem("LCBPNAME", result.user.name);
          localStorage.setItem("LCBPPHONE", result.user.phone);
          localStorage.setItem("LCBPEMAIL", result.user.email);
          localStorage.setItem(
            "LCBPIMAGEURL",
            "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
          );
          navigate("/profile");
          setLoading(false);
        } else {
          toast.error("Passwords do not match");
          setLoading(false);
        }
      } else {
        toast.error("Please fill all the fields");
        console.log(data);
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  return (
    <div className="loginPage">
      <div className="Back" onClick={() => navigate("/")}>
        {" "}
        <ArrowBackIcon />
      </div>
      <div className={active ? "container" : "container active"} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Sign up</h1>
            <span>Create an LCBP Account</span>
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Username"
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <input
              type="text"
              className="inputNumber"
              placeholder="Phone Number"
              value={data.number}
              onChange={(e) => setData({ ...data, number: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Reffer code"
              value={data.reffer}
              onChange={(e) => setData({ ...data, reffer: e.target.value })}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                signup();
              }}
            >
              {loading ? (
                <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>{active2 ? "Sign up" : "Log In"}</h1>

            <span>
              {active2
                ? "Create an LCBP Account"
                : "Enter your username and password"}
            </span>
            {active2 ? (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="inputNumber"
                  value={data.number}
                  onChange={(e) => setData({ ...data, number: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Reffer code"
                  value={data.reffer}
                  onChange={(e) => setData({ ...data, reffer: e.target.value })}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                {
                  active2 ? signup() : login();
                }
              }}
            >
              {loading ? (
                <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : active2 ? (
                "Sign Up"
              ) : (
                "Log In"
              )}
            </button>
            {active2 ? (
              <p className="ratherText">
                Already have an account?{" "}
                <a
                  onClick={() => setActive2(false)}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Log in
                </a>
              </p>
            ) : (
              <p className="ratherText">
                Don't have an account?{" "}
                <a
                  onClick={() => setActive2(true)}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </a>
              </p>
            )}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Hello, Friend!</h1>
              <p>
                Sign up to access all the features of LCBP's learning and
                earning services.
              </p>
              <button
                className="hidden"
                id="login"
                onClick={() => setActive(true)}
              >
                Log in
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>
                Log in to access all the features of LCBP's learning and earning
                services.
              </p>
              <button
                className="hidden"
                id="register"
                onClick={() => setActive(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
