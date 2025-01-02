import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "../Index";
import { clearCart } from "../../Store/cartSlice";

const MockPayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get total amount and address from the state
  const totalToPay = location.state?.totalToPay || 0;
  const selectedAddress = location.state?.selectedAddress || null;

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        navigate("/confirmation");
        dispatch(clearCart());
      }, 2000);
    }, 3000);
  };

  return (
    <div className="max-w-[500px] m-auto mt-7 mb-4 p-4 border-[1px] border-slate-400 shadow-xl shadow-slate-400 bg-white rounded-lg">
      {!paymentSuccess ? (
        <>
          <h2 className="text-xl font-bold text-center mb-4">
            Complete Your Payment
          </h2>
          <div className="mb-4">
            <h3 className="font-semibold">Order Summary</h3>
            <p>
              Total Amount: ₹<span className="font-bold">{totalToPay}</span>
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Delivery Address</h3>

            <p className="font-bold">{selectedAddress.name}</p>
            <p>{selectedAddress.address}</p>
          </div>
          {isProcessing ? (
            <div className="text-center">
              <p>Processing Payment...</p>
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin m-auto mt-4"></div>
            </div>
          ) : (
            <Button onClick={handlePayment} className="w-full">
              Pay ₹{totalToPay}
            </Button>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-500 mb-2">
            Payment Successful!
          </h2>
          <p>Thank you for your order. Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default MockPayment;
