interface ColorSelectorProps {
  isActive: boolean;
  selectorType: string;
  onClick: (selectorType: string) => void;
}

const ColorSelector = ({
  isActive,
  selectorType,
  onClick,
}: ColorSelectorProps) => {
  const clsName = `theme-picker ${isActive ? "active" : ""}`;
  return (
    <>
      <div className={clsName} onClick={() => onClick(selectorType)} />
    </>
  );
};

export default ColorSelector;
