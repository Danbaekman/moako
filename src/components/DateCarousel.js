import React, { useState, useEffect } from "react";
import MonthYear from "./MonthYear";

const dayIcons = {
  월: "/assets/images/monday.png",
  화: "/assets/images/tuesday.png",
  수: "/assets/images/wednesday.png",
  목: "/assets/images/thursday.png",
  금: "/assets/images/friday.png",
  토: "/assets/images/saturday.png",
  일: "/assets/images/sunday.png",
};

const getDateRange = (centerDate) => {
  const dates = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(centerDate);
    date.setDate(centerDate.getDate() + i);
    dates.push({
      fullDate: date.toISOString().slice(0, 10),
      day: date.getDate(),
      dayOfWeek: date.toLocaleDateString("ko-KR", { weekday: "short" }),
    });
  }
  return dates;
};

const DateCarousel = ({ onDateSelect, transactions }) => {
  const [centerDate, setCenterDate] = useState(new Date());
  const [dateRange, setDateRange] = useState(getDateRange(new Date()));

  useEffect(() => {
    setDateRange(getDateRange(centerDate));
  }, [centerDate]);

  const calculateIncomeExpense = (date) => {
    const filteredTransactions = transactions.filter((tx) => tx.date === date);

    const income = filteredTransactions
      .filter((tx) => tx.type === "입금")
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const expense = filteredTransactions
      .filter((tx) => tx.type === "출금")
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    return { income, expense };
  };

  const handleChangeMonth = (direction) => {
    const newCenterDate = new Date(centerDate);
    newCenterDate.setMonth(centerDate.getMonth() + direction);
    setCenterDate(newCenterDate);
  };

  const handleSelectDate = (date) => {
    setCenterDate(date);
    if (onDateSelect) {
      onDateSelect(date.toISOString().split("T")[0]);
    }
  };

  const handleDateClick = (selectedDate) => {
    setCenterDate(new Date(selectedDate));
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  const formatToMan = (amount) => {
    if (amount === 0) return "0"; // ✅ 금액이 0일 경우 "0"만 표시
    const man = amount / 10000;
    return man >= 1 ? `${Math.floor(man)}만` : `${man.toFixed(2)}만`;
  };
  
  

  return (
    <div className="flex flex-col items-center space-y-4 mx-auto">
      <MonthYear
        currentDate={centerDate}
        onChangeMonth={handleChangeMonth}
        onSelectDate={handleSelectDate}
      />

      <div className="flex items-center space-x-4 overflow-x-auto">
        {dateRange.map((item, index) => {
          const { income, expense } = calculateIncomeExpense(item.fullDate);
          const dayOfWeekIcon = dayIcons[item.dayOfWeek] || null;
          return (
            <div
              key={index}
              className={`flex flex-col items-center p-4 w-[127px] h-[200px] rounded-md shadow-md text-center cursor-pointer transition-all ${
                item.fullDate === centerDate.toISOString().slice(0, 10)
                  ? "bg-lime-200"
                  : "bg-white"
              }`}
              onClick={() => handleDateClick(item.fullDate)}
            >
              <h3 className="text-lg font-bold">{item.day}일</h3>
              {dayOfWeekIcon ? (
                <img
                  src={dayOfWeekIcon}
                  alt={`${item.dayOfWeek} 아이콘`}
                  className="w-24 h-24 mt-1"
                />
              ) : (
                <p className="text-sm text-gray-600">{item.dayOfWeek}</p>
              )}
              <div className="mt-2 w-full">
                <p className="text-blue-600 text-xs">
                  총 수입: {formatToMan(income)} G
                </p>
                <p className="text-red-600 text-xs">
                  총 지출: {formatToMan(expense)} G
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateCarousel;
