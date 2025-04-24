import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { FolerIcon, VeticalEllipsisIcon } from "../../../assets/assets";

export interface Tile {
  id: number;
  name: string;
  thubmnailbase64img: string;
  extent: number[];
  center: number[];
  zoom: number[];
  projection: string;
}

export const MapThumbNailCard = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTileData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/api/v1/tile/`);
      setTiles(res.data.tiles);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error fetching tile data");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTileData();
  }, []);

  const handleDeleteTile = async (tileId: number) => {
    try {
      await axiosInstance.delete(`/api/v1/tile/${tileId}`);
      fetchTileData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : tiles.length > 0 ? (
        tiles.map((tile, idx) => {
          return (
            <div
              key={idx}
              className="h-[24.25rem] w-[26rem] bg-[#1C1C1EBF] p-[1rem] rounded-[0.5rem]"
            >
              <div className="h-[1.5rem] mb-[0.25rem] flex justify-between items-center">
                <div className="flex items-center gap-[0.25rem]">
                  <h1 className="text-[#FFF] text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00625rem]">
                    {tile?.name}
                  </h1>
                  <img
                    src={FolerIcon}
                    alt="folder"
                    className="size-[1.25rem]"
                  />
                </div>
                <img
                  src={VeticalEllipsisIcon}
                  alt="ellipsis"
                  className="size-[1.25rem]"
                />
              </div>
              <div className="w-full h-[1rem] mb-[0.75rem]">
                <p className="text-white text-xs">
                  <span>{tile?.center[0]}</span> -{" "}
                  <span>{tile?.center[1]}</span>
                </p>
              </div>
              <img
                src={`data:image/png;base64,${tile?.thubmnailbase64img}`}
                alt="map-thumbnail"
                className="w-full h-[16rem] object-cover rounded mb-[0.75rem]"
              />
              <div className="flex justify-between items-center">
                <div onClick={() => handleDeleteTile(tile?.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-red-500 bg-white rounded-full cursor-pointer  p-1 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
                <Link
                  to={`/offline-map/${tile?.name}/${tile?.id}`}
                  className="w-[3.5rem] h-[2rem] border border-[#FFFFFF80] text-[#FFF] text-[0.75rem] leading-[1rem] tracking-[0.00625rem] font-medium rounded-[0.25rem] py-[0.5rem] px-[1rem] flex justify-center items-center"
                >
                  Use
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center w-screen h-[calc(100vh-40px)]">
          <div className="text-2xl font-bold text-center">No tiles found</div>
        </div>
      )}
    </>
  );
};
