import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Tile } from "../MapDashBoard/components/MapThumbNailCard";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { Loader } from "../../ui-global/Loader";
import { ZoomControls } from "../../ui-global/ZoomControls";
import { defaults as defaultControls } from "ol/control";
import { OfflineMapHeader } from "./components/OfflineMapHeader";

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
      <OfflineMapHeader tileData={tileData} />
      <div
        ref={offlineMapRef}
        className="h-[calc(100vh-5rem)] w-full bg-[#aad3df]"
      />

      <ZoomControls
        mapInstanceRef={mapInstanceRef as React.RefObject<Map>}
        zoomLevel={zoomLevel}
      />
    </div>
  );
};

export default OfflineMapScreen;
