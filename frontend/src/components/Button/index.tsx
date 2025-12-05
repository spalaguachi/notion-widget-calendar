import "./index.css";
interface ButtonProps {
  className?: string;
  message: string;
  onClick: () => void;
  disable: boolean;
}
const Button = (props: ButtonProps) => {
  return (
    <div
      aria-disabled={props.disable}
      className={`${props.className} button`}
      onClick={props.onClick}
    >
      <p>{props.message}</p>
    </div>
  );
};

export default Button;
