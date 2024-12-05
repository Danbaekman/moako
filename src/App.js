import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // useLocation 추가
import Header from "./components/Header";
import DateCarousel from "./components/DateCarousel";
import AddTransaction from "./components/AddTransaction";
import AddExpense from "./components/AddExpense";
import TransactionTable from "./components/TransactionTable";
import InitialGoldSetting from "./components/InitialGoldSetting";
import MokokoStatisticsButton from "./components/MokokoStatisticsButton";
import Statistics from "./pages/Statistics";

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
    setTransactions((prev) =>
      [...prev, { ...newTransaction, type: "입금", balance: updatedBalance }].sort(
        (a, b) => new Date(b.dateTime || b.date) - new Date(a.dateTime || a.date)
      )
    );
    setCurrentBalance(updatedBalance);
  };
  

  const addExpense = (newExpense) => {
    const updatedBalance = currentBalance - newExpense.amount;
    setTransactions((prev) =>
      [...prev, { ...newExpense, type: "출금", balance: updatedBalance }].sort(
        (a, b) => new Date(b.dateTime || b.date) - new Date(a.dateTime || a.date)
      )
    );
    setCurrentBalance(updatedBalance);
  };
  
  const weeklyChartData = (() => {
    const weeks = {};
  
    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
  
      // 주차 계산
      const weekNumber = Math.ceil(
        (txDate.getDate() + new Date(txDate.getFullYear(), txDate.getMonth(), 1).getDay()) / 7
      );
  
      // `weekKey`는 연도와 월, 그리고 주차를 결합한 값
      const weekKey = `${txDate.getFullYear()}-${txDate.getMonth() + 1}-Week ${weekNumber}`;
  
      // 각 주차별 데이터를 초기화하고 합산
      if (!weeks[weekKey]) {
        weeks[weekKey] = { week: weekKey, income: 0, expense: 0 };
      }
  
      // 트랜잭션이 입금이면 `income`에, 출금이면 `expense`에 추가
      if (tx.type === "입금") {
        weeks[weekKey].income += tx.amount;
      } else if (tx.type === "출금") {
        weeks[weekKey].expense += tx.amount;
      }
    });
  
    // 객체를 배열로 변환해 반환
    return Object.values(weeks);
  })();
  

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
        <Route path="/statistics" 
          element={
            <Statistics
              transactions={transactions}
              weeklyChartData={weeklyChartData}
            />} />
      </Routes>
      {/* 현재 경로가 /statistics가 아닌 경우에만 MokokoStatisticsButton 표시 */}
      {location.pathname !== "/statistics" && <MokokoStatisticsButton />}
    </div>
  );
};

export default App;
