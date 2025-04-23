import { useState } from "react";
import { ArrowLeftIcon, ChevronDownIcon } from "../../../assets/assets";
import { Select } from "../../../ui-global/Slect";

type DefaultMapHeaderProps = {
  isDrawShape: boolean;
  setIsDrawShape: (isDrawShape: boolean) => void;
};

export const DefaultMapHeader = ({
  isDrawShape,
  setIsDrawShape,
}: DefaultMapHeaderProps) => {
  const [saveSource, setSaveSource] = useState("Save");

  const handleSaveSourceChange = (value: string) => {
    setSaveSource(value);
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
            className={`w-[1.5rem] h-[1.5rem] border  accent-lime-300 cursor-pointer border-[#FFFFFF] checked:bg-transparent rounded ${
              !isDrawShape && "appearance-none border-white"
            }`}
            checked={isDrawShape}
            onChange={() => setIsDrawShape(!isDrawShape)}
          />
          <h1 className="tracking-[0.00625rem] leading-[1.25rem] font-medium text-[0.875rem] text-[#FFFFFF]">
            Crop
          </h1>
        </div>
        <div className="relative inline-block text-left">
          <Select
            defaultValue="OSM Map"
            buttonCss="w-max min-w-[6.5rem] h-[3rem] bg-[#0B6DA9]  gap-[0.75rem] rounded-[0.5rem] px-[1.25rem] pr-[2rem] cursor-pointer tracking-[0.01rem] leading-[1.5rem] font-semibold text-[0.9rem] text-white flex items-center justify-between"
            iconCss="w-[1.25rem] h-[1.25rem] pointer-events-none"
            optionContainerCss="text-[0.8rem] font-normal leading-[1.2rem] tracking-[0.03rem] bg-[#1E1E1F] z-[100]"
            optionsCss="px-3 py-2 bg-[#1E1E1F] text-[#FFFFFF] hover:bg-[#1A1A1C]"
            optionHighlightColor="bg-gray-600"
            options={["Save to Disk", "Save to GCS"]}
            value={saveSource}
            icon={ChevronDownIcon}
            onChange={handleSaveSourceChange}
          />
        </div>
      </div>
    </div>
  );
};
