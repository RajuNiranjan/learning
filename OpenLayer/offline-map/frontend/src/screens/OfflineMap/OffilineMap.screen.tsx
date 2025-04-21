import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Tile } from "../MapDashBoard/components/MapThumbNailCard";
import { axiosInstance } from "../../utils/axiosInstance";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

const OfflineMapScreen = () => {
  const { tileId } = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const [tileData, setTileData] = useState<Tile | null>(null);
  const [tileFiles, setTileFiles] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchTileData = async () => {
      const res = await axiosInstance.get(`/api/v1/tile/${tileId}`);
      // console.log(res.data.tileFiles);
      setTileData(res.data.tile);
      setTileFiles(res.data.tileFiles);
    };
    fetchTileData();
  }, [tileId]);

  useEffect(() => {
    if (tileData && tileFiles && mapRef.current) {
      // Create custom tile source using the downloaded tiles
      const tileSource = new XYZ({
        tileLoadFunction: (tile, src) => {
          const [z, x, y] = src.split("/").slice(-3);
          const zoom = z;
          const tileBase64 = tileFiles[zoom]?.[x]?.[y.replace(".png", "")];

          if (tileBase64) {
            const img = tile.getImage();
            if (img instanceof HTMLImageElement) {
              img.src = `data:image/png;base64,${tileBase64}`;
            }
          }
        },
        url: "tiles/{z}/{x}/{y}.png", // This is just for the tile URL pattern
      });

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: tileSource,
          }),
        ],
        view: new View({
          center: tileData.center,
          zoom: tileData.zoom[0],
        }),
      });

      return () => map.setTarget(undefined);
    }
  }, [tileData, tileFiles]);

  return (
    <div className="p-4 bg-[#aad3df] h-screen w-screen">
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
      <div
        ref={mapRef}
        className="w-full h-[calc(100vh-120px)] rounded-lg shadow-lg"
      />
      <div className="flex flex-col gap-2 absolute top-20 right-10">
        <div className="bg-white/50 backdrop-blur-sm w-[200px] h-max rounded  p-2">
          <h1 className="text-lg font-bold">Extent</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-black/60 bg-white/40">
              minX : {tileData?.extent[0]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-black/60 bg-white/40">
              maxX : {tileData?.extent[1]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-black/60 bg-white/40">
              minY : {tileData?.extent[2]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-black/60 bg-white/40">
              maxY : {tileData?.extent[3]}
            </p>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm w-[200px]  h-max rounded  p-2">
          <h1 className="text-lg font-bold">Center</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-black/60 bg-white/40">
              minX : {tileData?.center[0]}
            </p>
            <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-black/60 bg-white/40">
              maxX : {tileData?.center[1]}
            </p>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm w-[200px]  h-max rounded  p-2">
          <h1 className="text-lg font-bold">Zoom</h1>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] h-8  w-full flex p-2 justify-start items-center rounded text-black/60 bg-white/40">
              {tileData?.zoom[0]}
            </p>
            <p className="text-[10px] h-8  w-full flex p-2 justify-start items-center rounded text-black/60 bg-white/40">
              {tileData?.zoom[1]}
            </p>
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm w-[200px]  h-max rounded  p-2">
          <h1 className="text-lg font-bold">Projection</h1>
          <p className="text-[10px] h-8  w-full flex justify-center items-center rounded text-black/60 bg-white/40">
            {tileData?.projection}
          </p>
        </div>
        {/* <div className=" w-full h-[250px]">
          <h1 className="text-lg font-bold">
            Folder Name :{" "}
            <span className="text-red-500 font-bold">{tileData?.name}</span>
          </h1>
          <img
            src={`data:image/png;base64,${tileData?.thubmnailbase64img}`}
            alt=""
            className="w-full h-max"
          />
        </div> */}
      </div>
    </div>
  );
};

export default OfflineMapScreen;
