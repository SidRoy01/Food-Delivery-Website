import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaCartArrowDown } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOutBtn, UserDetails } from "../Index";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const authStatus = useSelector((state) => state.authentication.status);
  const userData = useSelector((state) => state.authentication.userData);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const totalItems = cartItems.length;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const links = [
    { icon: <FaCartArrowDown />, path: "/Cart", active: true, name: "Cart" },
    {
      icon: <CgProfile />,
      path: "/SignIn",
      active: !authStatus,
      name: "Sign In",
    },
  ];

  return (
    <header className="p-2 shadow-md bg-white">
      <div className="max-w-[1100px] m-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <div
            className="w-[50px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png"
              alt="Logo"
              className="w-full"
            />
          </div>

          <div className="sm:flex items-center gap-2">
            <span className="font-bold border-b-2 border-black">Kolkata</span>

            <span>West Bengal, India</span>
            <MdKeyboardArrowDown className=" inline text-[20px] text-blue-500 cursor-pointer" />
          </div>
        </div>

        {/* Hamburger Menu */}
        <button
          className="text-xl text-orange-700 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex list-none gap-10 text-lg">
          <li className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-700">
              Search
            </button>
          </li>
          {links.map((link, index) =>
            link.active ? (
              <li key={index} className="flex items-center gap-1">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-blue-500 cursor-pointer"
                      : "flex items-center gap-2 hover:text-blue-500 cursor-pointer"
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
                {link.name === "Cart" && totalItems > 0 && (
                  <sup className=" bg-red-500 text-white rounded-lg  text-sm font-bold w-5 h-5 flex items-center justify-center hovr">
                    {totalItems}
                  </sup>
                )}
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogOutBtn />
            </li>
          )}
          {authStatus && userData && (
            <div
              className="flex items-center gap-1 text-black font-bold text-xl cursor-pointer"
              ref={dropdownRef}
              onClick={toggleDropdown}
            >
              <RiAccountPinCircleFill className="inline" /> {userData.name}
            </div>
          )}
          {isDropdownOpen && <UserDetails />}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="block md:hidden mt-4 bg-white shadow-lg rounded-md p-4">
          <ul className="flex flex-col gap-4">
            {links.map((link, index) =>
              link.active ? (
                <li key={index} className="flex items-center gap-2">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-2 text-blue-500 cursor-pointer"
                        : "flex items-center gap-2 hover:text-blue-500 cursor-pointer"
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                  {link.name === "Cart" && totalItems > 0 && (
                    <sup className=" bg-red-500 text-white rounded-lg  text-sm font-bold w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </sup>
                  )}
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
          {authStatus && userData && (
            <Link
              className=" inline-block px-8 py-2  text-black font-bold text-xl cursor-pointer"
              onClick={() => navigate("/UserDetails")}
            >
              Hello, {userData.name}!
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
