import React from "react";
import "./index.css";
import ImageContainer from "./components/ImageContainer";
import { getCalendarHeaderData } from "./CalendarHelpers";
import CalendarGrid from "./components/CalendarGrid";
import { useTheme } from "../../utils/context";

interface CalendarCardProps {
  display?: string;
}

const CalendarCard = ({ display = "fixed" }: CalendarCardProps) => {
  const currentDate = new Date();
  const { monthName, year } = getCalendarHeaderData(currentDate);
  const theme = useTheme();
  return (
    <div className={`calendar-container ${display} ${theme.lightTheme}`}>
      <ImageContainer />
      <div>
        <p className="calendar-header">
          {monthName} {year}
        </p>
        <CalendarGrid />
      </div>
    </div>
  );
};

export default CalendarCard;
