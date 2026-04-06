import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Dashboard from "../../Components/Dashboard";
import Transactions from "../../Components/Transactions";
import { useTransactions } from "../../context/TransactionContext";

const UserDashboard = () => {

  const { transactions } = useTransactions();
  const [active, setActive] = useState("Dashboard");

  // Highest Spending Category
  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "Expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const highestCategory = Object.keys(categoryTotals).length
  ? Object.keys(categoryTotals).reduce((a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b
    )
  : "N/A";

  // Monthly Comparison
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }

    if (t.type === "Income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += t.amount;
    }
  });

  // Total Savings
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpense;

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">

      {/* Left Sidebar */}
      <Sidebar role="User" active={active} setActive={setActive} />

      <div className="flex-1 p-6 h-full overflow-y-auto transition-all duration-300">

        {/* Dashboard section */}
        {active === "Dashboard" && <Dashboard />}

        {/* Transactions section */}
        {active === "Transactions" && <Transactions />}

        {/* Insights section */}
        {active === "Insights" && (
          <div className="space-y-6 min-h-[110vh] md:min-h-0">

            <h1 className="text-2xl sm:text-3xl font-semibold">Insights</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-[#1e293b] p-5 rounded-xl shadow">
                <p className="text-gray-400 text-sm">Highest Spending Category</p>
                <h2 className="text-xl mt-2 font-bold">
                  {highestCategory || "N/A"}
                </h2>
              </div>

              <div className="bg-[#1e293b] p-5 rounded-xl shadow">
                <p className="text-gray-400 text-sm">Total Savings</p>
                <h2 className="text-xl mt-2 font-bold">
                  ₹ {savings}
                </h2>
              </div>

              <div className="bg-[#1e293b] p-5 rounded-xl shadow">
                <p className="text-gray-400 text-sm">Total Expense</p>
                <h2 className="text-xl mt-2 font-bold">
                  ₹ {totalExpense}
                </h2>
              </div>

            </div>

            <div className="bg-[#1e293b] p-5 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-4">
                Monthly Comparison
              </h2>

              <div className="space-y-2">
                {Object.entries(monthlyData).map(([month, data]) => (
                  <div key={month}
                    className="flex justify-between text-sm border-b border-gray-700 pb-2">
                    <span className="pr-4 sm:pr-0">{month}</span>
                    <span>Income: ₹{data.income}</span>
                    <span>Expense: ₹{data.expense}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1e293b] p-5 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">
                Observation
              </h2>
              <p className="text-gray-300 text-sm">
                {savings > 0
                  ? "Great! You are saving money this period."
                  : "Your expenses exceed income. Try to reduce spending."}
              </p>
            </div>

          </div>
        )}

        {/* Profile section */}
        {active === "Profile" && (
          <div className="w-full flex flex-col">

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Profile Details
            </h1>

            <div className="w-full max-w-md bg-[#1e293b] p-6 rounded-xl shadow-lg flex flex-col gap-6">

              {(() => {
                const user = JSON.parse(localStorage.getItem("currentUser")) || {};

                return (
                  <>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg">Username</span>
                      <span className="text-gray-300 mt-1">{user.username || "N/A"}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg">Email</span>
                      <span className="text-gray-300 mt-1">{user.email || "N/A"}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg">Password</span>
                      <span className="text-gray-300 mt-1">{user.password || "N/A"}</span>
                    </div>
                  </>
                );
              })()}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;