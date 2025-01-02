import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import services from "../Appwrite/Service";
import { login, logout } from "../Store/authenticationSlice";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Catagories, RestrauntChains, Footer } from "./Index";

function Layout() {
  const location = useLocation();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  // Check if the current route is the homepage
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await services.getCurrentUser(); // Check if the user is logged in
        if (userData) {
          dispatch(login({ userData })); // If logged in, update Redux
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        dispatch(logout()); // Log out the user if an error occurs
      }
    };

    checkUser();
  }, [dispatch]);

  return (
    <>
      <Header />
      {isHomePage && (
        <>
          <Catagories />
          <RestrauntChains />
        </>
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
