import React from "react";
import { NavLink } from "react-router-dom";

const UserDetails = () => {
  return (
    <div className="max-w-[200px] absolute right-5 top-16 z-10  p-4 bg-white shadow-md border-black border-2 rounded-md ">
      <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
      <nav className="flex justify-around mb-6">
        <NavLink
          to="/Profile"
          className="font-bold rounded-lg p-1 text-white bg-blue-500"
        >
          Profile
        </NavLink>
        <NavLink
          to="/AddressList"
          className="font-bold rounded-lg p-1 text-white bg-blue-500"
        >
          Address
        </NavLink>
      </nav>
    </div>
  );
};

export default UserDetails;
