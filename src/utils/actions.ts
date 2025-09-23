export const ActionType = {
  EditWeekColor: "EditWeekColor",
  EditDayColor: "EditDayColor",
  SetLightMode: "SetLightMode",
  SetDefaultImage: "SetDefaultImage",
} as const;

export interface EditWeekColor {
  type: typeof ActionType.EditWeekColor;
  payload: string; // #42021
}
export interface EditDayColor {
  type: typeof ActionType.EditDayColor;
  payload: string; //#4rirp
}

export interface SetLightMode {
  type: typeof ActionType.SetLightMode;
  payload: string; //light,dark
}

//might need more logic (compare default with uploaded) somewhere not here
//ui will disable this button once clicked so action not useable will it impact this action?
export interface SetDefaultImage {
  type: typeof ActionType.SetDefaultImage;
  payload: boolean;
}

export type EditModeActions =
  | EditWeekColor
  | EditDayColor
  | SetLightMode
  | SetDefaultImage;
