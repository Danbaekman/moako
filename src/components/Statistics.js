import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Statistics = ({ transactions }) => {
  const categories = [
    "재련 재료 구매",
    "장비 재련",
    "보석 구매",
    "악세서리 구매",
    "초월",
    "엘릭서",
    "카르마",
    "아바타 구매",
    "탈 것 구매",
    "기타 소비",
  ];

  // Pie Chart 데이터 생성 (지출 값이 0인 항목 제거)
  const pieData = categories
    .map((category) => {
      const totalCategorySpending = transactions
        .filter((tx) => tx.category === category && tx.type === "출금")
        .reduce((acc, tx) => acc + tx.amount, 0);
      return { name: category, value: totalCategorySpending };
    })
    .filter((item) => item.value > 0); // 지출 값이 0인 항목 제거

  // 총 지출 계산
  const totalSpending = pieData.reduce((acc, item) => acc + item.value, 0);

  // 주별 데이터 생성
  const weeklyChartData = (() => {
    const weeks = {};

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const weekNumber = Math.ceil((txDate.getDate() + new Date(txDate.getFullYear(), txDate.getMonth(), 1).getDay()) / 7);
      const weekKey = `${txDate.getFullYear()}-${txDate.getMonth() + 1}-Week ${weekNumber}`;

      if (!weeks[weekKey]) {
        weeks[weekKey] = { week: weekKey, income: 0, expense: 0 };
      }

      if (tx.type === "입금") {
        weeks[weekKey].income += tx.amount;
      } else if (tx.type === "출금") {
        weeks[weekKey].expense += tx.amount;
      }
    });

    return Object.values(weeks);
  })();

  const totalIncome = weeklyChartData.reduce((acc, week) => acc + week.income, 0);
  const totalExpense = weeklyChartData.reduce((acc, week) => acc + week.expense, 0);

  const averageExpense = totalExpense / weeklyChartData.length || 0;
  const averageIncome = totalIncome / weeklyChartData.length || 0;

  const incomeExpenseRatio = [
    { name: "수익", value: totalIncome },
    { name: "지출", value: totalExpense },
  ];

  const CATEGORY_COLORS = [
    "#FF8C00", // 재련 재료 구매
    "#32CD32", // 장비 재련
    "#FFD700", // 보석 구매
    "#32CD32", // 악세서리 구매
    "#1E90FF", // 초월
    "#8A2BE2", // 엘릭서
    "#FF69B4", // 카르마
    "#FFA500", // 아바타 구매
    "#4682B4", // 탈 것 구매
    "#A9A9A9", // 기타 소비
  ];
  const RATIO_COLORS = ["#0088FE", "#FF4C4C"]; // 수익: 파란색, 지출: 빨간색

  // 동적 메시지 생성
  const generateMessage = () => {
    if (totalIncome === 0 && totalExpense === 0) {
      return "아직 정보가 없습니다.";
    }

    const incomePercentage = (totalIncome / (totalIncome + totalExpense)) * 100 || 0;
    const expensePercentage = (totalExpense / (totalIncome + totalExpense)) * 100 || 0;

    if (expensePercentage > incomePercentage) {
      const diff = ((expensePercentage - incomePercentage) / incomePercentage) * 100 || 0;
      return `지출 퍼센트가 수익 퍼센트에 비해 ${diff.toFixed(1)}% 더 많습니다. 이대로라면 ${
        Math.ceil(totalIncome / averageExpense) || 1
      }주 후 골드가 바닥날 수 있습니다.`;
    } else {
      const diff = ((incomePercentage - expensePercentage) / expensePercentage) * 100 || 0;
      return `수익 퍼센트가 지출 퍼센트에 비해 ${diff.toFixed(1)}% 더 많습니다. 여유롭게 관리되고 있습니다.`;
    }
  };

  return (
    <main className="flex p-4">
      {/* 좌측 여백 */}
      <div className="w-1/6 pr-4"></div>

      {/* 메인 콘텐츠 */}
      <div className="w-4/6">
        {/* 소비 생활 패턴 상자 */}
        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <h1 className="text-xl font-bold text-center mb-2">나의 소비 생활 패턴</h1>
          <div className="flex justify-between items-center">
            {/* 원형 그래프 */}
            <div className="relative flex-1 flex justify-center items-center">
              <ResponsiveContainer width="80%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    label={({ name, percent }) => (
                      <text
                        style={{
                          fontSize: "12px",
                          fill: "#4A4A4A", // 짙은 회색
                        }}
                      >
                        {name}: {(percent * 100).toFixed(1)}%
                      </text>
                    )}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} G`} />
                </PieChart>
              </ResponsiveContainer>
              {/* 도넛 중앙 이미지 */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <img
                  src="/assets/images/mokokoButton.png"
                  alt="모코코"
                  className="w-[140px] h-[140px] object-cover rounded-full shadow-md"
                />
              </div>
            </div>

            {/* 정보 영역 */}
            <div className="flex-1 pl-2">
              <h2 className="text-lg mb-4">
                이번 달 총 지출 금액: {totalSpending.toLocaleString()} G
              </h2>
              {pieData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-3 bg-gray-100 rounded-md px-4 py-2"
                >
                  <span
                    className="font-semibold"
                    style={{
                      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                    }}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: "12px", color: "#4A4A4A" }}>
                      {((item.value / totalSpending) * 100).toFixed(1)}%
                    </span>
                    <span style={{ fontSize: "12px", color: "#4A4A4A" }}>
                      {item.value.toLocaleString()} G
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 주별 골드 흐름 및 수익-소비 비율 상자 */}
        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <h1 className="text-xl font-bold text-center mb-6">골드 소비 추이</h1>
          <div className="flex">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value.toLocaleString()} G`} />
                  <Legend />
                  <Bar dataKey="income" fill={RATIO_COLORS[0]} name="수익" barSize={40} />
                  <Bar dataKey="expense" fill={RATIO_COLORS[1]} name="지출" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 수익-소비 비율 원형 그래프 */}
            <div className="flex-1 flex justify-center items-center">
              <ResponsiveContainer width="80%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeExpenseRatio}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => (
                      <text
                        style={{
                          fontSize: "12px",
                          fill: "#4A4A4A",
                        }}
                      >
                        {name}: {(percent * 100).toFixed(1)}%
                      </text>
                    )}
                  >
                    {incomeExpenseRatio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={RATIO_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} G`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-500">{generateMessage()}</div>
        </div>

        {/* 귀여운 문구 */}
        <div className="text-center mt-4 text-green-600 font-bold">
          모아코와 함께 탄탄한 원정대를 구성해보아요!
        </div>
      </div>

      {/* 우측 여백 */}
      <div className="w-1/6 pl-4"></div>
    </main>
  );
};

export default Statistics;
