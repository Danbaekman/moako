import React, { useState } from "react";

const AddTransaction = ({ addTransaction }) => {
  const [raid, setRaid] = useState(0);
  const [life, setLife] = useState(0);
  const [etc, setEtc] = useState(0);

  const handleAdd = () => {
    const total = parseInt(raid) + parseInt(life) + parseInt(etc);

    addTransaction({
      id: Date.now(),
      date: new Date().toISOString(),
      raid: parseInt(raid),
      life: parseInt(life),
      etc: parseInt(etc),
      total,
      type: "입금", // '입금'으로 명시
    });

    // 입력 필드 초기화
    setRaid(0);
    setLife(0);
    setEtc(0);
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">골드 내역 추가</h2>
      <div className="flex items-center mb-4">
        <span className="w-1/6 text-center">아이콘</span>
        <label className="w-1/4">레이드:</label>
        <input
          type="number"
          value={raid}
          onChange={(e) => setRaid(e.target.value)}
          className="border rounded w-1/2 p-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <span className="w-1/6 text-center">아이콘</span>
        <label className="w-1/4">생활:</label>
        <input
          type="number"
          value={life}
          onChange={(e) => setLife(e.target.value)}
          className="border rounded w-1/2 p-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <span className="w-1/6 text-center">아이콘</span>
        <label className="w-1/4">기타:</label>
        <input
          type="number"
          value={etc}
          onChange={(e) => setEtc(e.target.value)}
          className="border rounded w-1/2 p-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <span className="w-1/6 text-center"></span>
        <label className="w-1/4 font-bold">총계:</label>
        <input
          type="text"
          value={parseInt(raid) + parseInt(life) + parseInt(etc) || 0}
          readOnly
          className="border rounded w-1/2 p-2 bg-gray-100"
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        추가
      </button>
    </div>
  );
};

export default AddTransaction;
