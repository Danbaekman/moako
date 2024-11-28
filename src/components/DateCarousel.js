import React, { useState, useEffect } from "react";

// 날짜 계산 함수 (중앙 날짜 기준)
const getDateRange = (centerDate) => {
  const dates = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(centerDate);
    date.setDate(centerDate.getDate() + i); // 기준 날짜에서 i일 더하거나 빼기
    dates.push({
      fullDate: date.toISOString().slice(0, 10), // YYYY-MM-DD 형식
      day: date.getDate(), // 일자
      dayOfWeek: date.toLocaleDateString("ko-KR", { weekday: "short" }), // 요일
      income: Math.floor(Math.random() * 5000) || 0, // 샘플 데이터: 수입 (기본값 0)
      expense: Math.floor(Math.random() * 4000) || 0, // 샘플 데이터: 지출 (기본값 0)
    });
  }
  return dates;
};

const DateCarousel = ({ onDateSelect }) => {
  const [centerDate, setCenterDate] = useState(new Date()); // 현재 날짜
  const [dateRange, setDateRange] = useState(getDateRange(new Date()));

  // centerDate가 변경될 때마다 dateRange 재계산
  useEffect(() => {
    setDateRange(getDateRange(centerDate));
  }, [centerDate]);

  // 연도와 월 추출
  const currentYear = centerDate.getFullYear();
  const currentMonth = centerDate.toLocaleDateString("ko-KR", { month: "long" }); // 8월 형식

  const handleDateClick = (selectedDate) => {
    const newCenterDate = new Date(selectedDate);
    setCenterDate(newCenterDate);
    if (onDateSelect) {
      onDateSelect(newCenterDate);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto">
      {/* 연도와 월 */}
      <div className="text-center">
        <h2 className="text-4xl font-bold">{currentMonth}</h2>
        <p className="text-lg text-gray-600">{currentYear}</p>
      </div>

      {/* 날짜 카드 */}
      <div className="flex items-center space-x-4 overflow-x-auto">
        {dateRange.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 w-[100px] rounded-md shadow-md text-center cursor-pointer transition-all ${
              item.fullDate === centerDate.toISOString().slice(0, 10)
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleDateClick(item.fullDate)}
          >
            {/* 날짜와 요일 */}
            <h3 className="text-lg font-bold">{item.day}일</h3>
            <p className="text-sm text-gray-600">{item.dayOfWeek}</p>

            {/* 수입과 지출 */}
            <div className="mt-2">
              <p className="text-sm text-green-600">
                입금: {(item.income || 0).toLocaleString()} G
              </p>
              <p className="text-sm text-red-600">
                지출: {(item.expense || 0).toLocaleString()} G
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateCarousel;
