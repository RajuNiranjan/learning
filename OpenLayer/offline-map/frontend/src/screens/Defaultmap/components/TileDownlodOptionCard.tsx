import { useState } from "react";
import { FormData } from "../DefaultMap.screen";

export const TileDownlodOptionCard = ({
  selectedSaveOption,
  formData,
  setFormData,
  onSubmit,
  isDownloading,
  onClose, // Add onClose prop to handle dialog close
}: {
  selectedSaveOption: string | null;
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (data: FormData) => void;
  isDownloading: boolean;
  onClose: () => void;
}) => {
  const [folderName, setFolderName] = useState<string>(formData.folderName);
  console.log("isDownloading", isDownloading);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!folderName.trim()) {
      alert("Please enter a folder name");
      return;
    }
    const updatedData = {
      ...formData,
      folderName,
    };
    setFormData(updatedData);
    onSubmit(updatedData);
  };

  return (
    <div className="w-[36.0625rem] h-[10rem]  bg-[#333] py-[1rem] px-[1.5rem] rounded-[0.5rem] space-y-[1rem]">
      <h1 className="h-[1.25rem] text[0.875rem] font-medium leading-[0.875rem] tracking-[0.00625rem] text-[#FFF] ">
        {selectedSaveOption === "GCS" ? "Save to GCS" : "Save to Disk"}
      </h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-[1rem]">
        <div className="flex items-center h-[3.25rem] gap-[1rem]">
          <label
            htmlFor="tail-name"
            className="w-[5.3125rem] h-[1.625rem] text[0.875rem] font-medium leading-[0.875rem] tracking-[0.00625rem] flex justify-center items-center text-[#FFF]"
          >
            File Name :
          </label>
          <input
            type="text"
            placeholder="Bangalore"
            className="bg-[#000000] text-[#656567] w-[19.5rem] h-[1.95rem] p-[0.5rem] border border-[#D8DCDE] rounded-[0.1rem] text-[0.75rem] leading-[1rem] font-normal tracking-[0.025rem]"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setFormData({
                ...formData,
                folderName: "",
              });
              onClose(); // Close the dialog when cancel is clicked
            }}
            className="w-[4.0625rem] h-[1.5rem] text-[0.6875rem] font-medium leading-[1rem] tracking-[0.03125rem] px-[0.75rem] py-[0.25rem] bg-[#FFF] rounded-[0.375rem] text-[#010408] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[3.25rem] h-[1.5rem] text-[0.6875rem] font-medium leading-[1rem] tracking-[0.03125rem] px-[0.75rem] py-[0.25rem] bg-[#BAEE47] rounded-[0.375rem] text-[#010408] cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
