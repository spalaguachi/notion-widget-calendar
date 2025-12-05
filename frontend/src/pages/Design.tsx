import CalendarCard from "../components/CalendarCard";
import SubmitButtonWrapper from "../components/SubmitButtonWrapper";
import ToolBar from "../components/ToolBar";
import { ThemeProvider } from "../utils/ThemeProvider";

const Design = () => {
  return (
    <div className="preview">
      <ThemeProvider>
        <CalendarCard />
        <ToolBar />
        <SubmitButtonWrapper />
      </ThemeProvider>
    </div>
  );
};

export default Design;
