import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, Projection, toLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";
import { CoordianteCard } from "./compoents/CoordianteCard";
import Draw, { createBox } from "ol/interaction/Draw";
import { Polygon } from "ol/geom";
import { TileDownlodOptionCard } from "./compoents/TileDownlodOptionCard";
import { DefaultMapHeader } from "./compoents/DefaultMapHeader";
import { MapAreaTool } from "./compoents/MapAreaTool";
import { defaults as defaultControls } from "ol/control";
import { ZoomControls } from "./compoents/ZoomControls";
import { CustomDialog } from "../../ui-global/CustomeDialog";
import { DownloadStatusCard } from "./compoents/DownloadStatusCard";
import XYZ from "ol/source/XYZ";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";

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
  const [selectedSaveOption, setSelectedSaveOption] = useState<string | null>(
    null
  );
  console.log("selectedSaveOption", selectedSaveOption);

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const [showDownloadStatus, setShowDownloadStatus] = useState(false);
  const [currentMapSource, setCurrentMapSource] = useState<string>("OSM Map");

  const style = new Style({
    stroke: new Stroke({
      color: "#909093",
      width: 2,
    }),
  });

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
      setIsDownloadTileDialogOpen(false);
      setShowDownloadStatus(true);

      const extent = [minLon, minLat, maxLon, maxLat];
      const center = [(minLon + maxLon) / 2, (minLat + maxLat) / 2];

      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      await fetch(
        `http://localhost:5000/api/v1/tile/download-tiles/gcs/${zoomLevel}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            folderName,
            minLon,
            minLat,
            maxLon,
            maxLat,
            extent,
            center,
            projection: projection.getCode(),
            mapSource: currentMapSource,
          }),
        }
      );

      clearInterval(progressInterval);
      setDownloadProgress(100);
      setIsDownloadComplete(true);
    } catch (error) {
      console.error("Error downloading tile:", error);
      setError("Error downloading tile");
      setShowDownloadStatus(false);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadStatusClose = () => {
    setShowDownloadStatus(false);
    setDownloadProgress(0);
    setIsDownloadComplete(false);
    if (currentFeature) {
      vectorSourceRef.current.removeFeature(currentFeature);
      setCurrentFeature(null);
    }
  };

  /**
   * Handling to initialize the map
   */
  useEffect(() => {
    let map: Map | undefined;
    const osmSource = new OSM();
    const googleSource = new XYZ({
      url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      crossOrigin: "anonymous",
    });

    // Get the current view state if map exists
    const currentZoom = mapInstanceRef.current?.getView().getZoom() || 12;
    const currentCenter =
      mapInstanceRef.current?.getView().getCenter() ||
      fromLonLat([80.4365, 16.3067]);

    const raster = new TileLayer({
      source: currentMapSource === "OSM Map" ? osmSource : googleSource,
    });

    const vector = new VectorLayer({
      source: vectorSourceRef.current,
      style,
    });

    if (mapRef.current) {
      map = new Map({
        target: mapRef.current,
        layers: [raster, vector],
        controls: defaultControls({ zoom: false }),
        view: new View({
          center: currentCenter,
          zoom: currentZoom,
          minZoom: 3,
          maxZoom: 18,
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
  }, [currentMapSource]);

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
        vectorSourceRef.current.clear();
        setCurrentFeature(null);
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

  const handleSaveOptionSelect = (option: string) => {
    if (currentFeature) {
      setSelectedSaveOption(option);
      setIsDownloadTileDialogOpen(true);
    }
  };

  // Add handler for map source changes
  const handleMapSourceChange = (source: string) => {
    setCurrentMapSource(source);
  };

  return (
    <div className="w-screen h-screen ">
      <DefaultMapHeader
        isDrawShape={isDrawShape}
        setIsDrawShape={setIsDrawShape}
        onSaveOptionSelect={handleSaveOptionSelect}
        hasDrawnShape={!!currentFeature}
      />
      <MapAreaTool onMapSourceChange={handleMapSourceChange} />
      <div ref={mapRef} className="w-screen h-[calc(100vh-80px)]" />
      <CoordianteCard coordinates={coordinates} />
      <ZoomControls
        mapInstanceRef={mapInstanceRef as React.RefObject<Map>}
        zoomLevel={zoomLevel}
      />
      <DownloadStatusCard
        isVisible={showDownloadStatus}
        progress={downloadProgress}
        isCompleted={isDownloadComplete}
        onClose={handleDownloadStatusClose}
      />
      {/* <DrawOption isDrawShape={isDrawShape} setIsDrawShape={setIsDrawShape} /> */}
      <CustomDialog
        isOpen={isDownloadTileDialogOpen}
        onClose={handleDialogClose}
      >
        <TileDownlodOptionCard
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleDownloadTileFormSubmit}
          isDownloading={isDownloading}
          onClose={handleDialogClose}
        />
      </CustomDialog>
    </div>
  );
};

export default DefaultMapScreen;
