import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { assets } from "../../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen bg-white font-semibold text-gray-800">
      
      {/* Hero Section - About Us */}
      <section className="pt-32 pb-20 px-6 md:px-20 lg:px-40 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#222934]">
            About Us
          </h1>
          <div className="w-32 h-1 bg-indigo-600 mx-auto mt-6 mb-8"></div>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mt-8">
            We are building the <span className="font-bold text-[#222934]">future of garment manufacturing</span> —
            one garment factory at a time.
          </p>

          <p className="mt-8 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Born from real factory floors, endless Excel chaos, and missed deadlines, our Garments Order & Production Tracker System is designed by people who understand the pain of apparel production — because we’ve lived it.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-20 lg:px-40 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#222934] mb-6">Our Story</h2>
            <div className="w-20 h-1 bg-indigo-600 mb-8"></div>
            
            <p className="text-gray-700 leading-relaxed text-lg">
              It all started in a small garment factory in 2023. Orders were delayed, fabric consumption was guessed, production status lived only in WhatsApp groups, and no one knew the real progress until it was too late.
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              We said: <strong>"This has to change."</strong>
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
              Today, our system helps factories across the country track every order from approval to shipment — with 100% real-time accuracy.
            </p>
          </div>

          {/* Placeholder for Image */}
          <div className="rounded-2xl w-full h-96 flex items-center justify-center text-gray-500">
            {/* <span className="text-center">
              <FaCheckCircle className="mx-auto text-6xl text-gray-400 mb-4" />
              <p>Factory Image Here</p>
            </span> */}
            <img src={assets.factory} alt="factory" className="rounded-[10px]" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-20 lg:px-40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          
          {/* Mission */}
          <div className="text-center md:text-left">
            <div className="bg-[#222934] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 text-2xl font-bold mb-6">
              M
            </div>
            <h3 className="text-3xl font-bold text-[#222934] mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To empower every garment manufacturer with simple, powerful, and affordable digital tools that bring clarity, control, and confidence to production.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center md:text-left">
            <div className="bg-[#4b535f] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 text-2xl font-bold mb-6">
              V
            </div>
            <h3 className="text-3xl font-bold text-[#222934] mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              A world where no factory ever misses a shipment because of poor visibility. Where data drives decisions — not guesswork.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 md:px-20 lg:px-40 bg-gray-100 text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">We Believe In</h2>
          <div className="w-32 h-1 bg-indigo-400 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white border border-gray-200 backdrop-blur-sm p-8 rounded-2xl">
              <h4 className="text-2xl font-bold mb-3">Transparency</h4>
              <p className="opacity-90">Everyone sees the same truth in real time — no more surprises.</p>
            </div>
            <div className="bg-white border border-gray-200 backdrop-blur-sm p-8 rounded-2xl">
              <h4 className="text-2xl font-bold mb-3">Simplicity</h4>
              <p className="opacity-90">Powerful doesn’t mean complicated. We make it easy for everyone.</p>
            </div>
            <div className="bg-white border border-gray-200 backdrop-blur-sm p-8 rounded-2xl">
              <h4 className="text-2xl font-bold mb-3">Reliability</h4>
              <p className="opacity-90">When you need to know the status — you know. Always.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 md:px-20 lg:px-40 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#222934] leading-tight">
            Join the Future of<br /><span className="text-2xl md:text-5xl">Garment Manufacturing</span>
          </h2>
          <p className="mt-8 text-xl text-gray-600">
            Thousands of orders. Hundreds of factories. One system that works.
          </p>
          <button className="btn btn-xs btn-neutral sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl mt-6">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;