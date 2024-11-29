import React from "react";
import GoldChart from "../components/GoldChart";

const Analytics = ({ history }) => {
  return (
    <div className="analytics">
      <h2>골드 분석</h2>
      <GoldChart history={history} />
    </div>
  );
};

export default Analytics;
