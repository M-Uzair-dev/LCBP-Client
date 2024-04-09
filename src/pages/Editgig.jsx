import React, { useEffect, useState } from "react";
import "./gigdetails.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "sonner";

const Editgig = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { edtgigid } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    name: "",
    about: "",
    from: "",
    time: "",
    gender: "",
    age: "",
    experience: "",
    field: "",
    email: "",
    number: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  function isValidNumber(inputString) {
    return /^\d+$/.test(inputString);
  }
  useEffect(() => {
    const gigdetails = async () => {
      try {
        const res = await fetch(
          `https://lcbp-earn-api.vercel.app/api/gig/getgigdetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gigid: edtgigid,
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
      } catch (e) {
        toast.error(e.message);
      }
    };
    gigdetails();
  }, []);

  const add = async () => {
    try {
      if (!isValidNumber(data.number)) {
        toast.error("Phone number can only contain numbers");
        setLoading(false);
        return;
      } else if (!isValidNumber(data.price)) {
        toast.error("Price can only contain numbers");
        setLoading(false);
        return;
      } else if (data.number.length < 10) {
        toast.error("Phone number must be 11 digits");
        setLoading(false);
        return;
      }
      setLoading(true);
      if (selectedImage) {
        if (
          selectedImage.type !== "image/jpeg" &&
          selectedImage.type !== "image/png" &&
          selectedImage.type !== "image/jpg"
        ) {
          toast.error(
            "Invalid image format. Only JPEG, PNG, and JPG formats are allowed."
          );
          return;
        }
        let image = new FormData();
        image.append("file", selectedImage);
        image.append("cloud_name", "dbntul88v");
        image.append("upload_preset", "pvkxzd6k");
        const url = "https://api.cloudinary.com/v1_1/dbntul88v/image/upload";
        const resp = await fetch(url, {
          method: "POST",
          body: image,
        });
        const data1 = await resp.json();
        if (!data1) {
          toast("Error with image");
          return;
        }
        let res = await fetch(
          `https://lcbp-earn-api.vercel.app/api/gig/editgig`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: edtgigid,
              data: {
                ...data,
                imageurl: data1.url,
              },
            }),
          }
        );
        let result = await res.json();

        if (!res.ok || res.success === false) {
          toast.error(result.message);
          setLoading(false);
          return;
        }

        toast.success("gig Added successfully");
      } else {
        let res = await fetch(
          `https://lcbp-earn-api.vercel.app/api/gig/editgig`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: edtgigid,
              data,
            }),
          }
        );
        let result = await res.json();

        if (!res.ok || res.success === false) {
          toast.error(result.message);
          setLoading(false);
          return;
        }

        toast.success("gig Edited successfully");
      }

      navigate("/mygigs");
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  return (
    <div className="addgigpage">
      <div className="Back" onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </div>
      <h1>Edit Gig</h1>
      <div className={selectedImage ? "imageInputDiv green" : "imageInputDiv"}>
        <input
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          accept="image/png image/jpeg image/jpg"
        />
        <h1>+</h1>
      </div>
      <div className="inputsWrapper">
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          type="text"
          placeholder="Title"
        />
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          type="text"
          placeholder="Description"
        />
        <input
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          type="text"
          placeholder="Price"
        />
        <input
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          placeholder="Name"
        />
        <textarea
          value={data.about}
          onChange={(e) => setData({ ...data, about: e.target.value })}
          type="text"
          placeholder="About"
        />
        <input
          value={data.from}
          onChange={(e) => setData({ ...data, from: e.target.value })}
          type="text"
          placeholder="From"
        />
        <input
          value={data.time}
          onChange={(e) => setData({ ...data, time: e.target.value })}
          type="text"
          placeholder="Time Availablity"
        />
        <input
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
          type="text"
          placeholder="Gender"
        />
        <input
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          type="text"
          placeholder="Age"
        />
        <input
          value={data.experience}
          onChange={(e) => setData({ ...data, experience: e.target.value })}
          type="text"
          placeholder="Experience"
        />
        <input
          value={data.field}
          onChange={(e) => setData({ ...data, field: e.target.value })}
          type="text"
          placeholder="Field of experience"
        />
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          placeholder="email"
        />
        <input
          value={data.number}
          onChange={(e) => setData({ ...data, number: e.target.value })}
          type="text"
          placeholder="phone number"
        />
        {loading ? (
          <button>Edit...</button>
        ) : (
          <button onClick={add}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default Editgig;
