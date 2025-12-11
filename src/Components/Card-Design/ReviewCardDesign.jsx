import React from "react";
import { IoMdStar } from "react-icons/io";

const ReviewCardDesign = ({ name, email, photoURL, rating, comment, date }) => {
  return (
    <div className="w-full h-full">
      <div className="bg-white shadow-md rounded-xl p-5 h-full flex flex-col justify-between border border-gray-100">
        
        {/* Top Section */}
        <div className="flex items-center gap-4">
          <img
            src={photoURL}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 text-yellow-500 font-semibold">
          <IoMdStar className="text-xl" />
          <span className="text-gray-700">{rating} / 5</span>
        </div>

        {/* Comment */}
        <p className="mt-3 text-gray-700 text-sm leading-relaxed">
          {comment?.length > 120 ? comment.slice(0, 120) + "..." : comment}
        </p>

        {/* Date */}
        <div className="mt-4 text-right">
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardDesign;
