import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <header className="bg-white py-1 shadow-md flex flex-col items-center"> {/* ✅ 헤더 자체를 중앙 정렬 */}
      <div 
        className="flex flex-col items-center gap-2" // ✅ 이미지와 글 사이 여백 동일하게 설정
        onClick={handleNavigate}
      >
        {/* 로고 이미지 */}
        <img
          src="/assets/images/moakoLogo.png"
          alt="Moako Logo"
          className="h-auto max-h-32 w-auto block"
          style={{ marginBottom: "-50px", marginTop: "-38px", objectFit: "contain" }}
        />
          <p className="text-center text-sm text-gray-500 leading-none pb-2">로스트아크 가계부</p>
      </div>
    </header>
  );
};

export default Header;
