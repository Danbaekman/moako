import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // useLocation 추가
import Header from "./components/Header";
import DateCarousel from "./components/DateCarousel";
import AddTransaction from "./components/AddTransaction";
import AddExpense from "./components/AddExpense";
import TransactionTable from "./components/TransactionTable";
import InitialGoldSetting from "./components/InitialGoldSetting";
import MokokoStatisticsButton from "./components/MokokoStatisticsButton";
import Statistics from "./components/Statistics"; // 통계 페이지 컴포넌트 추가

const App = () => {
  const [transactions, setTransactions] = useState([]); // 트랜잭션 데이터
  const [initialBalance, setInitialBalance] = useState(0); // 초기 보유 골드
  const [currentBalance, setCurrentBalance] = useState(0); // 현재 잔액
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // 선택된 날짜 (기본값: 오늘)

  const location = useLocation(); // 현재 경로 가져오기

  useEffect(() => {
    const totalIncome = transactions
      .filter((tx) => tx.type === "입금")
      .reduce((acc, tx) => acc + (tx.amount || 0), 0);
    const totalExpense = transactions
      .filter((tx) => tx.type === "출금")
      .reduce((acc, tx) => acc + (tx.amount || 0), 0);

    setCurrentBalance(initialBalance + totalIncome - totalExpense);
  }, [transactions, initialBalance]);

  const handleInitialBalanceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInitialBalance(isNaN(value) ? 0 : value);
  };

  const addTransaction = (newTransaction) => {
    const updatedBalance = currentBalance + newTransaction.amount;
    setTransactions((prev) => [
      ...prev,
      { ...newTransaction, type: "입금", balance: updatedBalance },
    ]);
    setCurrentBalance(updatedBalance);
  };

  const addExpense = (newExpense) => {
    const updatedBalance = currentBalance - newExpense.amount;
    setTransactions((prev) => [
      ...prev,
      { ...newExpense, type: "출금", balance: updatedBalance },
    ]);
    setCurrentBalance(updatedBalance);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex p-4">
              <div className="w-1/6 pr-4">
                <InitialGoldSetting
                  initialBalance={initialBalance}
                  currentBalance={currentBalance}
                  handleInitialBalanceChange={handleInitialBalanceChange}
                />
              </div>
              <div className="w-4/6">
                <DateCarousel
                  onDateSelect={setSelectedDate}
                  transactions={transactions}
                />
                <div className="flex justify-between mt-4">
                  <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-bold text-center mb-4">
                      입금 내역 추가
                    </h2>
                    <AddTransaction
                      addTransaction={addTransaction}
                      selectedDate={selectedDate}
                    />
                  </div>
                  <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-bold text-center mb-4">
                      출금 내역 추가
                    </h2>
                    <AddExpense
                      addExpense={addExpense}
                      currentBalance={currentBalance}
                      selectedDate={selectedDate}
                    />
                  </div>
                </div>
                <div className="mt-4 bg-white p-4 rounded-md shadow-md">
                  <TransactionTable
                    transactions={transactions}
                    selectedDate={selectedDate}
                  />
                </div>
              </div>
              <div className="w-1/6 pl-4"></div>
            </main>
          }
        />
        <Route path="/statistics" element={<Statistics transactions={transactions} />} />
      </Routes>
      {/* 현재 경로가 /statistics가 아닌 경우에만 MokokoStatisticsButton 표시 */}
      {location.pathname !== "/statistics" && <MokokoStatisticsButton />}
    </div>
  );
};

export default App;
