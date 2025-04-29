import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tile } from "../MapDashBoard/components/MapThumbNailCard";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { Loader } from "../../ui-global/Loader";
import OlTile from "ol/Tile";
import { ZoomControls } from "../../ui-global/ZoomControls";
import { defaults as defaultControls } from "ol/control";

const OfflineMapScreen = () => {
  const { tileId } = useParams();
  const [tileData, setTileData] = useState<Tile | null>(null);
  const offlineMapRef = useRef<HTMLDivElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState(16);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    const fetchTileData = async () => {
      try {
        const res = await fetch(`/api/v1/tile/${tileId}`);
        const data = await res.json();
        setTileData(data.tile);
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

    if (offlineMapRef.current && tileData) {
      const tileUrl = `/api/v1/tile/${tileId}/{z}/{x}/{y}.png`;

      const customTileSource = new XYZ({
        url: tileUrl,
      });

      const raster = new TileLayer({
        source: customTileSource,
      });

      offlineMap = new Map({
        target: offlineMapRef.current,
        layers: [raster],
        controls: defaultControls({ zoom: false }),
        view: new View({
          center: fromLonLat(tileData.center),
          zoom: zoomLevel,
          minZoom: tileData.zoom[0],
          maxZoom: tileData.zoom[1],
          projection: tileData.projection,
        }),
      });

      mapInstanceRef.current = offlineMap;

      offlineMap.on("moveend", () => {
        const view = offlineMap?.getView();
        const newZoomLevel = view?.getZoom() || zoomLevel;
        if (newZoomLevel !== undefined) {
          setZoomLevel(Math.round(newZoomLevel));
        }
      });

      return () => {
        offlineMap?.setTarget(undefined);
      };
    }
  }, [tileData, zoomLevel]);

  if (!tileData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" bg-[#aad3df] h-screen w-screen">
      <div ref={offlineMapRef} className="h-full w-full bg-[#aad3df]" />
      <div className="flex items-center gap-2 my-4 absolute top-0 left-5">
        <div className="flex items-center gap-2 text-gray-600">
          <Link
            to="/map-dashboard"
            className="hover:text-blue-500 text-white hover:underline"
          >
            Dashboard
          </Link>
          <span className="text-white">{">"}</span>
          <span className="text-white font-bold hover:underline cursor-default">
            {tileData?.name || "Loading..."}
          </span>
        </div>
      </div>

      <ZoomControls
        mapInstanceRef={mapInstanceRef as React.RefObject<Map>}
        zoomLevel={zoomLevel}
      />

      {/* <div className="flex flex-col gap-2 absolute top-20 right-10">
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
      </div> */}
    </div>
  );
};

export default OfflineMapScreen;
