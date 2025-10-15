import React from "react";
import CalendarCard from "../components/CalendarCard";
import ToolBar from "../components/ToolBar";
import { ThemeProvider } from "../utils/ThemeProvider";

const Design = () => {
  return (
    <div className="preview">
      <ThemeProvider>
        <CalendarCard />
        <ToolBar />
      </ThemeProvider>
    </div>
  );
};

export default Design;
