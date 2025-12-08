import React from "react";
import { assets } from "../../assets/assets";
// import Lottie from "lottie-react";
import "./PageLoading.css"

const PageLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* <Lottie
        animationData={assets.pageLoading}
        loop={true}
        className="w-32 h-32 md:w-58 md:h-58"
      /> */}

      <div>
        <img src={assets.logo} alt="logo" />
        <h3 className="text-2xl font-bold typing-animation">CartZilla</h3>
      </div>
    </div>
  );
};

export default PageLoading;
