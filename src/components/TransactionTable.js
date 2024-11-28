import React, { useState } from "react";
import goldIcon from "../assets/images/goldIcon.png";

const TransactionTable = ({ transactions }) => {
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);

  const toggleDetails = (id) => {
    setExpandedTransactionId(expandedTransactionId === id ? null : id);
  };


  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">골드 입 출금 내역</h2>
      <div className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <div key={tx.id} className="py-4">
            {/* 기본 정보 */}
            <div className="flex justify-between items-center hover:bg-gray-50 transition">
              <div className="text-gray-600 text-sm w-1/4">{tx.date || "날짜 없음"}</div>
              <div className="w-1/4 text-right">
                <div
                  className={`font-bold ${
                    tx.type === "입금" ? "text-blue-600" : "text-red-600"
                  }`}
                >
                  {tx.type}{" "}
                  <img src={goldIcon} alt="골드" className="inline h-5 w-5 ml-1" />
                  {(tx.total || 0 || tx.amount).toLocaleString()} G
                </div>
                <div className="text-sm text-gray-500">
                  잔액 {(tx.balance || 0).toLocaleString()} G
                </div>
              </div>
              <button
                onClick={() => toggleDetails(tx.id)}
                className="text-sm text-blue-500 hover:underline"
              >
                {expandedTransactionId === tx.id ? "닫기" : "상세 보기"}
              </button>
            </div>

            {/* 상세 항목 */}
            {expandedTransactionId === tx.id && (
              <div className="mt-2 pl-8 text-sm text-gray-700">
                {tx.details && tx.details.length > 0 ? (
                  tx.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div className="w-1/4">{detail.category}</div>
                      <div className="w-1/4 text-right font-bold">
                        <img
                          src={goldIcon}
                          alt="골드"
                          className="inline h-5 w-5 ml-1"
                        />
                        {detail.amount.toLocaleString()} G
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">세부 항목이 없습니다.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
