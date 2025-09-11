import React from "react";
import "./index.css";
import ImageContainer from "./components/ImageContainer";
import { getCalendarHeaderData } from "./CalendarHelpers";
import CalendarGrid from "./components/CalendarGrid";

interface CalendarCardProps {
  display?: string;
}

const CalendarCard = ({ display = "fixed" }: CalendarCardProps) => {
  const currentDate = new Date();
  const {monthName, year} = getCalendarHeaderData(currentDate)

  return (
    <div className={`calendar-container ${display}`}>
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
