import React, { useEffect, useState } from "react";
import { slider } from "../../../assets/assets";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slider.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 md:h-80 lg:h-120 relative overflow-hidden rounded-2xl my-5">
      {slider.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.img}
            alt={`slider-${index}`}
            className="w-full h-full object-cover rounded-[0.2rem]"
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
