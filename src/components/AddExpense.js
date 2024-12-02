import React, { useState } from "react";

const AddExpense = ({ addExpense, selectedDate, currentBalance }) => {
  const [category, setCategory] = useState(""); // 카테고리 선택
  const [customTitle, setCustomTitle] = useState(""); // 직접 입력 제목
  const [customAmount, setCustomAmount] = useState(0); // 직접 입력 금액
  const [amount, setAmount] = useState(0); // 카테고리 금액 입력

  // 카테고리 데이터
  const categories = ["아바타 구매", "영지 설치물 구매", "재련 재료 구매", "장비 재련", "악세서리 구매"];

  const handleAdd = () => {
    const expenseAmount = category
      ? parseInt(amount, 10)
      : parseInt(customAmount, 10);

    if (category && amount <= 0) {
      alert("금액은 0보다 커야 합니다.");
      return;
    }
    if (expenseAmount > currentBalance) {
      alert("출금 금액이 현재 보유 수량보다 많습니다.");
      return;
    }

    if (!category && (customTitle.trim() === "" || customAmount <= 0)) {
      alert("직접 입력 항목과 금액을 올바르게 입력해주세요.");
      return;
    }

    // 지출 데이터 생성
    const expense = {
      id: Date.now(),
      category: category || "직접 입력",
      subcategory: category || customTitle,
      amount: category ? parseInt(amount, 10) : parseInt(customAmount, 10),
      date: selectedDate,
      type: "출금",
    };

    addExpense(expense);

    // 입력 필드 초기화
    setCategory("");
    setCustomTitle("");
    setCustomAmount(0);
    setAmount(0);
  };

  // onFocus 및 onBlur 핸들러: 입력 필드 초기값 처리
  const handleFocus = (setter) => (e) => {
    if (e.target.value === "0") setter("");
  };

  const handleBlur = (setter) => (e) => {
    if (e.target.value === "") setter(0);
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
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 금액 입력 (카테고리 항목) */}
        {category && (
          <div>
            <label className="block font-bold mb-2">금액:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
              onFocus={handleFocus(setAmount)}
              onBlur={handleBlur(setAmount)}
              placeholder="금액 입력"
              className="border p-2 rounded w-full text-gray-600"
            />
          </div>
        )}

        {/* 직접 입력 */}
        {!category && (
          <div>
            <label className="block font-bold mb-2">직접 입력:</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="(예: 상중 목걸이 구매)"
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                value={customAmount}
                onChange={(e) =>
                  setCustomAmount(parseInt(e.target.value, 10) || 0)
                }
                onFocus={handleFocus(setCustomAmount)}
                onBlur={handleBlur(setCustomAmount)}
                placeholder="금액 입력"
                className="border p-2 rounded w-1/2 text-gray-600"
              />
            </div>
          </div>
        )}

        {/* 추가 버튼 */}
        <button
          onClick={handleAdd}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          추가
        </button>
    </div>
  );
};

export default AddExpense;
