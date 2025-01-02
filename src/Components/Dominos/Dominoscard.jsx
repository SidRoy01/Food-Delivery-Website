import React from "react";

function Dominoscard() {
  return (
    <div className="w-[200px] mt-5 hover:cursor-pointer">
      <div className="group h-[120px] rounded-3xl overflow-hidden relative">
        <img
          src="https://tb-static.uber.com/prod/image-proc/processed_images/fbf500543dbcc1a91bcb8de08a66396f/c73ecc27d2a9eaa735b1ee95304ba588.jpeg"
          className="  group-hover:scale-125 duration-150 object-cover w-full h-full"
        />
        <div className="image-overlay w-full h-full absolute top-0  flex items-end p-2 font-bold text-md text-white">
          ₹100 OFF
        </div>
      </div>
      <div className="m-2">
        <div className="mt-2 font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis">
          Domino's Pizza
        </div>
        <div className="font-semibold overflow-hidden">
          4.3 Stars. 25-35 mins ₹300 for two
        </div>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-600">
          <p>Pizzas, Italian </p>
          <p>Kolkata</p>
        </div>
      </div>
    </div>
  );
}

export default Dominoscard;
