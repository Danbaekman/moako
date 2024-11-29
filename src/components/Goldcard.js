import React from "react";

const GoldCard = ({ currentGold }) => {
  return (
    <div className="gold-card">
      <h3>현재 골드</h3>
      <p>{currentGold.toLocaleString()} G</p>
    </div>
  );
};

export default GoldCard;
