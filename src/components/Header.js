import React from "react";
import "../index.css";

const Header = () => {
  return (
    <header className="bg-white text-white p-3 shadow-md"> {/* 그림자 추가 */}
      <div className="flex flex-col items-center">
        {/* 로고와 제목 */}
        <div className="flex items-center space-x-2">
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
