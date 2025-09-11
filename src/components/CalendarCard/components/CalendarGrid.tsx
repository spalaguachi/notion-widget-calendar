import React from "react";
import {
  getCalendarData,
  getTotalCells,
  WEEKDAY_NAMES,
  generateCells,
} from "../CalendarHelpers";
import CalendarDay, { type CalendarDayProps } from "./CalendarDay";

const CalendarGrid = () => {
  const currentDate = new Date();
  const { daysInMonth, firstWeekdayOfMonth, todayNum } =
    getCalendarData(currentDate);
  const totalCells = getTotalCells(firstWeekdayOfMonth, daysInMonth);

  const getDayPropData = (cellIndex: number): CalendarDayProps => {
    const dayNumber = cellIndex - firstWeekdayOfMonth + 1;
    const firstEmptyCells = cellIndex < firstWeekdayOfMonth;
    const lastEmptyCells = cellIndex >= firstWeekdayOfMonth + daysInMonth;

    if (firstEmptyCells || lastEmptyCells) {
      return {
        dayNumber: null,
        isToday: false,
      };
    }
    return {
      dayNumber: dayNumber,
      isToday: todayNum === cellIndex,
    };
  };

  return (
    <div className="calendar-grid">
      {WEEKDAY_NAMES.map((day) => (
        <div key={day} className="weekday-header grid-cell">
          {day}
        </div>
      ))}
      {generateCells(totalCells, (cellIndex) => {
        const { dayNumber, isToday } = getDayPropData(cellIndex);
        return (
          <CalendarDay
            key={cellIndex}
            dayNumber={dayNumber}
            isToday={isToday}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
