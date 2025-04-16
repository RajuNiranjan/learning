import { CrossIcon } from "../assets/svgs/svg";

interface DownloadTilesOptionsProps {
  setIsDialogOpen: (open: boolean) => void;
  onCancel: () => void;
}

export const DownloadTilesOptions = ({
  setIsDialogOpen,
  onCancel,
}: DownloadTilesOptionsProps) => {
  return (
    <div className="w-[300px]  backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg p-6 relative">
      <img
        src={CrossIcon}
        alt="cross"
        className="w-5 h-5 flex justify-end items-end absolute -top-2 -right-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
        onClick={onCancel}
      />
      <h1 className="text-xl font-semibold text-center text-blue-500 mb-4">
        Download the Tiles
      </h1>
      <form action="" className="space-y-2">
        <div>
          <label htmlFor="folderName" className="text-xs">
            Folder Name
          </label>
          <input
            type="text"
            id="folderName"
            placeholder="Bangalore"
            className="w-full h-8 p-2 border text-xs placeholder:text-white/50 border-gray-800 rounded-md"
          />
        </div>
        <button
          onClick={() => setIsDialogOpen(false)}
          className="h-8 w-full bg-blue-500 text-white rounded cursor-pointer"
        >
          Download
        </button>
      </form>
    </div>
  );
};
