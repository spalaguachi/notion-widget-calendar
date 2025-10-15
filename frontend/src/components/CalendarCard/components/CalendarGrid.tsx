import React from "react";
import {
  getCalendarData,
  WEEKDAY_NAMES,
  generateCells,
} from "../CalendarHelpers";
import CalendarDay from "./CalendarDay";
import { useTheme } from "../../../utils/context";

interface CalendarGridProps {
  date?: Date;
}

const CalendarGrid = ({ date = new Date() }: CalendarGridProps) => {
  const theme = useTheme();
  const weekStyle: React.CSSProperties = { backgroundColor: theme.weekColor };
  const { month, todayNum } = getCalendarData(date);

  return (
    <div className="calendar-grid">
      {WEEKDAY_NAMES.map((day) => (
        <div key={day} className="weekday-header grid-cell" style={weekStyle}>
          {day}
        </div>
      ))}
      {generateCells(month.length, (cellIndex) => {
        return (
          <CalendarDay
            key={cellIndex}
            dayNumber={month[cellIndex]}
            isToday={todayNum === month[cellIndex]}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
