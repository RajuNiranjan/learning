import { useState } from "react";
import { SearchIcon } from "../../../assets/assets";
import { Select } from "../../../ui-global/Slect";

export const MapAreaTool = () => {
  const [mapSource, setMapSource] = useState<string>("OSM Map");

  const handleMapSourceChange = (value: string) => {
    setMapSource(value);
    console.log(mapSource);
  };

  return (
    <div className="w-full h-[3.5rem] bg-[#1C1C1EBF] absolute top-[5rem] z-40 px-[2rem] py-[0.75rem] flex items-center justify-between">
      <div className="flex items-center gap-[0.75rem]">
        <input
          type="text"
          placeholder="search location"
          className="w-[13.87rem] h-[1.5rem] border border-[#D8DCDE] p-[0.5rem] rounded-[0.25rem] bg-[#000000] text-[#B1B8BD] text-[0.75rem] font-normal leading-[1rem] tracking-[0.025rem]"
        />
        <img
          src={SearchIcon}
          alt="search"
          className="w-[1rem] h-[1rem] cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-[0.75rem]">
        <h1 className="text-[0.6875rem] text-[#FFFFFF] font-normal tracking-[0.03125rem] leading-[1rem]">
          Map Source
        </h1>
        <Select
          defaultValue="OSM Map"
          buttonCss="w-[13.875rem] h-[1.5rem] border border-[#4976BA] px-[0.5rem] rounded-[0.25rem] bg-[#000000] text-[#FFFFFF] text-[0.75rem] font-normal leading-[1rem] tracking-[0.025rem] pr-[2rem] flex items-center cursor-pointer appearance-none"
          iconCss="w-[1rem] h-[1rem] absolute right-[0.5rem] top-[50%] transform -translate-y-1/2 pointer-events-none"
          optionContainerCss="text-[0.75rem] font-normal leading-[1rem] tracking-[0.025rem] bg-[#212021]"
          optionsCss="px-2 py-1 bg-[#212021] text-[#FFFFFF] hover:bg-[#1C1C1EBF]"
          optionHighlightColor="bg-gray-700"
          options={["OSM Map", "Google Map", "Bing Map"]}
          value={mapSource}
          onChange={handleMapSourceChange}
        />
      </div>
    </div>
  );
};
