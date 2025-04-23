import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, Projection, toLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";
import { CoordianteCard } from "./compoents/CoordianteCard";
import Draw, { createBox } from "ol/interaction/Draw";
import { DrawOption } from "./compoents/DrawOption";
import { Polygon } from "ol/geom";
import { CustomDialog } from "../../ui-global/CustomeDialog";
import { TileDownlodOptionCard } from "./compoents/TileDownlodOptionCard";
import { axiosInstance } from "../../utils/axiosInstance";
import { DefaultMapHeader } from "./compoents/DefaultMapHeader";
import { MapAreaTool } from "./compoents/MapAreaTool";

type Coordinates = {
  lat: number;
  lon: number;
};

export type FormData = {
  folderName: string;
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
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
  const [zoomLevel, setZoomLevel] = useState<number>(12);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: 0,
    lon: 0,
  });
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    console.log(error);
  }
  const projection = new Projection({
    code: "EPSG:3857",
    units: "m",
  });

  const [formData, setFormData] = useState<FormData>({
    folderName: "",
    minLon: 0,
    minLat: 0,
    maxLon: 0,
    maxLat: 0,
  });

  /**
   * Handling to close the dialog
   * @returns void
   */
  const handleDialogClose = () => {
    if (!isDownloading) {
      setIsDownloadTileDialogOpen(false);
      if (currentFeature) {
        vectorSourceRef.current.removeFeature(currentFeature);
        setCurrentFeature(null);
      }
    }
  };

  /**
   * Handling to submit the form
   * @param data - Form data
   * @returns void
   */
  const handleDownloadTileFormSubmit = async (data: FormData) => {
    const { folderName, minLon, minLat, maxLon, maxLat } = data;

    try {
      setIsDownloading(true);
      setError(null);
      const extent = [minLon, minLat, maxLon, maxLat];
      const center = [(minLon + maxLon) / 2, (minLat + maxLat) / 2];

      await axiosInstance.post(`/api/v1/tile/download-tiles/${zoomLevel}`, {
        folderName,
        minLon,
        minLat,
        maxLon,
        maxLat,
        extent,
        center,
        projection: projection.getCode(),
      });
    } catch (error) {
      console.error("Error downloading tile:", error);
      setError("Error downloading tile");
    } finally {
      setIsDownloading(false);
      handleDialogClose();
    }
  };

  /**
   * Handling to initialize the map
   */
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
          projection,
        }),
      });

      mapInstanceRef.current = map;

      map?.getView().on("change:resolution", () => {
        const updatedZoom = map?.getView().getZoom();
        if (updatedZoom !== undefined) {
          setZoomLevel(Math.round(updatedZoom));
        } else {
          console.error("Zoom level is undefined");
        }
      });

      const draw = new Draw({
        type: "Circle",
        source: vectorSourceRef.current,
        geometryFunction: createBox(),
      });

      setDrawInteraction(draw);

      /**
       * Handling to draw the shape
       * @param e - Draw event
       * @returns void
       */
      draw.on("drawend", (e) => {
        const feature = e.feature;
        const geometry = feature?.getGeometry();
        if (geometry instanceof Polygon) {
          const extent = geometry.getExtent();
          const [minX, minY, maxX, maxY] = extent;
          const [minLon, minLat] = toLonLat([minX, minY]);
          const [maxLon, maxLat] = toLonLat([maxX, maxY]);

          setCurrentFeature(feature);
          setIsDownloadTileDialogOpen(true);
          setFormData({
            folderName: "",
            minLon,
            minLat,
            maxLon,
            maxLat,
          });
        }
      });

      /**
       * Handling to get the coordinates
       * @param e - Pointer move event
       * @returns void
       */
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

  /**
   * Handling to toggle the draw shape
   * @returns void
   */
  const toggleDrawShape = () => {
    if (mapInstanceRef.current && drawInteraction) {
      if (isDrawShape) {
        mapInstanceRef.current.addInteraction(drawInteraction);
      } else {
        mapInstanceRef.current.removeInteraction(drawInteraction);
      }
    }
  };

  /**
   * Handling to toggle the draw shape
   * @returns void
   */
  useEffect(() => {
    toggleDrawShape();
  }, [isDrawShape]);

  return (
    <div className="w-screen h-screen ">
      <DefaultMapHeader
        isDrawShape={isDrawShape}
        setIsDrawShape={setIsDrawShape}
      />
      <MapAreaTool />
      <div ref={mapRef} className="w-screen h-[calc(100vh-80px)]" />
      <CoordianteCard coordinates={coordinates} />
      {/* <DrawOption isDrawShape={isDrawShape} setIsDrawShape={setIsDrawShape} /> */}
      {/* <CustomDialog
        isOpen={isDownloadTileDialogOpen}
        onClose={handleDialogClose}
      >
        <TileDownlodOptionCard
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleDownloadTileFormSubmit}
          isDownloading={isDownloading}
        />
      </CustomDialog> */}
    </div>
  );
};

export default DefaultMapScreen;
