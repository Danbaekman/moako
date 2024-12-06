import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css"; // CSS 파일 import

const EnhancedCalendar = ({ currentDate, onDateChange, onComplete }) => {
  const [selectedDate, setSelectedDate] = useState(currentDate); // 현재 선택된 날짜
  const [notes, setNotes] = useState({}); // 날짜별 메모 저장 객체
  const [currentNote, setCurrentNote] = useState(""); // 현재 메모 입력 상태

  // 날짜 선택 핸들러
  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(date); // 선택된 날짜 업데이트
    setCurrentNote(notes[formattedDate] || ""); // 해당 날짜의 메모 로드
    if (onDateChange) {
      onDateChange(date); // 부모 컴포넌트로 선택된 날짜 전달
    }
  };

  // 메모 저장 핸들러
  const saveNote = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setNotes((prevNotes) => ({
      ...prevNotes,
      [formattedDate]: currentNote,
    }));
    alert(`${selectedDate.toLocaleDateString("ko-KR")}의 메모가 저장되었습니다.`);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full bg-white p-6 shadow-lg z-50"
      style={{ top: '100px', position: 'absolute'}} // 위치 조정
      onClick={(e) => e.stopPropagation()}
    >
      <Calendar
        onClickDay={handleDateSelect}
        value={selectedDate}
        locale="ko-KR"
        className="custom-calendar"
      />
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">
          {selectedDate.toLocaleDateString("ko-KR")}의 메모
        </h3>
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows="4"
        />
        <button
          onClick={saveNote}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
        >
          저장
        </button>
        <button
          onClick={onComplete}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg w-full"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default EnhancedCalendar;
