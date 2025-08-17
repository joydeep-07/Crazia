import React, { useState } from "react";
import "../style/button.css";
import Popup from "../components/Profile";

const WhatWeDo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section
      id="services"
      className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8 lg:px-16 py-10 lg:py-20"
    >
      {/* Video Section */}
      <div className="w-full lg:w-auto lg:max-w-[700px] overflow-hidden order-2 lg:order-1 ">
        <video
          src="https://cuberto.com/assets/home/summary/2.mp4"
          className="w-full h-auto max-h-[300px] sm:max-h-[350px] lg:h-[400px] lg:w-[500px] object-cover rounded-xl"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>

      {/* Text Section */}
      <div className="max-w-2xl order-1 lg:order-2 mb-8 lg:mb-0 text-center lg:text-left px-2 sm:px-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-snug">
          Crafting Scalable Web Solutions
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
          I’m a{" "}
          <span className="font-semibold text-gray-900">
            MERN Stack Developer
          </span>{" "}
          with a BCA degree, currently pursuing MCA. I specialize in building
          dynamic, full-stack applications that are both efficient and
          user-friendly.
        </p>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
          With expertise in
          <span className="font-semibold text-gray-900"> MongoDB</span>,
          <span className="font-semibold text-gray-900"> Express.js</span>,
          <span className="font-semibold text-gray-900"> React</span>, and
          <span className="font-semibold text-gray-900"> Node.js</span>, I
          develop robust and scalable web solutions tailored to your needs.
        </p>

        {/* Wave Button */}
        <button
          className="water-wave-btn border border-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-6 text-base sm:text-lg lg:text-2xl font-semibold rounded-full mt-6 lg:mt-10 relative overflow-hidden group w-full sm:w-auto hover:shadow-xl transition-all duration-300"
          onClick={() => setShowPopup(true)}
        >
          <span className="relative z-10">About Me</span>
        </button>
      </div>

      {/* Popup */}
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default WhatWeDo;
