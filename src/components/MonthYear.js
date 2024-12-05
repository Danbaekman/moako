import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const MonthYear = ({ currentDate, onChangeMonth }) => {
  // 연도와 월 추출
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleDateString("ko-KR", { month: "long" });

  return (
    <div className="relative bg-gray-100 w-full flex items-center justify-center px-4 rounded-md">
      {/* 왼쪽 버튼 */}
      <button
        onClick={() => onChangeMonth(-1)}
        className="absolute left-[calc(50%-100px)] text-green-500 text-3xl hover:text-gray-300 transition"
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
        className="absolute right-[calc(50%-100px)] text-green-500 text-3xl hover:text-gray-300 transition"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default MonthYear;
