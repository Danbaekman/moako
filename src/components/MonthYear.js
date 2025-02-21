import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaCalendarAlt, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar/CustomCalendar.css";
import { ko } from "date-fns/locale";


const MonthYear = ({ currentDate, onChangeMonth, onSelectDate }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleDateString("ko-KR", { month: "long" });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentNote(notes[date.toISOString().split("T")[0]] || "");
    onSelectDate(date);
  };

  const saveNote = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setNotes((prevNotes) => ({
      ...prevNotes,
      [formattedDate]: currentNote,
    }));
  };

  const highlightWithNotes = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return notes[formattedDate] ? "highlighted-day" : "";
  };

  return (
    <div className="relative bg-gray-100 w-full flex flex-col items-center justify-center px-4 rounded-md">
      
      {/* 달력 아이콘 - 월 위에 위치 */}
      <button
        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        className="text-green-500 text-3xl hover:text-gray-300 transition mb-1"
      >
        <FaCalendarAlt />
      </button>
  
      {/* 중앙 연도 및 월 + 좌우 버튼 포함 */}
      <div className="flex items-center space-x-2">
        {/* 왼쪽 버튼 */}
        <button
          onClick={() => onChangeMonth(-1)}
          className="text-green-500 text-3xl hover:text-gray-300 transition"
        >
          <FaAngleLeft />
        </button>
  
        {/* 월 */}
        <h2 className="text-3xl font-bold text-green-500">{currentMonth}</h2>
  
        {/* 오른쪽 버튼 */}
        <button
          onClick={() => onChangeMonth(1)}
          className="text-green-500 text-3xl hover:text-gray-300 transition"
        >
          <FaAngleRight />
        </button>
      </div>
  
      {/* 연도 - 월 아래에 위치 */}
      <p className="text-lg text-green-700 mt-1">{currentYear}</p>
  
      {/* 달력 */}
      {isDatePickerOpen && (
        <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md z-50 p-8">
          {/* 닫기(X) 버튼 */}
          <button
            onClick={() => setIsDatePickerOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition text-2xl"
          >
            <FaTimes />
          </button>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            locale={ko} 
            dayClassName={highlightWithNotes}
            className="w-full p-2 border-2 border-green-500 rounded-md"
          />
          {/* 메모 입력 */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">
              {selectedDate.toLocaleDateString("ko-KR")}의 메모
            </h3>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="w-full p-3 border-2 border-[#afd485] rounded-lg focus:outline-none"
              rows="4"
            />
            <button
              onClick={saveNote}
              className="save-button"
            >
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default MonthYear;
