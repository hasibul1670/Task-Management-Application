/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const email = localStorage.getItem("email");
  const { pathname } = useLocation();


  if (!email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
