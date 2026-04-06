import React from "react";

const TransactionsTable = ({ data, isAdmin, onDelete }) => {
  return (
    <div className="bg-[#1e293b] rounded-xl overflow-x-auto">
      <table className="min-w-[500px] w-full text-left">

        <thead className="border-b border-gray-600">
          <tr>
            <th className="p-4">Date</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Category</th>
            <th className="p-4">Type</th>
            {isAdmin && <th className="p-4">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 5 : 4} className="text-center p-6 text-gray-400">
                No matching transactions found
              </td>
            </tr>
          ) : (
            data.map((t) => (
              <tr key={t.id} className="border-b border-gray-700">

                <td className="p-4">
                  {new Date(t.date).toLocaleDateString("en-IN")}
                </td>

                <td className="p-4">₹{t.amount}</td>

                <td className="p-4">{t.category}</td>

                <td className={`p-4 font-semibold ${
                  t.type === "Income" ? "text-green-400" : "text-red-400"}`}>
                    {t.type}
                </td>

                {isAdmin && (
                  <td className="p-4">
                    <button onClick={() => onDelete(t.id)} className="bg-red-500 px-3 py-1 
                    rounded text-white text-sm cursor-pointer">
                        Delete
                    </button>
                  </td>
                )}

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default TransactionsTable;