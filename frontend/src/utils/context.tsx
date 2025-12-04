import React, { createContext, useContext } from "react";
import { type EditModeActions } from "./actions";
import { DEFAULT_COLOR_SCHEME } from "../components/ToolBar/color";

/*need to figure out if isDefaultImage is its final form is it a path or another interface? */
/* location for themedata...here or themeprovider */
export interface ThemeData {
  weekColor: string;
  dayColor: string;
  isLight: boolean;
  isDefaultImage: boolean;
  image: File | null;
}

export const initialTheme: ThemeData = {
  weekColor: DEFAULT_COLOR_SCHEME.WEEK_COLOR,
  dayColor: DEFAULT_COLOR_SCHEME.DAY_COLOR,
  isLight: true,
  isDefaultImage: false,
  image: null,
};

/*check if initial should be null or initialTheme  if dispatch gives issues set to Dispatch<> | null*/
export const ThemeContext = createContext<{
  theme: ThemeData;
  dispatch: React.Dispatch<EditModeActions>;
}>({ theme: initialTheme, dispatch: () => undefined });

export function useTheme() {
  const { theme } = useContext(ThemeContext);
  return theme;
}
interface ColorThemeData {
  weekColor: string;
  dayColor: string;
}
export function useColorTheme(): ColorThemeData {
  const { theme } = useContext(ThemeContext);
  return { dayColor: theme.dayColor, weekColor: theme.weekColor };
}
export function useThemeDispatch() {
  const { dispatch } = useContext(ThemeContext);
  return dispatch;
}
