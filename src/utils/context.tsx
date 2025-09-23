import React, { createContext, useContext } from "react";
import { type EditModeActions } from "./actions";
import { DEFAULT_COLOR_SCHEME } from "../components/ToolBar/color";

/*need to figure out if isDefaultImage is its final form is it a path or another interface? */
/* location for themedata...here or themeprovider */
export interface ThemeData {
  weekColor: string;
  dayColor: string;
  lightTheme: string;
  isDefaultImage: boolean;
}

export const initialTheme: ThemeData = {
  weekColor: DEFAULT_COLOR_SCHEME.WEEK_COLOR,
  dayColor: DEFAULT_COLOR_SCHEME.DAY_COLOR,
  lightTheme: "light",
  isDefaultImage: false,
};

/*check if initial should be null or initialTheme  if dispatch gives issues set to Dispatch<> | null*/
export const ThemeContext = createContext<{
  theme: ThemeData | null;
  dispatch: React.Dispatch<EditModeActions>;
}>({ theme: null, dispatch: () => undefined });

export function useTheme() {
  const { theme } = useContext(ThemeContext);
  return theme;
}

export function useThemeDispatch() {
  const { dispatch } = useContext(ThemeContext);
  return dispatch;
}
