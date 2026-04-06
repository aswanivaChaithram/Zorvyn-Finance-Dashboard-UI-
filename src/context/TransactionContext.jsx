import React, { createContext, useContext, useState } from "react";
import { transactionData } from "../assets/transactionData";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {

  const [transactions, setTransactions] = useState(transactionData);

  // Total Income
  const getTotalIncome = () =>
    transactions
      .filter(t => t.type === "Income")
      .reduce((acc, curr) => acc + curr.amount, 0);

  // Total Expense
  const getTotalExpense = () =>
    transactions
      .filter(t => t.type === "Expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

  // Line Chart Data
  const getBalanceTrendData = () => {
    const grouped = {};

    transactions.forEach(t => {
        if (!grouped[t.date]) {
        grouped[t.date] = 0;
        }

        grouped[t.date] += t.type === "Income" ? t.amount : -t.amount;
    });

    let runningBalance = 0;

    return Object.keys(grouped)
        .sort()
        .map(date => {
        runningBalance += grouped[date];

        const formattedDate = new Date(date).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric"
        });

        return {
            date: formattedDate,
            balance: runningBalance
        };
        });
    };

  // Pie Chart Data
  const getCategoryBreakdown = () => {
    const data = {};

    transactions.forEach(t => {
      if (t.type === "Expense") {
        data[t.category] = (data[t.category] || 0) + t.amount;
      }
    });

    return Object.keys(data).map(key => ({
      name: key,
      value: data[key]
    }));
  };

  const addTransaction = (newTransaction) => {
    setTransactions(prev => [
        ...prev,
        { ...newTransaction, id: Date.now() }
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
} ;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        getTotalIncome,
        getTotalExpense,
        getBalanceTrendData,
        getCategoryBreakdown
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);