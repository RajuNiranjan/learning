import { Link } from "react-router-dom";
import {
  EditIcon,
  SearchIcon,
  SkytexLogo,
  UploadIcon,
} from "../../../assets/assets";
import { useRef, useState } from "react";

export const MapDashBoardHeader = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await fetch("/api/v1/tile/upload-tile-folder", {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setFile(null);
      }
    }
  };

  const handleFileUpload = () => {
    fileRef.current?.click();
  };

  return (
    <div className="h-[7rem] w-full px-[1.5rem] py-[1rem] flex justify-between ">
      <div className=" w-[14.875rem] h-[4rem] flex items-center gap-[1.81rem]">
        <Link to="/" className="w-[4rem] h-[4rem] p-[0.28rem]">
          <img src={SkytexLogo} alt="skytex-logo" className="w-full h-full" />
        </Link>
        <div className="h-[3.75rem] w-[9.0625rem] ">
          <h1 className="font-normal text-[2rem] text-[#FFFFFF] leading-[2.5rem]">
            Maps
          </h1>
          <small className="font-medium text-[0.75rem] text-[#FFFFFF] leading-[1rem] tracking-[0.03125rem]">
            All the available maps
          </small>
        </div>
      </div>
      <div className="w-[33.5625rem] h-[3.5rem] space-x-[1.5rem] flex items-center">
        <img src={SearchIcon} alt="" className="w-[1rem] h-[1rem]" />
        <button className="w-[9.75rem] h-[3.5rem] py-[1rem] px-[1rem] rounded-[0.25rem] border border-[#FFFFFF80] flex items-center gap-[0.5rem] text-[0.875rem] text-[#FFFFFF] font-medium leading-[1.25rem] tracking-[0.00625rem] ">
          <img src={EditIcon} alt="" className="w-[1.55rem] h-[1.5rem]" />
          Create map
        </button>
        <div>
          <button
            type="button"
            onClick={handleFileUpload}
            className="w-[7.25rem] h-[3.5rem] py-[1rem] px-[1rem] rounded-[0.25rem] border border-[#FFFFFF80] flex items-center gap-[0.5rem] text-[0.875rem] text-[#FFFFFF] font-medium leading-[1.25rem] tracking-[0.00625rem] cursor-pointer "
          >
            <img
              src={UploadIcon}
              alt="Upload Icon"
              className="w-[1rem] h-[1rem]"
            />
            Upload
          </button>
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".zip"
          />
        </div>
        <button className="w-[9.5625rem] h-[3.25rem] py-[1rem] px-[1.5rem] rounded-[0.25rem] flex items-center gap-[0.5rem] bg-[#0B6DA9] text-[0.875rem] text-[#FFFFFF] font-medium leading-[1.25rem] tracking-[0.00625rem]">
          Start Planning
        </button>
      </div>
    </div>
  );
};
