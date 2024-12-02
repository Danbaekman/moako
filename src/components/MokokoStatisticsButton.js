import React from "react";
import "../index.css"; // TailwindCSS 스타일이 포함된 파일
import { useNavigate } from "react-router-dom";

const MokokoStatisticsButton = ({ onClick }) => {
    const navigate = useNavigate();
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center">
      {/* 말풍선 */}
      <div className="relative mb-4">
        {/* 말풍선 본체 */}
        <div className="bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded shadow-md relative">
          나의 소비 패턴은??
        </div>
        {/* 말풍선 화살표 */}
        <div className="absolute w-0 h-0 border-t-[10px] border-t-white border-x-[10px] border-x-transparent border-b-0 top-full left-1/2 transform -translate-x-1/2"></div>
      </div>

      {/* 큰 원 */}
      <div
        className="bg-pink-300 w-40 h-40 rounded-full shadow-lg relative flex items-center justify-center hover:bg-pink-200 transition animate-bounce-slow"
        onClick={() => navigate("/statistics")}
      >
        {/* 작은 원 */}
        <div className="bg-pink-300 w-32 h-32 rounded-full absolute top-0 flex items-center justify-center">
          <img
            src="/assets/images/mokokoButton.png" // 모코코 이미지 경로
            alt="통계"
            className="w-32 h-32" // 이미지 크기 조정
          />
        </div>

        {/* 통계 보기 글 */}
        <p className="absolute bottom-3 text-sm font-bold text-gray-600">보러 가기</p>
      </div>
    </div>
  );
};

export default MokokoStatisticsButton;
