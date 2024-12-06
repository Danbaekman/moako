import React, { useState, useEffect } from "react";
import SpendingPatternPieChart from "../components/SpendingPatternPieChart";
import GoldBarChart from "../components/GoldBarChart";
import MonthYear from "../components/MonthYear";

const CATEGORY_COLORS_MAP = {
  "재련 재료 구매": "#8b5cf6",
  "장비 재련": "#eab308",
  "보석 구매": "#ec4899",
  "악세서리 구매": "#32CD32",
  "초월": "#1E90FF",
  "엘릭서": "#8A2BE2",
  "카르마": "#FF69B4",
  "아바타 구매": "#FFA500",
  "탈 것 구매": "#4682B4",
  "기타 소비": "#A9A9A9",
};

const StatisticsPage = ({ transactions, weeklyChartData }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 선택된 날짜
  const [filteredTransactions, setFilteredTransactions] = useState([]); // 필터링된 트랜잭션
  const [filteredWeeklyChartData, setFilteredWeeklyChartData] = useState([]); // 필터링된 주간 데이터

  // 날짜 변경 핸들러
  const handleChangeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction); // 월 변경
    setCurrentDate(newDate);
  };

  // 트랜잭션 데이터 필터링
  useEffect(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // 해당 월의 트랜잭션 필터링
    const filtered = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
    });

    setFilteredTransactions(filtered);

    // 주간 데이터 필터링
    const weeklyFiltered = weeklyChartData.filter((weekData) => {
      const [year, month] = weekData.week.split("-").map((value) => parseInt(value, 10));
      return month === currentMonth + 1 && year === currentYear; // month는 1부터 시작하므로 +1
    });

    setFilteredWeeklyChartData(weeklyFiltered);
  }, [currentDate, transactions, weeklyChartData]);

  return (
    <main className="flex p-4">
      {/* 좌측 여백 */}
      <div className="w-1/6 pr-4"></div>

      {/* 메인 콘텐츠 */}
      <div className="w-4/6 space-y-6">
        {/* 날짜 변경 컴포넌트 */}
        <MonthYear currentDate={currentDate} onChangeMonth={handleChangeMonth} />

        {/* 소비 생활 패턴 파이 차트 */}
        <SpendingPatternPieChart
          transactions={filteredTransactions}
          CATEGORY_COLORS_MAP={CATEGORY_COLORS_MAP}
        />

        {/* 골드 소비 추이 막대 그래프 */}
        <GoldBarChart weeklyChartData={filteredWeeklyChartData} />
      </div>

      {/* 우측 여백 */}
      <div className="w-1/6 pl-4"></div>
    </main>
  );
};

export default StatisticsPage;
