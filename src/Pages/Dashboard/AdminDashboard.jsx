import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar';
import Transactions from '../../Components/Transactions';

const AdminDashboard = () => {
  const [active, setActive] = useState("Dashboard");

  // Dummy user financial data
  const usersData = [
    { name: "User 1", balance: 1900, income: 8000, expense: 6100 },
    { name: "User 2", balance: 2500, income: 9000, expense: 6500 },
    { name: "User 3", balance: 3200, income: 10000, expense: 6800 },
    { name: "User 4", balance: 1500, income: 7000, expense: 5500 },
  ];

  return (
    <div className="flex bg-[#0f172a] text-white h-screen overflow-hidden">
      
      {/* left Sidebar */}
      <Sidebar role="Admin" active={active} setActive={setActive} />

      <div className="flex-1 p-6 overflow-y-auto">
      
        {/* Dashboard section */}
        {active === "Dashboard" && (
          <div className="w-full min-h-[140vh] md:min-h-0">

            <h1 className="text-3xl font-bold mb-6">
              Welcome Admin
            </h1>

              <div className="w-full md:w-[300px]  bg-[#1e293b] p-5 rounded-xl shadow-lg mb-8">
                <p className="text-sm mb-2 text-gray-300">Total Users</p>
                <h2 className="text-2xl sm:text-3xl font-bold">4</h2>
              </div>

            <h2 className="text-xl font-bold mb-4">
               Users Details
            </h2>

            {/* ================= TABLE ================= */}
            <div className="hidden md:block bg-[#1e293b] rounded-xl overflow-hidden">
              <table className="w-full text-left">

                <thead className="border-b border-gray-600">
                  <tr>
                    <th className="text-lg p-4 font-bold">Users</th>
                    <th className="text-lg p-4 font-bold">Total Balance</th>
                    <th className="text-lg p-4 font-bold">Income</th>
                    <th className="text-lg p-4 font-bold">Expenses</th>
                  </tr>
                </thead>

                <tbody>
                  {usersData.map((user, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">₹{user.balance}</td>
                      <td className="p-4">₹{user.income}</td>
                      <td className="p-4">₹{user.expense}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* ================= CARDS (mobile device) ================= */}
            <div className="md:hidden flex flex-col gap-4">
              {usersData.map((user, index) => (
                <div key={index} className="bg-[#1e293b] p-4 rounded-xl">

                  <p>
                    <span className="text-lg font-bold">User:</span> {user.name}
                  </p>

                  <p>
                    <span className="text-lg font-bold">Total Balance:</span> ₹{user.balance}
                  </p>

                  <p>
                    <span className="text-lg font-bold">Income:</span> ₹{user.income}
                  </p>

                  <p>
                    <span className="text-lg font-bold">Expenses:</span> ₹{user.expense}
                  </p>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* Transactions section */}
        {active === "Transactions" && <Transactions />}

      </div>
    </div>
  );
}

export default AdminDashboard;