import React from "react";
import { assets } from "../../../assets/assets";
import Lottie from "lottie-react";

const DataLoading = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={assets.dataLoading}
        loop={true}
        className="w-32 h-32 md:w-78 md:h-78"
      />
    </div>
  );
};

export default DataLoading;
