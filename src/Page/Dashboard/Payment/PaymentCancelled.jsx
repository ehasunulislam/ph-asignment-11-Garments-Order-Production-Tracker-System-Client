import React from "react";
import { Link } from "react-router";
import { assets } from "../../../assets/assets";
import Lottie from "lottie-react";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex justify-center items-center 
    bg-gradient-to-br from-red-100 via-white to-red-50 p-5">

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl 
      p-10 md:p-12 text-center max-w-lg border border-red-200">

        <Lottie
          animationData={assets.paymentCancel}
          loop={true}
          className="w-44 h-44 md:w-56 md:h-56 mx-auto mb-4"
        />

        <h2 className="text-3xl font-bold text-red-600 mb-2">
          Payment Cancelled ❌
        </h2>

        <p className="text-gray-700 text-lg mb-6">
          Your payment was not completed. You can retry again.
        </p>

        <div className="flex flex-col gap-3 justify-center mt-4">
          <Link
            to="/dashboard/cart-info"
            className="bg-red-600 hover:bg-red-700 transition-all duration-200 
            px-8 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl"
          >
            Try Again 🔄
          </Link>

          <Link
            to="/all-products"
            className="text-red-700 underline text-sm hover:text-red-900 transition"
          >
            Continue Shopping
          </Link>
        </div>

      </div>

    </div>
  );
};

export default PaymentCancelled;
