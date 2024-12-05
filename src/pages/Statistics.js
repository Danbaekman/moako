import React from "react";
import SpendingPatternPieChart from "../components/SpendingPatternPieChart";
import GoldBarChart from "../components/GoldBarChart";

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
  return (
    <main className="flex p-4">
      {/* 좌측 여백 */}
      <div className="w-1/6 pr-4"></div>

      {/* 메인 콘텐츠 */}
      <div className="w-4/6 space-y-6">
        {/* 소비 생활 패턴 파이 차트 */}
        <SpendingPatternPieChart
          transactions={transactions}
          CATEGORY_COLORS_MAP={CATEGORY_COLORS_MAP}
        />

        {/* 골드 소비 추이 막대 그래프 */}
        <GoldBarChart weeklyChartData={weeklyChartData} />
      </div>

      {/* 우측 여백 */}
      <div className="w-1/6 pl-4"></div>
    </main>
  );
};

export default StatisticsPage;
