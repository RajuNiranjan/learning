import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, toLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import { useEffect, useRef, useState } from "react";
import { CoordsCard } from "./CoordsCard";
import { Coords } from "../types";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw, { createBox } from "ol/interaction/Draw";
import { Polygon } from "ol/geom";
import { MapOptions } from "./MapOptions";
import { CustomDialog } from "../ui-components/CustomDialog";
import { DownloadTilesOptions } from "./DowloadOptions";

export const DefaultMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<Coords>({
    lon: 80.57782827520369,
    lat: 16.40892357917265,
  });
  const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);
  const [isDrawBox, setIsDrawBox] = useState(false);
  const vectorSourceRef = useRef<VectorSource>(
    new VectorSource({ wrapX: false })
  );
  const mapInstanceRef = useRef<Map | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<any>(null);

  const toggleDrawShape = () => {
    if (mapInstanceRef.current && drawInteraction) {
      if (isDrawBox) {
        mapInstanceRef.current.addInteraction(drawInteraction);
      } else {
        mapInstanceRef.current.removeInteraction(drawInteraction);
      }
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (currentFeature) {
      vectorSourceRef.current.removeFeature(currentFeature);
      setCurrentFeature(null);
    }
  };

  useEffect(() => {
    let map: Map | undefined;

    const raster = new TileLayer({
      source: new OSM(),
    });

    const vector = new VectorLayer({ source: vectorSourceRef.current });

    if (mapRef.current) {
      map = new Map({
        layers: [raster, vector],
        target: mapRef.current,
        view: new View({
          center: fromLonLat([80.4365, 16.3067]),
          zoom: 12,
        }),
      });
      mapInstanceRef.current = map;

      const draw = new Draw({
        source: vectorSourceRef.current,
        type: "Circle",
        geometryFunction: createBox(),
      });

      setDrawInteraction(draw);

      draw.on("drawend", (e) => {
        const feature = e.feature;
        const geometry = feature.getGeometry();
        if (geometry instanceof Polygon) {
          const coordinates = geometry?.getCoordinates();
          console.log("coordinates", coordinates);
          setCurrentFeature(feature);
          setIsDialogOpen(true);
        }
      });

      map.on("pointermove", (e) => {
        const coords = toLonLat(e.coordinate);
        setCoords({ lon: coords[0], lat: coords[1] });
      });
    }
    return () => {
      if (map) {
        map.setTarget(undefined);
      }
    };
  }, []);

  useEffect(() => {
    toggleDrawShape();
  }, [isDrawBox]);

  return (
    <div>
      <div ref={mapRef} className="h-[calc(100vh-40px)] w-screen" />
      <CoordsCard coords={coords} />
      <MapOptions onDrawingToggle={setIsDrawBox} />
      <CustomDialog isOpen={isDialogOpen} onClose={handleDialogClose}>
        <DownloadTilesOptions
          setIsDialogOpen={setIsDialogOpen}
          onCancel={handleDialogClose}
        />
      </CustomDialog>
    </div>
  );
};
