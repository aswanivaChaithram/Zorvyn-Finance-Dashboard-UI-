import React, { useEffect, useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  const { getTotalIncome, getTotalExpense, getBalanceTrendData,  getCategoryBreakdown } = useTransactions();

  const income = getTotalIncome();
  const expense = getTotalExpense();
  const balance = income - expense;
  const lineData = getBalanceTrendData();
  const pieData = getCategoryBreakdown();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="w-full min-h-[194vh] sm:min-h-[152vh] md:min-h-0">

      <h1 className="text-3xl font-bold mb-6">
        Welcome {username}
      </h1>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-6 w-full">

        <div className="flex-1 bg-[#1e293b] p-5 rounded-xl shadow-lg">
          <p className="text-sm mb-2 text-gray-300">Total Balance</p>
          <h2 className="text-2xl sm:text-3xl font-bold">₹{balance}</h2>
        </div>

        <div className="flex-1 bg-[#1e293b] p-5 rounded-xl shadow-lg">
          <p className="text-sm mb-2 text-gray-300">Income</p>
          <h2 className="text-2xl sm:text-3xl font-bold">₹{income}</h2>
        </div>

        <div className="flex-1 bg-[#1e293b] p-5 rounded-xl shadow-lg">
          <p className="text-sm mb-2 text-gray-300">Expenses</p>
          <h2 className="text-2xl sm:text-3xl font-bold">₹{expense}</h2>
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8 w-full">

        {/* Line Chart */}
        <div className="flex-1 bg-[#1e293b] p-5 rounded-xl">
            <h2 className="mb-4 font-semibold">Balance Trend (2026)</h2>

            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
                <XAxis dataKey="date" stroke="#ccc" interval={0} angle={-20} textAnchor="end" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#38bdf8" dot={{ r: 4 }} />
            </LineChart>
            </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="flex-1 bg-[#1e293b] p-5 rounded-xl">
            <h2 className="mb-4 font-semibold">Spending Breakdown (2026)</h2>

            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label >
                    {pieData.map((entry, index) => (
                        <Cell key={index} fill={`hsl(${index * 60}, 70%, 50%)`} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>

    </div>

    </div>
  );
};

export default Dashboard;