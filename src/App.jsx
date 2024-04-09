import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Cloudinary } from "@cloudinary/url-gen";

const App = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dbntul88v",
    },
  });
  return (
    <>
      <Toaster richColors position="bottom-left" closeButton />
      <Outlet />
    </>
  );
};

export default App;
