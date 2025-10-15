interface ColorSelectorProps {
  isActive: boolean;
  selectorType: string;
  onClick: (selectorType: string) => void;
  style: React.CSSProperties;
}

const ColorSelector = ({
  isActive,
  selectorType,
  onClick,
  style,
}: ColorSelectorProps) => {
  const clsName = `theme-picker ${isActive ? "active" : ""}`;
  return (
    <>
      <div
        className={clsName}
        style={style}
        onClick={() => onClick(selectorType)}
      />
    </>
  );
};

export default ColorSelector;
