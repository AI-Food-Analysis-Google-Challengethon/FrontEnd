'use client';
import { useState } from 'react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 월의 첫날과 마지막날 구하기
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // 이전 달과 다음 달로 이동하는 함수
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // 달력에 표시할 날짜 배열 생성
  const getDaysArray = () => {
    const days = [];
    const firstDay = firstDayOfMonth.getDay(); // 0 (일요일) ~ 6 (토요일)

    // 이전 달의 마지막 날짜들
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // 현재 달의 날짜들
    const today = new Date();
    for (let date = 1; date <= lastDayOfMonth.getDate(); date++) {
      days.push({
        date,
        isCurrentMonth: true,
        isToday:
          date === today.getDate() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getFullYear() === today.getFullYear(),
      });
    }

    // 다음 달의 시작 날짜들
    const remainingDays = 42 - days.length; // 7x6 그리드를 채우기 위해
    for (let date = 1; date <= remainingDays; date++) {
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-8'>월간 영양 분석 페이지</h1>

      {/* 달력 헤더 */}
      <div className='flex items-center justify-between mb-4'>
        <button onClick={prevMonth} className='p-2 hover:bg-gray-100 rounded'>
          이전 달
        </button>
        <h2 className='text-xl font-semibold'>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <button onClick={nextMonth} className='p-2 hover:bg-gray-100 rounded'>
          다음 달
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {weekDays.map((day) => (
          <div key={day} className='text-center p-2 font-semibold bg-gray-50'>
            {day}
          </div>
        ))}
      </div>

      {/* 달력 날짜들 */}
      <div className='grid grid-cols-7 gap-1'>
        {getDaysArray().map((day, index) => (
          <div
            key={index}
            className={`
              border p-2 min-h-[100px] relative
              ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
              ${day.isToday ? 'bg-blue-50' : ''}
              hover:bg-gray-100 transition-colors
            `}
          >
            <span
              className={`
              ${day.isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
            `}
            >
              {day.date}
            </span>
            {/* 여기에 해당 날짜의 식단 데이터를 표시할 수 있습니다 */}
          </div>
        ))}
      </div>
    </div>
  );
}
