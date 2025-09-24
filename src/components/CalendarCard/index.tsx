import React from "react";
import "./index.css";
import ImageContainer from "./components/ImageContainer";
import { getCalendarHeaderData } from "./CalendarHelpers";
import CalendarGrid from "./components/CalendarGrid";
import { useTheme } from "../../utils/context";
interface CalendarCardProps {
  display?: string;
  date?: Date;
}

const CalendarCard = ({
  display = "fixed",
  date = new Date(),
}: CalendarCardProps) => {
  const { monthName, year } = getCalendarHeaderData(date);

  //todo useEffect...to keep date current

  const theme = useTheme();
  return (
    <div className={`calendar-container ${display} ${theme.lightTheme}`}>
      <ImageContainer />
      <div>
        <p className="calendar-header">
          {monthName} {year}
        </p>
        <CalendarGrid date={date} />
      </div>
    </div>
  );
};

export default CalendarCard;
