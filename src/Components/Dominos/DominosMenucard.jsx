import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../Store/cartSlice";

function DominosMenucard({ category, items }) {
  const [box, setbox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.length;

  const handleAddToCart = (item) => {
    dispatch(addCart(item));
    setbox(true);
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.id === itemId);
  };

  return (
    <>
      <div
        className={`flex justify-between w-[400px] m-auto text-md  fixed left-1/2 transform -translate-x-1/2 bg-green-600 text-white font-bold  py-2 px-2 rounded-md shadow-md transition-transform duration-300 z-10 ${
          box ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ bottom: "0%" }}
      >
        {totalItems == 1
          ? `${totalItems} Item is added to cart`
          : `${totalItems} Items are added to cart`}
        <button className="underline" onClick={() => navigate("/cart")}>
          View Cart
        </button>
      </div>
      <div className="mt-5 p-2">
        <div className="font-bold text-2xl border-t-[1px] border-gray-400">
          {category}
        </div>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-10  mt-4">
            <div className="-max-w-[500px] ">
              <div className="font-bold text-xl text-gray-800">
                {item.name}
                <div>₹{item.price}</div>
              </div>
              <p className="text-gray-700 overflow-hidden text-ellipsis">
                {item.description}
              </p>
            </div>
            <div className="items-center">
              <div className="relative h-[150px] w-[160px] rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isItemInCart(item.id)}
                  className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 font-bold px-4 py-1 rounded-xl ${
                    isItemInCart(item.id)
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-white bg-opacity-90 text-green-600"
                  }`}
                >
                  {isItemInCart(item.id) ? "Added" : "ADD"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DominosMenucard;
