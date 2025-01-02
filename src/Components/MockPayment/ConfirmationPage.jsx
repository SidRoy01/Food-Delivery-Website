import React from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="max-w-[500px] m-auto mt-7 mb-4 p-4 border-[1px] border-slate-400 shadow-xl shadow-slate-400 rounded-lg text-center">
      <h2 className="text-xl font-bold text-green-500 mb-2">
        Order Confirmed!
      </h2>
      <p>Your payment was successful. Thank you for ordering with us!</p>
      <p className="mb-3">Your food is on its way. 🍔🍕</p>

      <Link
        to={"/"}
        className="font-bold bg-blue-500 text-white p-2 rounded-md"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Confirmation;
