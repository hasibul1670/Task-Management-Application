/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Components/firebase/firebase.config";
export const AuthContext = createContext(null);

const auth = getAuth(app);
export const baseUrl = "https://server009.vercel.app/api/v1";
// export const baseUrl = "http://localhost:5000/api/v1";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const loginUser = async (userData) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 401) {
      throw new Error("Incorrect  Password !!!");
    }
    if (response.status === 404) {
      throw new Error("User not Found ! Please Sign up");
    }

    return response.json();
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = async (userData) => {
    const response = await fetch(`${baseUrl}/user/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 400) {
      throw new Error("Field is Empty!!!");
    }
    if (response.status === 409) {
      throw new Error("Email already exists !!");
    }
    if (response.status === 404) {
      throw new Error("Internal Server Error !! please try again later");
    }

    return response.json();
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    setUser({ accessToken, email });
  }, []);

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    setUser(null);
  };

  const authInfo = {
    user,
    setUser,
    createUser,
    loading,
    loginUser,
    logOut,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
