import React from "react";
interface ThemePickerProps {
  className: string;
}
const ThemePicker = ({ className }: ThemePickerProps) => {
  return <div className={className} />;
};

export default ThemePicker;
