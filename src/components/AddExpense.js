import React, { useState } from "react";

const AddExpense = ({ addExpense }) => {
  const [category, setCategory] = useState(""); // 카테고리 선택
  const [subcategory, setSubcategory] = useState(""); // 세부 항목 선택
  const [amount, setAmount] = useState(0); // 금액 입력
  const [customSubcategory, setCustomSubcategory] = useState(""); // 기타 세부 항목 (사용자 입력)

  // 카테고리별 세부 항목 데이터
  const subcategories = {
    스펙업: ["재련 재료 구매", "장비 재련", "악세서리 구매", "기타"],
    꾸미기: ["아바타 구매", "영지 설치물 구매", "기타"],
    기타: ["사용자 입력"],
  };

  const handleAdd = () => {
    console.log("Amount Before Adding:", amount); // 디버깅용
    const expense = {
      id: Date.now(),
      category,
      subcategory: subcategory === "기타" ? customSubcategory : subcategory,
      amount: parseInt(amount, 10),
      date: new Date().toISOString(),
      type: "지출",
    };
    addExpense(expense);

    // 초기화
    setCategory("");
    setSubcategory("");
    setCustomSubcategory("");
    setAmount(0);
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4">지출 내역 추가</h2>

      {/* 카테고리 선택 */}
      <div className="mb-4">
        <label className="block mb-2 font-bold">카테고리:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">카테고리 선택</option>
          {Object.keys(subcategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 세부 항목 선택 */}
      {category && (
        <div className="mb-4">
          <label className="block mb-2 font-bold">세부 항목:</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">세부 항목 선택</option>
            {subcategories[category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          {/* 기타 항목 입력 */}
          {subcategory === "기타" && (
            <input
              type="text"
              value={customSubcategory}
              onChange={(e) => setCustomSubcategory(e.target.value)}
              placeholder="세부 항목 입력"
              className="border p-2 rounded w-full mt-2"
            />
          )}
        </div>
      )}

      {/* 금액 입력 */}
      <div className="mb-4">
        <label className="block mb-2 font-bold">금액:</label>
        <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
            className="border p-2 rounded w-full"
            />
      </div>

      {/* 추가 버튼 */}
      <button
        onClick={handleAdd}
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={!category || !subcategory || !amount}
      >
        추가
      </button>
    </div>
  );
};

export default AddExpense;
