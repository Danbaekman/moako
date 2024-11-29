import React, { useState } from "react";
import goldIcon from "../assets/images/goldIcon.png";

const TransactionTable = ({ transactions, selectedDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [selectedPeriod, setSelectedPeriod] = useState("3개월"); // 조회 기간
  const [selectedType, setSelectedType] = useState("전체"); // 거래 유형
  const [selectedSortOrder, setSelectedSortOrder] = useState("최신순"); // 정렬 순서

  // 모달 토글
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 모달 내 선택 변경
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSortOrderChange = (order) => {
    setSelectedSortOrder(order);
  };

  // 필터링된 거래 데이터 계산
  const filterTransactions = () => {
    const now = new Date();
    const filtered = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
  
      // 기간 필터
      if (selectedPeriod !== "전체") {
        const diffInDays = (now - txDate) / (1000 * 60 * 60 * 24); // 날짜 차이 계산
        if (selectedPeriod === "오늘" && diffInDays >= 1) return false;
        if (selectedPeriod === "1개월" && diffInDays > 30) return false;
        if (selectedPeriod === "3개월" && diffInDays > 90) return false;
        if (selectedPeriod === "6개월" && diffInDays > 180) return false;
      }
  
      // 거래 유형 필터
      if (selectedType !== "전체" && selectedType.trim() !== tx.type.trim()) {
        return false;
      }
  
      return true; // 필터 조건 통과
    });
  
    // 정렬 필터
    const sorted = filtered.sort((a, b) => {
      if (selectedSortOrder === "최신순") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
  
    return sorted;
  };
  

  const filteredTransactions = filterTransactions();
  console.log("Filtered Transactions: ", filteredTransactions);

  return (
    <div className="">
      {/* 필터 버튼과 제목 */}
      <div className="flex flex-col items-start mb-4">
        <button
          onClick={toggleModal}
          className="text-blue-500 underline hover:text-blue-700 mb-2"
        >
          {selectedPeriod} • {selectedType} • {selectedSortOrder} ▼
        </button>
        <h2 className="text-xl font-bold">골드 입출금 내역</h2>
      </div>

      {/* 모달창 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-bold mb-4">조회 조건 설정</h3>

            {/* 기간 선택 */}
            <div className="mb-4">
              <label className="block font-bold mb-2">조회 기간</label>
              <div className="space-y-2">
                {["오늘", "1개월", "3개월", "6개월", "전체"].map((period) => (
                  <button
                    key={period}
                    className={`block w-full text-left p-2 rounded ${
                      selectedPeriod === period
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handlePeriodChange(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* 거래 유형 선택 */}
            <div className="mb-4">
              <label className="block font-bold mb-2">거래 유형</label>
              <div className="space-y-2">
                {["전체", "입금", "출금"].map((type) => (
                  <button
                    key={type}
                    className={`block w-full text-left p-2 rounded ${
                      selectedType === type
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handleTypeChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 정렬 순서 선택 */}
            <div className="mb-4">
              <label className="block font-bold mb-2">정렬 순서</label>
              <div className="space-y-2">
                {["최신순", "과거순"].map((order) => (
                  <button
                    key={order}
                    className={`block w-full text-left p-2 rounded ${
                      selectedSortOrder === order
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handleSortOrderChange(order)}
                  >
                    {order}
                  </button>
                ))}
              </div>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={toggleModal}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 거래 내역 */}
      <div className="divide-y divide-gray-200">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className={`py-4 flex justify-between items-center hover:bg-gray-50 transition ${
              tx.date === selectedDate ? "bg-yellow-100" : ""
            }`}
          >
            {/* 날짜 */}
            <div className="text-gray-600 text-sm w-1/4">
              {new Date(tx.date).toLocaleDateString("ko-KR")}
            </div>

            {/* 카테고리 */}
            <div className="text-gray-800 text-sm w-1/2 text-center">
              {tx.subcategory || tx.category || "항목 없음"}
            </div>

            {/* 금액 */}
            <div className="w-1/4 text-right">
              <div
                className={`font-bold ${
                  tx.type === "입금" ? "text-blue-600" : "text-red-600"
                }`}
              >
                {tx.type}: {tx.amount.toLocaleString()} G{" "}
                <img
                  src={goldIcon}
                  alt="골드"
                  className="inline h-5 w-5 ml-1"
                />
              </div>
              <div className="text-sm text-gray-500">
                잔액: {tx.balance ? tx.balance.toLocaleString() : "0"} G
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
