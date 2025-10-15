import { useReducer, type ReactNode } from "react";
import { ThemeContext, initialTheme } from "./context";
import { themeReducer } from "./reducer";

interface ThemeProps {
  children: ReactNode;
}
function ThemeProvider(props: ThemeProps) {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  return (
    <ThemeContext value={{ theme, dispatch }}>{props.children}</ThemeContext>
  );
}

export { ThemeProvider };
