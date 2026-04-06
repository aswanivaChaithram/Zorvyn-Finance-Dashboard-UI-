import React, { useState, useMemo } from "react";
import { useTransactions } from "../context/TransactionContext";
import TransactionsTable from "./TransactionsTable";

const Transactions = () => {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser?.role === "Admin";

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [newData, setNewData] = useState({
    date: "",
    amount: "",
    category: "",
    type: ""
  });

  const categories = [...new Set(transactions.map(t => t.category))];

  const filteredData = useMemo(() => {
    if (isAdmin) return transactions;

    let data = [...transactions];

    if (category) data = data.filter(t => t.category === category);
    if (type) data = data.filter(t => t.type === type);
    if (sortBy === "amount") data.sort((a, b) => a.amount - b.amount);

    return data;
  }, [transactions, category, type, sortBy, isAdmin]);

  const clearFilters = () => {
    setCategory("");
    setType("");
    setSortBy("");
  };

  const handleSave = () => {
    if (!newData.date || !newData.amount || !newData.category || !newData.type) {
      alert("Fill all fields");
      return;
    }

    addTransaction({
      ...newData,
      amount: Number(newData.amount)
    });

    setShowForm(false);
    setNewData({ date: "", amount: "", category: "", type: "" });
  };

  return (
    <div className="w-full min-h-[160vh]">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Transactions
      </h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
     
        {/* USER FILTERS */}
        {!isAdmin && (
        <div className="flex flex-wrap gap-3">

          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="bg-[#1e293b] p-2 rounded-md text-sm sm:text-base cursor-pointer">
            <option value="">Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}
            className="bg-[#1e293b] p-2 rounded-md text-sm sm:text-base cursor-pointer">
            <option value="">Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1e293b] p-2 rounded-md text-sm sm:text-base cursor-pointer">
            <option value="">Sort</option>
            <option value="amount">Amount</option>
          </select>

            {(category || type || sortBy) && (
            <button onClick={clearFilters}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md
                 text-white text-sm cursor-pointer">
                    Clear Filters
            </button>
            )}

        </div>
        )}

        {isAdmin && (
            <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer">
                Add Details
            </button>
        )}

    </div>

    {/* Add Details inputs  */}
    {isAdmin && showForm && (
    <div className="flex gap-3 mb-4 flex-wrap">

        <input type="date" value={newData.date} className="p-2 rounded bg-[#1e293b]"
        onChange={(e) => setNewData({...newData, date: e.target.value})}/>

        <input type="number" placeholder="Amount" value={newData.amount}
        onChange={(e) => setNewData({...newData, amount: e.target.value})}
        className="p-2 rounded bg-[#1e293b]" />

        <input type="text" placeholder="Category" value={newData.category}
        onChange={(e) => setNewData({...newData, category: e.target.value})}
        className="p-2 rounded bg-[#1e293b]" />

        <select value={newData.type} onChange={(e) => setNewData({...newData, type: e.target.value})}
        className="p-2 rounded bg-[#1e293b]">
            <option value="">Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
        </select>

        <button onClick={handleSave} className="bg-green-500 px-4 py-2 rounded text-white cursor-pointer">
            Save
        </button>

    </div>
    )}

    {/* Table */}
    <TransactionsTable data={filteredData} isAdmin={isAdmin}
    onDelete={deleteTransaction} />

    </div>
  );
};

export default Transactions;
