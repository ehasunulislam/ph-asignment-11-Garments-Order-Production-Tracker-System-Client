import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaYoutube, FaTelegramPlane } from "react-icons/fa";

const NewsLetter = () => {
  return (
    <section className="bg-[#F5F7FA] py-20 flex flex-col items-center px-10 text-center">
      <h2 className="text-[1rem] md:text-2xl font-semibold text-gray-800">
        Sign up to our newsletter
      </h2>
      <p className="text-gray-500 mt-2 text-[0.9rem] md:text-[1rem]">
        Receive our latest updates about our products & promotions
      </p>

      {/* Input */}
      <div className="mt-6 flex flex-col md:flex-row gap-2 w-full max-w-md">
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-gray-300 transition w-full">
          <MdOutlineMail className="text-gray-400 text-xl" />
          <input
            type="email"
            placeholder="Your email"
            className="ml-2 outline-none text-gray-600 w-full"
          />
        </div>

        <button className="px-5 py-2 bg-[#F25757] hover:bg-[#e14b4b] text-white font-medium rounded-lg transition w-full md:w-auto">
          Subscribe
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 mt-6">
        {[FaInstagram, FaFacebookF, FaYoutube, FaTelegramPlane].map((Icon, i) => (
          <div
            key={i}
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full cursor-pointer hover:bg-gray-100 transition"
          >
            <Icon className="text-gray-600" size={18} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsLetter;
