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
  const categories = ["영지 설치물 구매", "장비 재련", "기타 소비"];
  const pieData = [
    { name: categories[0], value: 3333 },
    { name: categories[1], value: 12122 },
    { name: categories[2], value: 12341 },
  ];

  const totalSpending = pieData.reduce((acc, item) => acc + item.value, 0);

  const weeklyChartData = [
    { week: "Week 1", income: 161207, expense: 123123 },
    { week: "Week 2", income: 141231, expense: 112312 },
    { week: "Week 3", income: 131231, expense: 110231 },
    { week: "Week 4", income: 151212, expense: 132312 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <main className="flex p-4">
      {/* 좌측 여백 */}
      <div className="w-1/6 pr-4"></div>

      {/* 메인 콘텐츠 */}
      <div className="w-4/6">
        {/* 소비 생활 패턴 상자 */}
        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center mb-6">소비 생활 패턴</h1>
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
                    fill="#8884d8"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} G`} />
                </PieChart>
              </ResponsiveContainer>
              {/* 도넛 중앙 이미지 */}
              <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <img
                  src="/assets/images/mokokoButton.png"
                  alt="모코코"
                  className="w-16 h-16 rounded-full shadow-md"
                />
              </div>
            </div>

            {/* 정보 영역 */}
            <div className="flex-1 pl-8">
              <h2 className="text-xl font-bold mb-4">
                이번 달 총 지출 금액: {totalSpending.toLocaleString()} G
              </h2>
              {pieData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-3 bg-gray-100 rounded-md px-4 py-2"
                >
                  {/* 항목 이름 */}
                  <span className="font-semibold">{item.name}</span>
                  {/* 퍼센트와 금액 */}
                  <div className="flex items-center gap-4">
                    <span>
                      {((item.value / totalSpending) * 100).toFixed(1)}%
                    </span>
                    <span>{item.value.toLocaleString()} G</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 주별 골드 그래프 상자 */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            주마다 얻은 골드와 소비한 골드
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={weeklyChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} G`} />
              <Legend />
              <Bar
                dataKey="income"
                fill="#4caf50"
                name="벌었던 골드"
                barSize={40}
              />
              <Bar
                dataKey="expense"
                fill="#f44336"
                name="소비한 골드"
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 우측 여백 */}
      <div className="w-1/6 pl-4"></div>
    </main>
  );
};

export default Statistics;
