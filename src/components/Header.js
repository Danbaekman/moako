import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "../index.css";

const Header = () => {
  const navigate = useNavigate(); // 네비게이션 훅

  const handleNavigate = () => {
    navigate("/"); // 첫 페이지로 이동
  };

  return (
    <header className="bg-white text-white p-3 shadow-md">
      <div className="flex flex-col items-center">
        {/* 로고와 제목 */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleNavigate} // 클릭 이벤트 추가
        >
          <img
            src="/assets/images/moakoLogo.png"
            alt="Moako Logo"
            className="h-8 w-8"
          />
          <h1 className="text-4xl font-baloo font-bold text-green-500">Moako</h1>
        </div>

        {/* 부제목 */}
        <p className="text-sm text-gray-500">로스트아크 가계부</p>
      </div>
    </header>
  );
};

export default Header;
