import { Link } from "react-router-dom";
import { Tile } from "../../MapDashBoard/components/MapThumbNailCard";
import { ArrowLeftIcon, PencilIcon } from "../../../assets/assets";
import { useState } from "react";
interface OfflineMapHeaderProps {
  tileData: Tile;
}

export const OfflineMapHeader = ({ tileData }: OfflineMapHeaderProps) => {
  const [folderName, setFolderName] = useState(tileData.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleSaveFolderName = async () => {
    if (folderName.trim() === "") return;
    try {
      const res = await fetch(`/api/v1/tile/${tileData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderName }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log("Folder name updated successfully");
    } catch (error) {
      console.error("Failed to update folder name:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveFolderName();
      setIsEditing(false);
    }
  };

  return (
    <div className="h-[5rem] w-full flex justify-between items-center bg-[#1C1C1E] px-[2rem] py-[1rem]">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Link
            to="/map-dashboard"
            className="hover:text-blue-500 text-white hover:underline"
          >
            <img src={ArrowLeftIcon} alt="Back" />
          </Link>
          <button className="cursor-pointer" onClick={() => setIsEditing(true)}>
            <img src={PencilIcon} alt="Edit" className="w-[1rem] h-[1rem]" />
          </button>

          {isEditing ? (
            <input
              type="text"
              value={folderName}
              onChange={handleFolderNameChange}
              onKeyPress={handleKeyPress}
              className="text-white font-bold bg-transparent border-b border-white focus:outline-none"
            />
          ) : (
            <span className="text-white font-bold hover:underline cursor-default">
              <span className="font-normal">Map Preview </span>:{" "}
              {folderName || "Loading..."}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
