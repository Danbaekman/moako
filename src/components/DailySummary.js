import React from "react";

const DailySummary = ({ dailyData }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {dailyData.map((day, index) => (
        <div
          key={index}
          className="bg-green-100 p-4 rounded-md shadow-md text-center min-w-[120px]"
        >
          <h3 className="text-md font-bold">{day.date}</h3>
          <p className="text-green-600 font-bold">수입: {day.income} G</p>
          <p className="text-red-600 font-bold">지출: {day.expense} G</p>
        </div>
      ))}
    </div>
  );
};

export default DailySummary;
