import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DateCarousel from "./components/DateCarousel";
import AddTransaction from "./components/AddTransaction";
import AddExpense from "./components/AddExpense";
import TransactionTable from "./components/TransactionTable";

const App = () => {
  const [transactions, setTransactions] = useState([]); // 트랜잭션 데이터
  const [initialBalance, setInitialBalance] = useState(0); // 초기 보유 골드
  const [currentBalance, setCurrentBalance] = useState(0); // 현재 잔액
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // 선택된 날짜 (기본값: 오늘)

  // 잔액 업데이트 로직
  useEffect(() => {
    const totalIncome = transactions
      .filter((tx) => tx.type === "입금")
      .reduce((acc, tx) => acc + (tx.amount || 0), 0); // 입금 합산
    const totalExpense = transactions
      .filter((tx) => tx.type === "출금")
      .reduce((acc, tx) => acc + (tx.amount || 0), 0); // 지출 합산

    setCurrentBalance(initialBalance + totalIncome - totalExpense);
  }, [transactions, initialBalance]);

  // 입금 데이터 추가
  const addTransaction = (newTransaction) => {
    const updatedBalance = currentBalance + newTransaction.amount; // 잔액 계산
    setTransactions((prev) => [
      ...prev,
      { ...newTransaction, type: "입금", balance: updatedBalance },
    ]);
    setCurrentBalance(updatedBalance);
  };

  // 지출 데이터 추가
  const addExpense = (newExpense) => {
    const updatedBalance = currentBalance - newExpense.amount; // 잔액 계산
    setTransactions((prev) => [
      ...prev,
      { ...newExpense, type: "출금", balance: updatedBalance },
    ]);
    setCurrentBalance(updatedBalance);
  };

  const handleInitialBalanceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInitialBalance(isNaN(value) ? 0 : value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-4">
        {/* 초기 보유 골드 설정 */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md mb-4">
          <h2 className="text-lg font-bold mb-2">초기 보유 골드 설정</h2>
          <div className="flex items-center">
            <label className="mr-2 font-bold">보유 골드:</label>
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
              className="border rounded p-2 w-1/2"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            현재 설정된 잔액: {currentBalance.toLocaleString()} G
          </p>
        </div>

        {/* 날짜 선택 */}
        <div className="max-w-4xl mx-auto">
          <DateCarousel onDateSelect={setSelectedDate} transactions={transactions} />
        </div>

        {/* 입출금 내역 추가 */}
        <div className="flex justify-between mt-4 max-w-4xl mx-auto">
          <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">입금 내역 추가</h2>
            <AddTransaction 
              addTransaction={addTransaction}
              selectedDate={selectedDate} />
          </div>
          <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">출금 내역 추가</h2>
            <AddExpense addExpense={addExpense}
            currentBalance={currentBalance} 
            selectedDate={selectedDate} />
          </div>
        </div>

        {/* 골드 입출금 내역 */}
        <div className="mt-4 max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md">
          <TransactionTable transactions={transactions} selectedDate={selectedDate} />
        </div>
      </main>
    </div>
  );
};

export default App;
