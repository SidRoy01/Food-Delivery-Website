import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever, MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../Store/cartSlice";
import { Button } from "../Index";

function Cart() {
  const [count, setCount] = useState({});
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const authStatus = useSelector((state) => state.authentication.status);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deliveryFee = 40;
  const platformFee = 4;
  const charges = 50;

  // Initialize counts when cartItems change
  useEffect(() => {
    const initialCounts = {};
    cartItems.forEach((item) => {
      initialCounts[item.id] = 1;
    });
    setCount(initialCounts);
  }, [cartItems]);

  useEffect(() => {
    if (itemsToRemove.length > 0) {
      itemsToRemove.forEach((item) => dispatch(removeCart(item))); // Dispatch removal
      setItemsToRemove([]);
    }
  }, [itemsToRemove, dispatch]);

  const countHandlerPlus = (id) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const countHandlerMinus = (id) => {
    setCount((prevCounts) => {
      const newCount = (prevCounts[id] || 0) - 1;

      if (newCount <= 0) {
        const itemToRemove = cartItems.find((item) => item.id === id);
        if (itemToRemove) {
          setItemsToRemove((prev) => [...prev, itemToRemove]);
        }

        const { [id]: _, ...rest } = prevCounts;
        return rest;
      }

      return { ...prevCounts, [id]: newCount };
    });
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const quantity = count[item.id] || 0;
    return total + item.price * quantity;
  }, 0);

  const totalToPay = totalPrice + deliveryFee + platformFee + charges;

  return (
    <div className="max-w-[500px] m-auto mt-7 mb-4 p-2 shadow-xl shadow-slate-500  bg-gray-300 rounded-lg">
      <div className=" text-2xl font-bold">Your cart</div>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between flex-wrap mt-2 p-3  bg-white rounded-xl "
            >
              <div className="flex items-center justify-start gap-4">
                <div className="w-[90px] h-[90px] rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="max-w-[250px]">
                  <div className="text-xl font-semibold ">{item.name}</div>
                  <div className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {item.description}
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="inline p-[2px] bg-black rounded-full text-white"
                      onClick={() => countHandlerMinus(item.id)}
                    >
                      <FaMinus />
                    </div>
                    <p>{count[item.id] || 0}</p>
                    <div
                      className="inline  p-[2px] bg-black rounded-full text-white"
                      onClick={() => countHandlerPlus(item.id)}
                    >
                      <FaPlus />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center ">
                <div className="mb-10 font-semibold">₹{item.price}</div>
                <button
                  className="text-2xl text-red-700 flex-shrink-0 "
                  onClick={() => setItemsToRemove((prev) => [...prev, item])}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}

          <div className="w-full p-3 bg-white m-auto mt-2 rounded-xl">
            <div className="text-base font-semibold">Bill Details</div>
            <div className="w-full text-gray-600 ">
              <div className="flex items-center justify-between">
                <div>Total Price</div>
                <div>₹{totalPrice}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Delivery Fee</div>
                <div>₹{deliveryFee}</div>
              </div>
              <div className=" flex items-center justify-between">
                <div>Platform Fee</div>
                <div>₹{platformFee}</div>
              </div>
              <div className=" flex items-center justify-between">
                <div>GST and Restaurant Charges</div>
                <div>₹{charges}</div>
              </div>
              <div className="flex items-center justify-between mt-1 font-semibold text-black border-t-2 border-black ">
                <div>To Pay</div>
                <div>₹{totalToPay}</div>
              </div>
            </div>
            <div className="w-full font-bold text-black text-center mt-2">
              {authStatus ? (
                <Button
                  className="w-full"
                  onClick={() =>
                    navigate("/address", { state: { totalToPay } })
                  }
                >
                  Proceed To Pay
                </Button>
              ) : (
                <div className="w-full">
                  <p className="text-sm font-semibold">
                    To place your order, sign in to your existing account or
                    sign up.
                  </p>
                  <div className="flex items-center justify-around mt-3">
                    <Button onClick={() => navigate("/SignIn")}>
                      Have an account? SIGN IN
                    </Button>
                    <Button onClick={() => navigate("/SignUp")}>
                      New user? SIGN UP
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="grid place-content-center">
          <div className="m-auto w-[100px] h-[100px]">
            <MdOutlineAddShoppingCart className="w-full h-full" />
          </div>
          <div className="font-extrabold text-lg">Your Cart Is Empty</div>
        </div>
      )}
    </div>
  );
}

export default Cart;
