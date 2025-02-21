import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <header className="bg-white py-1 shadow-md flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        {/* ✅ Moako 로고 클릭 시 메인으로 이동 */}
        <img
          src="/assets/images/moakoLogo.png"
          alt="Moako Logo"
          className="h-auto max-h-32 w-auto block cursor-pointer" // ✅ 클릭 가능하도록 cursor-pointer 추가
          style={{ marginBottom: "-50px", marginTop: "-38px", objectFit: "contain" }}
          onClick={handleNavigate} // ✅ onClick 직접 적용
        />
        <p className="text-center text-sm text-gray-500 leading-none pb-2">로스트아크 가계부</p>
      </div>
    </header>
  );
};

export default Header;
