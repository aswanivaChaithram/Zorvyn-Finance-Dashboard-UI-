import React, { useState } from "react";
import logo from '../assets/logo.jpeg';

const Navbar = ({ setShowLogin, isAuthenticated, logoutUser }) => {
  
  return (
    <div className="w-full h-20 flex items-center justify-between border-b border-gray-700
    bg-slate-900 text-white px-4">

      {/* Left side */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full 
        object-contain"/>
        <h1 className="sm:text-xl md:text-2xl font-bold">
          Financial Dashboard
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {!isAuthenticated ? (
          <button onClick={() => setShowLogin(true)} className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-blue-500
           text-blue-500 font-bold hover:bg-blue-500 hover:text-white transition cursor-pointer">
            Login
          </button>
        ) : (
          <button onClick={logoutUser} className="px-2 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-red-500
           text-red-500 font-bold hover:bg-red-500 hover:text-white transition cursor-pointer">
            Logout
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;