import React from "react";

const GoldList = ({ history }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="font-bold mb-2">최근 내역</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>{item.category} - {item.description}</span>
            <span className={`font-bold ${item.amount > 0 ? "text-green-500" : "text-red-500"}`}>
              {item.amount > 0 ? `+${item.amount}` : item.amount} G
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoldList;
