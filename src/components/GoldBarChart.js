import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const GoldBarChart = ({ weeklyChartData }) => {
  const RATIO_COLORS = { income: "#22c55e", expense: "#f9a8d4" }; // 수익: green-500, 지출: pink-300

  // 4개의 주차 고정값 생성
  const fixedWeeks = [
    "2024-12-Week 1",
    "2024-12-Week 2",
    "2024-12-Week 3",
    "2024-12-Week 4",
  ];

  const formattedData = fixedWeeks.map((week) => {
    const existingWeekData = weeklyChartData.find((data) => data.week === week);
    return existingWeekData || { week, income: 0, expense: 0 };
  });

  // 주차 라벨 포맷터
  const formatWeekLabel = (week) => {
    const [, year, month, weekNumber] = week.match(/(\d+)-(\d+)-Week (\d+)/);
    return `${year}년 ${month}월 ${weekNumber}주차`;
  };

  // 이번 달 수익 및 지출 계산
  const thisMonthIncome = formattedData.reduce((acc, week) => acc + week.income, 0);
  const thisMonthExpense = formattedData.reduce((acc, week) => acc + week.expense, 0);

  // 수익 대비 지출 퍼센트 계산
  const expensePercentage = ((thisMonthExpense / thisMonthIncome) * 100).toFixed(1);

  // 지난달 데이터 추출 (예: 2024년 11월)
  const lastMonthData = weeklyChartData.filter((data) =>
    data.week.includes("2024-11")
  );

  // 지난달 지출 계산
  const lastMonthExpense = lastMonthData.reduce((acc, week) => acc + week.expense, 0);

  // 지난달 대비 지출 차이 계산
  const expenseDifference = thisMonthExpense - lastMonthExpense;

  // 메시지 생성
  const expenseMessage =
    expenseDifference > 0
      ? `모험가님, 지난달보다 ${expenseDifference.toLocaleString()}G 더 지출했습니다.`
      : `모험가님, 지난달보다 ${Math.abs(expenseDifference).toLocaleString()}G 덜 지출했습니다.`;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">골드 소비 추이</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-sm mr-2"
              style={{ backgroundColor: RATIO_COLORS.income }}
            ></div>
            <span className="text-sm">수입</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-sm mr-2"
              style={{ backgroundColor: RATIO_COLORS.expense }}
            ></div>
            <span className="text-sm">지출</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            tickFormatter={formatWeekLabel} // X축 라벨 포맷터
          />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()} G`} />
          <Legend />
          <Bar
            dataKey="income"
            fill={RATIO_COLORS.income}
            name="수입"
            barSize={40}
          />
          <Bar
            dataKey="expense"
            fill={RATIO_COLORS.expense}
            name="지출"
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-gray-700 text-sm">
          이번 달 지출은 총 {thisMonthExpense.toLocaleString()}G이며, 수익 대비 {expensePercentage}%입니다.
        </p>
        <p className="text-gray-700 text-sm">{expenseMessage}</p>
      </div>
    </div>
  );
};

export default GoldBarChart;

           
