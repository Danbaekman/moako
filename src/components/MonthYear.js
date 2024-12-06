import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthYear = ({ currentDate, onChangeMonth, onSelectDate }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleDateString("ko-KR", { month: "long" });

  const handleDateChange = (date) => {
    setIsDatePickerOpen(false);
    onSelectDate(date);
  };

  return (
    <div className="relative bg-gray-100 w-full flex items-center justify-center px-4 rounded-md">
      {/* 왼쪽 버튼 */}
      <button
        onClick={() => onChangeMonth(-1)}
        className="absolute left-4 text-green-500 text-3xl hover:text-gray-300 transition"
      >
        <FaAngleLeft />
      </button>

      {/* 중앙 연도 및 월 */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-500">{currentMonth}</h2>
        <p className="text-lg text-green-700">{currentYear}</p>
      </div>

      {/* 오른쪽 버튼 */}
      <button
        onClick={() => onChangeMonth(1)}
        className="absolute right-16 text-green-500 text-3xl hover:text-gray-300 transition"
      >
        <FaAngleRight />
      </button>

      {/* 달력 아이콘 */}
      <button
        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        className="absolute right-4 text-green-500 text-3xl hover:text-gray-300 transition"
      >
        <FaCalendarAlt />
      </button>

      {/* 달력 */}
      {isDatePickerOpen && (
        <DatePicker
          selected={currentDate}
          onChange={handleDateChange}
          inline
          className="absolute top-full mt-2 bg-white shadow-lg rounded-md z-50"
        />
      )}
    </div>
  );
};

export default MonthYear;
