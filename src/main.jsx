import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Referrals from "./pages/Referrals";
import UpdateProfile from "./pages/EditProfile";
import Freelancers from "./pages/Freelancers";
import MyGigs from "./pages/MyGigs";
import Addgig from "./pages/Addgig";
import GigDetails from "./pages/GigDetails";
import Editgig from "./pages/Editgig";
import BasicEarning from "./pages/BasicEarning";
import AdminPass from "./pages/Adminpass";
import Dashboard from "./pages/dashboard/Dashboard";
import BuyPlan from "./pages/BuyPlan";
import UserDashboard from "./pages/UserDashboard";
import EditUser from "./pages/EditUser";
import UpdateValues from "./pages/UpdateValues";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,

        children: [
          {
            path: "/login/:id",
            element: <Login />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [],
      },
      {
        path: "/referrals",
        element: <Referrals />,
      },
      {
        path: "/updateprofile",
        element: <UpdateProfile />,
      },
      {
        path: "/freelancers",
        element: <Freelancers />,
      },
      {
        path: "/mygigs",
        element: <MyGigs />,
      },
      {
        path: "/addgig",
        element: <Addgig />,
      },
      {
        path: "/gigdetails/:gigid",
        element: <GigDetails />,
      },
      {
        path: "/editgig/:edtgigid",
        element: <Editgig />,
      },
      {
        path: "/basicEarning",
        element: <BasicEarning />,
      },
      {
        path: "/buyPlan/:planid",
        element: <BuyPlan />,
      },
      {
        path: "/userdashboard",
        element: <UserDashboard />,
        children: [
          {
            path: "/userdashboard/:inner",
            element: <UserDashboard />,
          },
        ],
      },
      {
        path: "/edituserprofileinfo",
        element: <EditUser />,
        children: [
          {
            path: "/edituserprofileinfo/:id",
            element: <EditUser />,
          },
        ],
      },

      {
        path: "/updatestaticvalues",
        element: <UpdateValues />,
      },
      {
        path: "/lcbpadminssecretdashboard",
        element: <AdminPass />,
        children: [
          {
            path: "/lcbpadminssecretdashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
