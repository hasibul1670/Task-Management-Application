import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AboutUs from "../Pages/FooterComponents/AboutUs";
import ContactUs from "../Pages/FooterComponents/ContactUs";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/Shared/NotFound";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "./../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "contactUs",
        element: (
          <PrivateRoute>
            {" "}
            <ContactUs />
          </PrivateRoute>
        ),
      },

      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
