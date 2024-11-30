import React from "react";

const InitialGoldSetting = ({
  initialBalance,
  currentBalance,
  handleInitialBalanceChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md w-[90%] max-w-[360px] mx-auto">
      <h2 className="text-lg font-bold mb-2">초기 보유 골드 설정</h2>
      <div className="flex items-center">
        {/* 텍스트와 아이콘 */}
        <label className="mr-2 font-bold flex items-center">
          내
          <img
            src="/assets/images/goldIcon.png" // 아이콘 경로
            alt="골드"
            className="w-5 h-5 ml-1" // 아이콘 크기 및 텍스트와 간격 조정
          />
          :
        </label>
        {/* 입력 필드 */}
        <div className="flex items-center border rounded p-1 bg-gray-50 h-8"> {/* h-8로 높이 조정 */}
          <input
            type="number"
            value={initialBalance}
            onChange={handleInitialBalanceChange}
            onFocus={(e) => {
              if (e.target.value === "0") e.target.value = "";
            }}
            onBlur={(e) => {
              if (e.target.value === "") e.target.value = 0;
            }}
            className="w-24 text-right pr-2 focus:outline-none bg-transparent h-full"
          />
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        현재 설정된 잔액: {currentBalance.toLocaleString()} G
      </p>
    </div>
  );
};

export default InitialGoldSetting;
