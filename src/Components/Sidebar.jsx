import React, { useState } from "react";

const Sidebar = ({ role, active, setActive }) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: "fa-chart-column" },
    { name: "Transactions", icon: "fa-credit-card" },
    ...(role !== "Admin"
      ? [
          { name: "Insights", icon: "fa-lightbulb" },
          { name: "Profile", icon: "fa-circle-user" },
        ]
      : []),
  ];

  return (
      <div className={`${ isOpen ? "w-[240px]" : "w-[70px]" } 
        bg-[#020617] transition-all duration-300 p-4 flex flex-col h-1500`} >

          {/* Sidebar icon */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 cursor-pointer text-blue-500 
          flex text-2xl">
            <i className="fa-solid fa-bars"></i>
          </button>

        <div className="flex flex-col gap-3 mt-2">
          {menuItems.map((item) => (
            <div key={item.name} onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all
                ${
                  active === item.name
                    ? "bg-blue-600 text-white"
                    : "bg-[#0f172a] text-blue-400 hover:bg-blue-500 hover:text-white"
                }`}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {isOpen && <span>{item.name}</span>}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Sidebar