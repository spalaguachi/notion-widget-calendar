import "./index.css";
import warningIcon from "../../assets/warning_x_outline.svg";
export interface BannerProps {
  className?: string;
  message: string | null;
}

const Banner = (props: BannerProps) => {
  return (
    <div className={`banner ${props.className}`}>
      <img src={warningIcon} />
      <p>{props.message}</p>
    </div>
  );
};

export default Banner;
