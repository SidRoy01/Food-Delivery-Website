import React from "react";
import { MdStars } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { DominosMenucard } from "../Index";
import menu from "../../Data/Mneu";

function DominosMenu() {
  return (
    <>
      <div className="max-w-[1000px] m-auto p-2  ">
        <div className="text-3xl font-bold">Domino's Pizza</div>
        <div className="max-w-[900px] m-auto mt-4 border-t-[1px] border-gray-300 shadow-lg shadow-gray-400 p-3 rounded-xl">
          <div className="flex font-bold text-lg  gap-3">
            <div className="flex items-center">
              <MdStars />
              <p>4.2 (561 ratings)</p>
            </div>
            <p>₹400 for two</p>
          </div>
          <div className="text-purple-900 font-semibold">Pizzas, Italian</div>
          <div>
            <div className="flex gap-3 mt-2">
              <p className="font-bold">Outlet</p>
              <p className="text-gray-900">Kolkata</p>
            </div>
            <div className="flex gap-3 my-1">
              <p className="font-bold">Time</p>{" "}
              <p className="text-gray-900">30 - 35 mins</p>
            </div>
          </div>
        </div>
        <div className="w-full flex  items-center justify-center font-semibold text-lg mt-5 gap-3">
          <MdOutlineRestaurantMenu className="inline" /> Menu
          <MdOutlineRestaurantMenu className="inline" />
        </div>
        <div className="max-w-[900px]  m-auto">
          {menu.map((m, i) => {
            return <DominosMenucard {...m} key={i} />;
          })}
        </div>
      </div>
    </>
  );
}

export default DominosMenu;
