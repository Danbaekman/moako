import React from "react";
import moakoLogo from "../assets/images/moakoLogo.png";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-6">
      <div className="flex items-center justify-between">
        {/* 좌측 빈 공간 (중앙 정렬을 위한) */}
        <div className="w-20"></div>

        {/* 로고와 제목 (정 중앙 배치, 로고는 제목 좌측) */}
        <div className="flex items-center space-x-4">
          <img
            src={moakoLogo} // 로고 이미지 경로
            alt="Moako Logo"
            className="h-12 w-12"
          />
          <div className="text-center">
            <h1 className="text-3xl font-extrabold">Moako</h1>
            <p className="text-sm text-gray-300">로스트아크 가계부</p>
          </div>
        </div>

        {/* 통계 버튼 (우측 정렬) */}
        <nav>
          <a
            href="#stats"
            className="bg-blue-500 px-4 py-2 rounded-md text-white text-sm hover:bg-blue-600 transition"
          >
            통계
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
