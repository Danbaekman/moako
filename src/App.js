import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DateCarousel from "./components/DateCarousel";
import AddTransaction from "./components/AddTransaction";
import AddExpense from "./components/AddExpense";
import TransactionTable from "./components/TransactionTable";
import InitialGoldSetting from "./components/InitialGoldSetting";
import MokokoStatisticsButton from "./components/MokokoStatisticsButton";

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

  // 초기 보유 골드 설정 핸들러
  const handleInitialBalanceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setInitialBalance(isNaN(value) ? 0 : value);
  };

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

  const handleStatisticsClick = () => {
    alert("모코코 통계 페이지로 이동!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="flex p-4">
        {/* 좌측 여백 */}
        <div className="w-1/6 pr-4">
          <InitialGoldSetting
            initialBalance={initialBalance}
            currentBalance={currentBalance}
            handleInitialBalanceChange={handleInitialBalanceChange}
          />
        </div>

        {/* 중앙 메인 콘텐츠 */}
        <div className="w-4/6">
          <DateCarousel
            onDateSelect={setSelectedDate}
            transactions={transactions}
          />

          <div className="flex justify-between mt-4">
            <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-center mb-4">입금 내역 추가</h2>
              <AddTransaction
                addTransaction={addTransaction}
                selectedDate={selectedDate}
              />
            </div>
            <div className="w-[48%] bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold text-center mb-4">출금 내역 추가</h2>
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

        {/* 우측 여백 */}
        <div className="w-1/6 pl-4"></div>
      </main>

      {/* 모코코 통계 버튼 */}
      <MokokoStatisticsButton onClick={handleStatisticsClick} />
    </div>
  );
};

export default App;
