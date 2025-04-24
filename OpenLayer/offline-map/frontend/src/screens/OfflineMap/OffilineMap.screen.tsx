import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { Tile } from "../MapDashBoard/components/MapThumbNailCard";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { Loader } from "../../ui-global/Loader";

const OfflineMapScreen = () => {
  const { tileId } = useParams();
  const [tileData, setTileData] = useState<Tile | null>(null);
  const offlineMapRef = useRef<HTMLDivElement | null>(null);
  const [tileFiles, setTileFiles] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    console.log("Current tileData:", tileData);
    console.log("Current tileFiles structure:", tileFiles);
  }, [tileData, tileFiles]);

  useEffect(() => {
    const fetchTileData = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/tile/${tileId}`);
        setTileData(res.data.tile);
        setTileFiles(res.data.tileFiles);
      } catch (error) {
        console.error("Error fetching tile data:", error);
      }
    };
    fetchTileData();
  }, [tileId]);

  /**
   * Initializing the map with custom tile layer
   */
  useEffect(() => {
    let offlineMap: Map | undefined;

    if (offlineMapRef.current && tileFiles && tileData) {
      console.log("Initializing map with:", {
        center: tileData.center,
        zoom: tileData.zoom,
        extent: tileData.extent,
      });

      const customTileSource = new XYZ({
        tileLoadFunction: (imageTile, src) => {
          const tileCoord = imageTile.getTileCoord();
          if (!tileCoord) return;

          const z = String(tileCoord[0]);
          const x = String(tileCoord[1]);
          const y = String(tileCoord[2]);

          console.log("Loading tile:", { z, x, y }); // Debug log

          try {
            if (tileFiles[z]?.[x]?.[y]) {
              const img = imageTile.getImage() as HTMLImageElement;
              img.src = `data:image/png;base64,${tileFiles[z][x][y]}`;
              console.log("Tile found and loaded"); // Debug log
            } else {
              console.log("Tile not found in cache"); // Debug log
              const img = imageTile.getImage() as HTMLImageElement;
              img.src =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
            }
          } catch (error) {
            console.error("Error loading tile:", error);
          }
        },
        url: "dummy/{z}/{x}/{y}",
      });

      const raster = new TileLayer({
        source: customTileSource,
      });

      offlineMap = new Map({
        target: offlineMapRef.current,
        layers: [raster],
        view: new View({
          center: fromLonLat(tileData.center),
          zoom: 16,
          minZoom: tileData.zoom[0],
          maxZoom: tileData.zoom[1],
          projection: "EPSG:3857",
        }),
      });

      // Add map event listeners for debugging
      offlineMap.on("moveend", () => {
        const view = offlineMap?.getView();
        console.log("Map state:", {
          zoom: view?.getZoom(),
          center: view?.getCenter(),
          resolution: view?.getResolution(),
        });
      });

      return () => {
        offlineMap?.setTarget(undefined);
      };
    }
  }, [tileFiles, tileData]);

  if (!tileData || !tileFiles) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" bg-[#aad3df] h-screen w-screen">
      <div ref={offlineMapRef} className="h-full w-full bg-[#aad3df]" />
      <div className="flex items-center gap-2 my-4 absolute top-0 left-20">
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
      </div>
    </div>
  );
};

export default OfflineMapScreen;
