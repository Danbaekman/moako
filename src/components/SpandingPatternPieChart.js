import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const SpendingPatternPieChart = ({ transactions, CATEGORY_COLORS_MAP }) => {
  const categories = Object.keys(CATEGORY_COLORS_MAP);

  const pieData = categories
    .map((category) => {
      const totalCategorySpending = transactions
        .filter((tx) => tx.category === category && tx.type === "출금")
        .reduce((acc, tx) => acc + tx.amount, 0);
      return { name: category, value: totalCategorySpending };
    })
    .filter((item) => item.value > 0);

  const totalSpending = pieData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6">
      <h1 className="text-xl font-bold text-center mb-2">나의 소비 생활 패턴</h1>
      <div className="flex justify-between items-center">
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
                outerRadius={110}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#4A4A4A"
                      fontSize="10px"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {`${name}: ${(percent * 100).toFixed(1)}%`}
                    </text>
                  );
                }}
                labelLine={false}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS_MAP[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} G`} />
            </PieChart>
          </ResponsiveContainer>
          {/* 중앙 이미지 복원 */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <img
              src="/assets/images/mokokoButton.png"
              alt="모코코"
              className="w-[140px] h-[140px] object-cover rounded-full shadow-md"
            />
          </div>
        </div>

        <div className="flex-1 pl-4">
          <h2 className="text-lg mb-4">
            이번 달 총 지출 금액: {totalSpending.toLocaleString()} G
          </h2>
          {pieData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between mb-3 bg-gray-100 rounded-md px-4 py-2"
            >
              {/* 원형 아이콘 */}
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS_MAP[item.name] }}
              >
                <span style={{ fontSize: "10px", color: "#FFFFFF" }}>
                  {((item.value / totalSpending) * 100).toFixed(1)}%
                </span>
              </div>
              {/* 카테고리 이름 */}
              <span style={{ fontSize: "12px", color: "#000000", marginLeft: "8px" }}>
                {item.name}
              </span>
              {/* 지출 금액 */}
              <span style={{ fontSize: "15px", color: "#4A4A4A" }}>
                {item.value.toLocaleString()} G
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingPatternPieChart;
