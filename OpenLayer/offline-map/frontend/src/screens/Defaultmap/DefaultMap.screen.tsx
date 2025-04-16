import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";
import { CoordianteCard } from "./compoents/CoordianteCard";
import Draw, { createBox } from "ol/interaction/Draw";
import { DrawOption } from "./compoents/DrawOption";
import { Polygon } from "ol/geom";
import { CustomDialog } from "../../ui-global/CustomeDialog";
import { TailDownlodOptionCard } from "./compoents/TailDownlodOptionCard";

type Coordinates = {
  lat: number;
  lon: number;
};

const DefaultMapScreen = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const vectorSourceRef = useRef<VectorSource>(new VectorSource());
  const mapInstanceRef = useRef<Map | null>(null);
  const [drawInteraction, setDrawInteraction] = useState<Draw | null>(null);
  const [isDrawShape, setIsDrawShape] = useState<boolean>(false);
  const [isDownloadTileDialogOpen, setIsDownloadTileDialogOpen] =
    useState<boolean>(false);
  const [currentFeature, setCurrentFeature] = useState<Feature | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lon: 0,
  });

  const handleDialogClose = () => {
    setIsDownloadTileDialogOpen(false);
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

    const vector = new VectorLayer({
      source: vectorSourceRef.current,
    });

    if (mapRef.current) {
      map = new Map({
        target: mapRef.current,
        layers: [raster, vector],
        view: new View({
          center: fromLonLat([80.4365, 16.3067]),
          zoom: 12,
        }),
      });

      mapInstanceRef.current = map;

      const draw = new Draw({
        type: "Circle",
        source: vectorSourceRef.current,
        geometryFunction: createBox(),
      });

      setDrawInteraction(draw);

      draw.on("drawend", (e) => {
        const feature = e.feature;
        const geometry = feature?.getGeometry();
        if (geometry instanceof Polygon) {
          const coordinates = geometry.getCoordinates();
          console.log(coordinates);
          setCurrentFeature(feature);
          setIsDownloadTileDialogOpen(true);
        }
      });

      map.on("pointermove", (e) => {
        const coordinates = toLonLat(e.coordinate);
        setCoordinates({
          lat: coordinates[0],
          lon: coordinates[1],
        });
      });
    }

    return () => {
      if (map) {
        map.setTarget(undefined);
      }
    };
  }, []);

  const toggleDrawShape = () => {
    if (mapInstanceRef.current && drawInteraction) {
      if (isDrawShape) {
        mapInstanceRef.current.addInteraction(drawInteraction);
      } else {
        mapInstanceRef.current.removeInteraction(drawInteraction);
      }
    }
  };

  useEffect(() => {
    toggleDrawShape();
  }, [isDrawShape]);

  return (
    <div>
      <div ref={mapRef} className="w-screen h-[calc(100vh-40px)]" />
      <CoordianteCard coordinates={coordinates} />
      <DrawOption isDrawShape={isDrawShape} setIsDrawShape={setIsDrawShape} />
      <CustomDialog
        isOpen={isDownloadTileDialogOpen}
        onClose={handleDialogClose}
      >
        <TailDownlodOptionCard />
      </CustomDialog>
    </div>
  );
};

export default DefaultMapScreen;
