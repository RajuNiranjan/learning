import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tile } from "../MapDashBoard/components/MapThumbNailCard";
import { axiosInstance } from "../../utils/axiosInstance";

const OfflineMapScreen = () => {
  const { tileId } = useParams();

  const [tileData, setTileData] = useState<Tile | null>(null);

  useEffect(() => {
    const fetchTileData = async () => {
      const res = await axiosInstance.get(`/api/v1/tile/${tileId}`);
      setTileData(res.data.tile);
    };
    fetchTileData();
  }, []);
  return (
    <div className="p-4 ">
      <div className="flex items-center gap-2 my-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link to="/map-dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
          <span>{">"}</span>
          <span className="text-blue-500">
            {tileData?.name || "Loading..."}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        <div className="bg-gray-300 w-full h-max rounded  p-2">
          <h1 className="text-lg font-bold">Extent</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-white bg-gray-400">
              minX : {tileData?.extent[0]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-white bg-gray-400">
              maxX : {tileData?.extent[1]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-white bg-gray-400">
              minY : {tileData?.extent[2]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-white bg-gray-400">
              maxY : {tileData?.extent[3]}
            </p>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-max rounded  p-2">
          <h1 className="text-lg font-bold">Center</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-white bg-gray-400">
              minX : {tileData?.center[0]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-white bg-gray-400">
              maxX : {tileData?.center[1]}
            </p>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-max rounded  p-2">
          <h1 className="text-lg font-bold">Zoom</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] h-8  w-full flex p-2 justify-start items-center rounded text-white bg-gray-400">
              {tileData?.zoom[0]}
            </p>
            <p className="text-[10px] h-8  w-full flex p-2 justify-start items-center rounded text-white bg-gray-400">
              {tileData?.zoom[1]}
            </p>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-max rounded  p-2">
          <h1 className="text-lg font-bold">Projection</h1>
          <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-white bg-gray-400">
            {tileData?.projection}
          </p>
        </div>
        <div className=" w-full h-[250px]">
          <h1 className="text-lg font-bold">
            Folder Name :{" "}
            <span className="text-red-500 font-bold">{tileData?.name}</span>
          </h1>
          <img
            src={`data:image/png;base64,${tileData?.thubmnailbase64img}`}
            alt=""
            className="w-full h-max"
          />
        </div>
      </div>
    </div>
  );
};

export default OfflineMapScreen;
