import React, { useEffect, useState } from "react";
import "./updateProfile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("AUTHUSERUNIQUEID");

  const [selectedImage, setSelectedImage] = useState(null);

  const [data, setData] = useState({
    name: "" || localStorage.getItem("LCBPNAME"),
    email: "" || localStorage.getItem("LCBPEMAIL"),
    number: "" || localStorage.getItem("LCBPPHONE"),
    password: "",
  });
  function isValidNumber(inputString) {
    return /^\d+$/.test(inputString);
  }
  function hasEmail(text) {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    return emailPattern.test(text);
  }

  const updateProfile = async () => {
    if (!id || !apiUrl) {
      toast.error("Could not update profile: missing id or API URL");
      console.error({ id, apiUrl });
      return;
    }

    if (!data.name || !data.email || !data.number) {
      toast.error("Please fill all fields");
      return;
    }
    if (!isValidNumber(data.number)) {
      toast.error(`Phone number can only contain numbers`);
      return;
    } else if (data.number.length < 11) {
      toast.error("Phone number must be 11 digits");
      return;
    } else if (!hasEmail(data.email)) {
      toast.error("Invalid Email");
      return;
    }
    if (
      selectedImage &&
      selectedImage.type !== "image/jpeg" &&
      selectedImage.type !== "image/png" &&
      selectedImage.type !== "image/jpg"
    ) {
      toast.error(
        "Invalid image format. Only JPEG, PNG, and JPG formats are allowed."
      );
      return;
    }
    try {
      if (selectedImage) {
        console.log("InSelectedImage");
        let image = new FormData();
        image.append("file", selectedImage);
        image.append("cloud_name", "dbntul88v");
        image.append("upload_preset", "pvkxzd6k");
        const url = "https://api.cloudinary.com/v1_1/dbntul88v/image/upload";
        console.log("Before req");
        const resp = await fetch(url, {
          method: "POST",
          body: image,
        });
        console.log("after req");

        var data1 = await resp.json();
        if (!data1) {
          toast.error("Error with image");
          return;
        }
        const response = await fetch(
          `https://lcbp-earn-api.vercel.app/api/auth/updateprofile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              name: data.name,
              email: data.email,
              number: data.number,
              password: data.password,
              imageurl: data1.url,
            }),
          }
        );

        const result = await response.json();
        console.log(result);

        if (!response.ok || !result || result.success === false) {
          toast.error(result?.message || "Could not update profile");
          console.error({ result, response });
          return;
        }

        toast.success(result.message);

        localStorage.setItem("LCBPNAME", result.user.name);
        localStorage.setItem("LCBPEMAIL", result.user.email);
        localStorage.setItem("LCBPPHONE", result.user.phone);
        localStorage.setItem("LCBPIMAGEURL", result.user.imageurl);
        localStorage.setItem("LCBPPASSWORD", result.user.password);

        navigate("/profile");
      } else {
        const response = await fetch(
          `https://lcbp-earn-api.vercel.app/api/auth/updateprofile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              name: data.name,
              email: data.email,
              number: data.number,
              password: data.password,
            }),
          }
        );

        const result = await response.json();
        console.log(result);

        if (!response.ok || !result || result.success === false) {
          toast.error(result?.message || "Could not update profile");
          console.error({ result, response });
          return;
        }
        console.log(result);

        toast.success(result.message);

        localStorage.setItem("LCBPNAME", result.user.name);
        localStorage.setItem("LCBPEMAIL", result.user.email);
        localStorage.setItem("LCBPPHONE", result.user.phone);
        localStorage.setItem("LCBPPASSWORD", result.user.password);

        navigate("/profile");
      }
    } catch (error) {
      toast.error(error?.message || "Could not update profile");
      console.error({ error });
    }
  };

  return (
    <div className="updateProfilePage">
      <div className="Back" onClick={() => navigate(-1)}>
        {" "}
        <ArrowBackIcon />
      </div>
      <h1>Update Profile</h1>
      <label className="updateProfileLabel" htmlFor="image">
        Change Image
      </label>
      <input
        id="image"
        type="file"
        accept="image/png image/jpeg image/jpg"
        onChange={(e) => {
          setSelectedImage(e.target.files[0]);
        }}
      />
      <label className="updateProfileLabel" htmlFor="name">
        Change Name
      </label>
      <input
        className="updateProfileInput"
        placeholder="Name"
        id="name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
        value={data.name}
      />
      <label className="updateProfileLabel" htmlFor="email">
        Change Email
      </label>

      <input
        className="updateProfileInput"
        placeholder="Email"
        id="email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        value={data.email}
      />
      <label className="updateProfileLabel" htmlFor="number">
        Change Phone Number
      </label>
      <input
        id="number"
        type="text"
        className="updateProfileInput inputNumber"
        placeholder="Phone Number"
        value={data.number}
        onChange={(e) => setData({ ...data, number: e.target.value })}
      />
      <label className="updateProfileLabel" htmlFor="password">
        Change Password
      </label>
      <input
        id="password"
        className="updateProfileInput"
        placeholder="Password"
        type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        value={data.password}
      />
      <button onClick={() => updateProfile()}>Update</button>
    </div>
  );
};

export default UpdateProfile;
