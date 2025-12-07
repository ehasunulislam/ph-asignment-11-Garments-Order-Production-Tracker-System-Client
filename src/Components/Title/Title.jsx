import React from "react";

const Title = ({ text2 }) => {
  return (
    <div className="flex flex-col items-center relative mt-10 sm:mt-14 mb-10">
      {/* Foreground main title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-300 relative z-10 pb-1 font-3">
        {text2}
      </h1>

      {/* Background large text
      <h1 className="text-4xl md:text-6xl font-bold text-gray-200 absolute z-0 third-font top-[-20px] font-3 select-none">
        {text1}
      </h1> */}
    </div>
  );
};

export default Title;
