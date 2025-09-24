import React from "react";
import { useTheme } from "../../../utils/context";

export interface CalendarDayProps {
  dayNumber: number | null;
  isToday: boolean;
}

const CalendarDay = ({ dayNumber, isToday }: CalendarDayProps) => {
  const theme = useTheme();
  const style = isToday
    ? { backgroundColor: theme.weekColor }
    : { backgroundColor: theme.dayColor };
  if (dayNumber === null) {
    return <div className="grid-cell" style={style} />;
  }
  return (
    <div className="grid-cell day-cell" style={style}>
      {dayNumber}
    </div>
  );
};

export default CalendarDay;
