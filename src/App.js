import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DateCarousel from "./components/DateCarousel";
import AddTransaction from "./components/AddTransaction";
import AddExpense from "./components/AddExpense";
import TransactionTable from "./components/TransactionTable";
console.log("Before App rendering");

const App = () => {
  console.log("App is rendering");

  const [transactions, setTransactions] = useState([]); // 트랜잭션 데이터

  // 상태 변경 시마다 콘솔 출력
  useEffect(() => {
    console.log("Updated Transactions:", transactions);
  }, [transactions]);

  // 수입 추가
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, type: "입금" }]);
  };

  // 지출 추가
  const addExpense = (newExpense) => {
    setTransactions([...transactions, { ...newExpense, type: "지출" }]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-4">
        {/* 달력 */}
        <div className="max-w-4xl mx-auto">
          <DateCarousel />
        </div>

        {/* 골드 내역 추가와 지출 내역 추가 */}
        <div className="flex justify-between mt-4 max-w-4xl mx-auto">
          <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
            <AddTransaction addTransaction={addTransaction} />
          </div>
          <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
            <AddExpense addExpense={addExpense} />
          </div>
        </div>

        {/* 트랜잭션 테이블 */}
        <div className="mt-4 max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md">
          <TransactionTable transactions={transactions} />
        </div>
      </main>
    </div>
  );
};

export default App;
