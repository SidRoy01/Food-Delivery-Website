import React from "react";
import { useDispatch } from "react-redux";
import services from "../../Appwrite/Service";
import { logout } from "../../Store/authenticationSlice";
import { IoIosLogOut } from "react-icons/io";

function LogOutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    services.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="flex items-center px-2 text-white font-semibold bg-blue-500 hover:bg-blue-700 gap-1 rounded-full "
      onClick={logoutHandler}
    >
      <IoIosLogOut className="inline" />
      Logout
    </button>
  );
}

export default LogOutBtn;
