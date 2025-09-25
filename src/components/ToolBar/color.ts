export const COLOR_TARGET = {
  DAY: "day",
  WEEK: "week",
} as const;

export const DEFAULT_COLOR_SCHEME = {
  WEEK_COLOR: "#E9C2CB",
  DAY_COLOR: "#F9ECE5",
} as const;

export const DEFAULT_PRESET_COLORS = [
  DEFAULT_COLOR_SCHEME.WEEK_COLOR,
  DEFAULT_COLOR_SCHEME.DAY_COLOR,
  "#FADADD",
  "#98FF98",
  "#FFF1AC",
  "#87CEEB",
  "#E6E6FA",
];
