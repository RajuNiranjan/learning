// import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "../assets/assets";

type DefaultMapHeaderProps = {
  isDrawShape: boolean;
  setIsDrawShape: (isDrawShape: boolean) => void;
};

export const Header = ({
  isDrawShape,
  setIsDrawShape,
}: DefaultMapHeaderProps) => {
  // const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    console.log(`Selected: ${option}`);
    setIsOpen(false);
    // Add your save logic here...
  };
  return (
    <div className="h-[5rem] w-full flex justify-between items-center bg-[#1C1C1E] px-[2rem] py-[1rem]">
      <div className="flex items-center gap-[2rem]">
        <img
          src={ArrowLeftIcon}
          alt="arrow-left"
          className="w-[1.5rem] h-[1.5rem]"
        />
        <h1 className="text-[1.5rem] font-normal text-[#FFFFFF] leading-[2rem]">
          Map maker
        </h1>
      </div>
      <div className="flex items-center gap-[2rem]">
        <div className="w-[6.6875rem] h-[3rem] border border-[#FFFFFF80] rounded-[0.25rem] p-[1rem] flex items-center justify-center gap-[0.5rem]">
          <input
            type="checkbox"
            className="w-[1.5rem] h-[1.5rem] border border-[#FFFFFF] checked:bg-transparent rounded"
            checked={isDrawShape}
            onChange={() => setIsDrawShape(!isDrawShape)}
          />
          <h1 className="tracking-[0.00625rem] leading-[1.25rem] font-medium text-[0.875rem] text-[#FFFFFF]">
            Crop
          </h1>
        </div>
        <div className="relative inline-block text-left">
          <div
            className="w-[6.125rem] h-[2.75rem] bg-[#0B6DA9] rounded-[0.25rem] px-[1rem] flex items-center justify-center gap-[0.5rem] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h1 className="tracking-[0.00625rem] leading-[1.25rem] font-medium text-[0.875rem] text-white">
              Save
            </h1>
            <img
              src={ChevronDownIcon}
              alt="chevron-down"
              className="w-[1.5rem] h-[1.5rem]"
            />
          </div>
          {isOpen && (
            <div className="absolute mt-0 -ml-14 w-[10.625rem] bg-[#242F35]  z-10">
              <button
                onClick={() => handleSelect("disk")}
                className="h-[2.25rem] w-full flex items-center hover:bg-[#1C1C1EBF] justify-start px-[0.75rem] py-[0.5rem] text-[0.875rem] font-medium text-[#FFFFFF] leading-[1.25rem] tracking-[0.00625rem]"
              >
                Save to Disk
              </button>
              <button
                onClick={() => handleSelect("gcs")}
                className="h-[2.25rem] w-full flex items-center hover:bg-[#1C1C1EBF] justify-start px-[0.75rem] py-[0.5rem] text-[0.875rem] font-medium text-[#FFFFFF] leading-[1.25rem] tracking-[0.00625rem]"
              >
                Save to GCS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
    <Link
        to="/"
        className={`${
          location.pathname === "/"
            ? "bg-[#00c3ff] text-white rounded-md px-2"
            : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/map-dashboard"
        className={`${
          location.pathname === "/map-dashboard"
            ? "bg-[#00c3ff] text-white rounded-md px-2"
            : ""
        }`}
      >
        Offline Map Dash Board
      </Link> 

 */
