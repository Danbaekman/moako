import React, { useState } from "react";

const AddTransaction = ({ addTransaction, selectedDate }) => {
  const [category, setCategory] = useState(""); // 카테고리 선택
  const [customTitle, setCustomTitle] = useState(""); // 직접 입력 제목
  const [amount, setAmount] = useState(0); // 금액 입력

  const handleAdd = () => {
    if (!category && (customTitle.trim() === "" || amount <= 0)) {
      alert("카테고리 또는 직접 입력 항목과 금액을 올바르게 입력해주세요.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      date: selectedDate,
      category: category || "직접 입력",
      subcategory: category || customTitle,
      amount: parseInt(amount, 10),
      type: "입금",
      dateTime: new Date().toISOString(), // 정확한 시간 정보 포함
    };

    addTransaction(newTransaction);

    // 입력 필드 초기화
    setCategory("");
    setCustomTitle("");
    setAmount(0);
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto space-y-4">
      {/* 카테고리 선택 */}
      <div>
        <label className="block font-bold mb-2">카테고리:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">카테고리 선택</option>
          <option value="레이드">레이드</option>
          <option value="생활">생활</option>
        </select>
      </div>

      {/* 직접 입력 */}
      {!category && (
        <div>
          <label className="block font-bold mb-2">직접 입력:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="(예: 모험섬)"
              className="border p-2 rounded w-1/2"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
              placeholder="금액 입력"
              className="border p-2 rounded w-1/2 text-gray-600"
            />
          </div>
        </div>
      )}

      {/* 금액 입력 (카테고리 선택 시) */}
      {category && (
        <div>
          <label className="block font-bold mb-2">금액:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
            placeholder="금액 입력"
            className="border p-2 rounded w-full text-gray-600"
          />
        </div>
      )}

      {/* 추가 버튼 */}
      <button
        onClick={handleAdd}
        className="w-full text-white bg-green-500 p-2 rounded"
      >
        추가
      </button>
    </div>
  );
};

export default AddTransaction;
