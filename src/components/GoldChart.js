// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Chart.js의 필수 모듈을 등록해야 차트가 동작합니다.
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const GoldChart = ({ history }) => {
//   const data = {
//     labels: history.map((item) => new Date(item.date).toLocaleDateString()),
//     datasets: [
//       {
//         label: "골드 변동",
//         data: history.map((item) => item.amount),
//         backgroundColor: history.map((item) =>
//           item.amount > 0 ? "rgba(75, 192, 192, 0.5)" : "rgba(255, 99, 132, 0.5)"
//         ),
//       },
//     ],
//   };

//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <Bar data={data} />
//     </div>
//   );
// };

// export default GoldChart;
