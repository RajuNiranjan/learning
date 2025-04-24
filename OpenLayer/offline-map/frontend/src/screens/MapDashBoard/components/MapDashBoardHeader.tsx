import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../../../assets/assets";

export const MapDashBoardHeader = () => {
  return (
    <div className="h-[7rem] w-full">
      <Link to="/" className="flex items-center gap-[0.5rem]">
        <img src={ArrowLeftIcon} alt="arrow-left" className="size-[1rem]" />{" "}
        <span className="text-xs text-white">Back</span>
      </Link>
    </div>
  );
};
