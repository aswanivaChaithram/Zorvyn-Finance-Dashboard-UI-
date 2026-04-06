import React from "react";
import headerImg from "../assets/header.jpeg"; 

const Home = () => {
  return (
    <div className="w-full py-10 bg-slate-900 text-white">

      <div className="w-full h-[400px] sm:h-[450px] rounded-lg overflow-hidden relative"
        style={{
          backgroundImage: `url(${headerImg})`, backgroundSize: "cover", backgroundPosition: "center"
        }}>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16">
          <h1 className="font-bold leading-tight
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Personal finance
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base">
            Take control of your money and plan your future smarter.
          </p>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-600 my-8" />

      <p className="text-center text-xs sm:text-sm">
        © 2026 Finance Dashboard. All rights reserved.
      </p>

    </div>
  );
};

export default Home;