import React from "react";

export interface CalendarDayProps {
  dayNumber: number | null;
  isToday: boolean;
}

const CalendarDay = ({ dayNumber, isToday }: CalendarDayProps) => {
  if (dayNumber === null) {
    return <div className="grid-cell" />;
  }
  return (
    <div
      className="grid-cell day-cell"
      style={
        isToday ? { backgroundColor: "#2ee" } : {}
      } /*style={today==daynumber ? Theme.themeweek : Theme.themeday}*/
    >
      {dayNumber}
    </div>
  );
};

export default CalendarDay;
