import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../../Components/Hooks/useAxios";
import { assets } from "../../../assets/assets";
import Lottie from "lottie-react";

const PaymentSuccess = () => {
  const axiosInstance = useAxios();
  const [searchParams] = useSearchParams();
  const cartId = searchParams.get("cartId");

  useEffect(() => {
    if (cartId) {
      axiosInstance.patch(`/carts/payment-success/${cartId}`);
    }
  }, [cartId, axiosInstance]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 via-white to-green-50 p-4 sm:p-6 lg:p-10">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-10 lg:p-12 text-center max-w-sm sm:max-w-md lg:max-w-lg border border-green-200 transition-transform duration-300 hover:scale-[1.01]">
        <Lottie
          animationData={assets.paymentSuccess}
          loop={true}
          className="w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 mx-auto mb-4"
        />

        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-3">
          Payment Successful! 🎉
        </h2>

        <p className="text-gray-700 text-base sm:text-lg mb-6 px-2">
          Thanks for your purchase! Your order has been confirmed successfully.
        </p>

        <Link
          to="/dashboard/cart-info"
          className="inline-block bg-green-600 hover:bg-green-700 transition-all duration-200 
          px-6 sm:px-8 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl"
        >
          View Order ➜
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
