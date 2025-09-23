import { type ThemeData } from "./context";
import {
  ActionType,
  type EditModeActions,
  type EditWeekColor,
  type SetDefaultImage,
  type EditDayColor,
  type SetLightMode,
} from "./actions";

// for now seperate file, might want to put into context.tsx file
//might want to make themeReducer an arrow function...
/*theme: states
action: f(x)s : updateColor
*/

export function themeReducer(
  theme: ThemeData,
  action: EditModeActions,
): ThemeData {
  switch (action.type) {
    case ActionType.EditWeekColor:
      return { ...theme, weekColor: action.payload };
    case ActionType.EditDayColor:
      return { ...theme, dayColor: action.payload };
    case ActionType.SetLightMode:
      return { ...theme, lightTheme: action.payload };
    case ActionType.SetDefaultImage:
      return { ...theme, isDefaultImage: action.payload };
    default:
      return theme;
  }
}

export const editWeekColor = (color: string): EditWeekColor => ({
  type: ActionType.EditWeekColor,
  payload: color,
});

export const editDayColor = (color: string): EditDayColor => ({
  type: ActionType.EditDayColor,
  payload: color,
});

export const setLightMode = (lightTheme: string): SetLightMode => ({
  type: ActionType.SetLightMode,
  payload: lightTheme,
});

export const setDefaultImage = (isDefaultImage: boolean): SetDefaultImage => ({
  type: ActionType.SetDefaultImage,
  payload: isDefaultImage,
});

