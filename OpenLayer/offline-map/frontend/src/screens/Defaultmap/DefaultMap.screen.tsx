import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, Projection, toLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";
import { CoordianteCard } from "./components/CoordianteCard";
import Draw, { createBox } from "ol/interaction/Draw";
import { Polygon } from "ol/geom";
import { TileDownlodOptionCard } from "./components/TileDownlodOptionCard";
import { DefaultMapHeader } from "./components/DefaultMapHeader";
import { MapAreaTool } from "./components/MapAreaTool";
import { defaults as defaultControls } from "ol/control";
import { ZoomControls } from "../../ui-global/ZoomControls";
import { CustomDialog } from "../../ui-global/CustomeDialog";
import { DownloadStatusCard } from "./components/DownloadStatusCard";
import XYZ from "ol/source/XYZ";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import io, { Socket } from "socket.io-client";
import Overlay from "ol/Overlay";

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

interface DownloadState {
  isDownloading: boolean;
  showDownloadStatus: boolean;
  downloadProgress: number;
  isDownloadComplete: boolean;
  folderName?: string;
}

const persistDownloadState = (state: DownloadState) => {
  localStorage.setItem("downloadState", JSON.stringify(state));
};
const getPersistedDownloadState = () => {
  const state = localStorage.getItem("downloadState");
  return state ? JSON.parse(state) : null;
};
const clearPersistedDownloadState = () => {
  localStorage.removeItem("downloadState");
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);

  console.log("downloadProgress", downloadProgress);

  const style = new Style({
    stroke: new Stroke({
      color: "#909093",
      width: 3,
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
    const { minLon, minLat, maxLon, maxLat } = data;

    try {
      setIsDownloading(true);
      setError(null);
      setIsDownloadTileDialogOpen(false);
      setShowDownloadStatus(true);

      // Persist state at the start of download
      persistDownloadState({
        isDownloading: true,
        showDownloadStatus: true,
        downloadProgress: 0,
        isDownloadComplete: false,
      });

      const extent = [minLon, minLat, maxLon, maxLat];
      const center = [(minLon + maxLon) / 2, (minLat + maxLat) / 2];

      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      if (selectedSaveOption === "GCS") {
        await fetch(`/api/v1/tile/download-tiles/gcs/${zoomLevel}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            extent,
            center,
            projection: projection.getCode(),
            mapSource: currentMapSource,
            socketId,
          }),
        });
      } else {
        const res = await fetch(
          `/api/v1/tile/download-tiles/disk/${zoomLevel}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              extent,
              center,
              projection: projection.getCode(),
              mapSource: currentMapSource,
              socketId,
            }),
          }
        );

        const contentDisposition = res.headers.get("Content-Disposition");
        if (contentDisposition && contentDisposition.includes("attachment")) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.download = `${data.folderName}.zip`;
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error("Unexpected response format, expected a zip file.");
        }
      }

      clearInterval(progressInterval);
      setDownloadProgress(100);
      setIsDownloadComplete(true);
    } catch (error) {
      console.error("Error downloading tile:", error);
      setError("Error downloading tile");
      setShowDownloadStatus(false);
    } finally {
      setIsDownloading(false);
      // Clear persisted state when done
      clearPersistedDownloadState();
    }
  };

  const handleDownloadStatusClose = () => {
    setShowDownloadStatus(false);
    setDownloadProgress(0);
    setIsDownloadComplete(false);
    clearPersistedDownloadState();
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

          const overlayElement = document.createElement("div");
          overlayElement.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z" fill="#242F35"/>
          </svg>`;
          overlayElement.style.cursor = "pointer";
          overlayElement.style.position = "absolute";
          overlayElement.style.transform = "translate(-105%, -135%)";
          overlayElement.style.left = "50%";
          overlayElement.style.zIndex = "1000";
          const overlay = new Overlay({
            element: overlayElement,
            position: [maxX, maxY],
            positioning: "top-right",
          });

          if (map) {
            map.addOverlay(overlay);

            overlayElement.addEventListener("click", () => {
              vectorSourceRef.current.removeFeature(feature);
              if (map) {
                map.removeOverlay(overlay);
              }
              setCurrentFeature(null);
            });
          }
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

  const handleMapSourceChange = (source: string) => {
    setCurrentMapSource(source);
  };

  const handleCancelDownload = async () => {
    try {
      const response = await fetch("/api/v1/tile/cancel-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderName: formData.folderName,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);

        // Only close and reset if response is OK
        setShowDownloadStatus(false);
        setIsDownloading(false);
        setDownloadProgress(0);
        setIsDownloadComplete(false);
      } else {
        // Optionally, you can show an error message here
        const errorResult = await response.json();
        console.error("Cancel failed:", errorResult.error);
      }
    } catch (error) {
      console.error("Error canceling download:", error);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Replace with your server URL/port
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketId(newSocket.id || null);
    });

    newSocket.on("downloadProgress", (data) => {
      setDownloadProgress(data.progress);
      setShowDownloadStatus(true);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Restore download state on mount
  useEffect(() => {
    const persisted = getPersistedDownloadState();
    if (persisted && persisted.isDownloading) {
      setShowDownloadStatus(true);
      setIsDownloading(true);
      setDownloadProgress(persisted.downloadProgress || 0);
      setIsDownloadComplete(false);
      // Optionally: restore folderName, etc.
    }
  }, []);

  // Persist state on change
  useEffect(() => {
    persistDownloadState({
      isDownloading,
      showDownloadStatus,
      downloadProgress,
      isDownloadComplete,
      // Add folderName or other info if needed
    });
  }, [isDownloading, showDownloadStatus, downloadProgress, isDownloadComplete]);

  // On socket connect, if a download is in progress, re-emit a "resume" event
  useEffect(() => {
    if (socket && isDownloading) {
      const persisted = getPersistedDownloadState();
      if (persisted && persisted.folderName) {
        socket.emit("resumeDownloadProgress", {
          folderName: persisted.folderName,
        });
      }
    }
  }, [socket, isDownloading]);

  // Remove or increase the auto-close timer (optional)
  useEffect(() => {
    if (isDownloadComplete) {
      const timer = setTimeout(() => {
        handleDownloadStatusClose();
      }, 3000); // 3 seconds instead of 1, or remove this effect entirely
      return () => clearTimeout(timer);
    }
  }, [isDownloadComplete]);

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
        // onClose={handleDownloadStatusClose}
        onCancelDownload={handleCancelDownload}
      />
      <CustomDialog
        isOpen={isDownloadTileDialogOpen}
        onClose={handleDialogClose}
      >
        <TileDownlodOptionCard
          selectedSaveOption={selectedSaveOption}
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
