import React, { useRef } from "react";
import Lottie from "lottie-react";
import { assets } from "../../assets/assets";
import { Link } from "react-router";

const MyAnimation = () => {
  const lottieRef = useRef();

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 bg-gray-50">
      {/* Animation */}
      <Lottie
        lottieRef={lottieRef}
        animationData={assets.block}
        loop={true}
        className="w-48 h-48 md:w-82 md:h-82 drop-shadow-lg"
      />

      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-md text-center mt-6 border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-red-400">
          Account Blocked
        </h2>

        <p className="text-gray-600 mt-3 md:text-lg leading-relaxed text-center">
          Your account has been blocked by the administrator. If you believe this is a mistake, please contact support.
        </p>

        <div className="mt-5">
          <p className="text-gray-800 font-medium">
            Email:{" "}
            <span className="text-primary">devid@gmail.com</span>
          </p>
        </div>

        {/* Back Home Button */}
        <Link
          to="/"
          className="inline-block mt-6 bg-secondary text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MyAnimation;
