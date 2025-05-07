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
import Modify from "ol/interaction/Modify";
import Translate from "ol/interaction/Translate";
import {
  never,
  platformModifierKeyOnly,
  primaryAction,
} from "ol/events/condition";
import { getCenter, getHeight, getWidth } from "ol/extent";
import Point from "ol/geom/Point";
import Fill from "ol/style/Fill";
import CircleStyle from "ol/style/Circle";

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
  const overlayRef = useRef<Overlay | null>(null);
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

  const removeAllOverlays = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.getOverlays().clear();
    }
  };

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
        removeAllOverlays();
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
      removeAllOverlays();
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
      style: function (feature) {
        const styles = [
          new Style({
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new Stroke({
              color: "#909093",
              width: 3,
            }),
            image: new CircleStyle({
              radius: 0,
              fill: new Fill({
                color: "rgba(0, 0, 0, 0)",
              }),
            }),
          }),
        ];

        const modifyGeometry = feature.get("modifyGeometry");
        const geometry = modifyGeometry
          ? modifyGeometry.geometry
          : feature.getGeometry();
        const result = calculateCenter(geometry);
        const center = result.center;
        if (center) {
          styles.push(
            new Style({
              geometry: new Point(center),
            })
          );
        }
        return styles;
      },
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
          extent: [-20026376.39, -20048966.1, 20026376.39, 20048966.1],
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

      draw.on("drawend", (e) => {
        const feature = e.feature;
        const geometry = feature?.getGeometry();
        if (geometry instanceof Polygon) {
          vectorSourceRef.current.clear();
          if (map) {
            map.getOverlays().forEach((overlay) => {
              if (map) {
                map.removeOverlay(overlay);
              }
            });
          }

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

          overlayRef.current = overlay;

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

      // Add Modify interaction
      const defaultStyle = new Modify({ source: vectorSourceRef.current })
        .getOverlay()
        .getStyleFunction();

      const modify = new Modify({
        source: vectorSourceRef.current,
        condition: function (event) {
          return primaryAction(event) && !platformModifierKeyOnly(event);
        },
        deleteCondition: never,
        insertVertexCondition: never,
        style: function (feature, resolution) {
          feature
            .get("features")
            .forEach(function (modifyFeature: OLFeature<Geometry>) {
              const modifyGeometry = modifyFeature.get("modifyGeometry");
              if (modifyGeometry) {
                const point = feature.getGeometry()?.getCoordinates();
                let modifyPoint = modifyGeometry.point;
                if (!modifyPoint) {
                  modifyPoint = point;
                  modifyGeometry.point = modifyPoint;
                  modifyGeometry.geometry0 = modifyGeometry.geometry;
                  const result = calculateCenter(modifyGeometry.geometry0);
                  modifyGeometry.center = result.center;
                  modifyGeometry.minRadius = result.minRadius;
                }

                const center = modifyGeometry.center;
                const minRadius = modifyGeometry.minRadius;
                let dx, dy;
                dx = modifyPoint[0] - center[0];
                dy = modifyPoint[1] - center[1];
                const initialRadius = Math.sqrt(dx * dx + dy * dy);
                if (initialRadius > minRadius) {
                  dx = point[0] - center[0];
                  dy = point[1] - center[1];
                  const currentRadius = Math.sqrt(dx * dx + dy * dy);
                  if (currentRadius > 0) {
                    const geometry = modifyGeometry.geometry0.clone();
                    geometry.scale(
                      currentRadius / initialRadius,
                      undefined,
                      center
                    );
                    modifyGeometry.geometry = geometry;
                  }
                }
              }
            });
          return defaultStyle?.(feature, resolution);
        },
      });

      modify.on("modifystart", function (event) {
        event.features.forEach(function (feature) {
          feature.set(
            "modifyGeometry",
            { geometry: feature.getGeometry()?.clone() },
            true
          );
        });
      });

      modify.on("modifyend", function (event) {
        event.features.forEach(function (feature) {
          const modifyGeometry = feature.get("modifyGeometry");
          if (modifyGeometry) {
            feature.setGeometry(modifyGeometry.geometry);
            feature.unset("modifyGeometry", true);

            // Update overlay position
            if (overlayRef.current) {
              const geometry = feature.getGeometry();
              if (geometry instanceof Polygon) {
                const extent = geometry.getExtent();
                const [maxX, maxY] = [extent[2], extent[3]];
                overlayRef.current.setPosition([maxX, maxY]);
              }
            }

            // Update form data
            const geometry = feature.getGeometry();
            if (geometry instanceof Polygon) {
              const extent = geometry.getExtent();
              const [minX, minY, maxX, maxY] = extent;
              const [minLon, minLat] = toLonLat([minX, minY]);
              const [maxLon, maxLat] = toLonLat([maxX, maxY]);

              setFormData((prevData) => ({
                ...prevData,
                minLon,
                minLat,
                maxLon,
                maxLat,
              }));
            }
          }
        });
      });

      map.addInteraction(modify);
      map.addInteraction(
        new Translate({
          condition: function (event) {
            return primaryAction(event);
          },
          layers: [vector],
          hitTolerance: 0,
          filter: function (feature, layer) {
            return true;
          },
        })
      );

      // Add a pointer style to indicate draggability
      map.on("pointermove", function (e) {
        const hit = map.forEachFeatureAtPixel(e.pixel, function (feature) {
          return feature;
        });

        if (hit) {
          map.getTargetElement().style.cursor = "";
        } else {
          map.getTargetElement().style.cursor = "default";
        }
      });

      // Add a handler for translate end
      const translate = new Translate({
        condition: function (event) {
          return primaryAction(event);
        },
        layers: [vector],
      });

      translate.on("translateend", function (event) {
        event.features.forEach(function (feature) {
          const geometry = feature.getGeometry();
          if (geometry instanceof Polygon) {
            const extent = geometry.getExtent();
            const [maxX, maxY] = [extent[2], extent[3]];

            // Update overlay position
            if (overlayRef.current) {
              overlayRef.current.setPosition([maxX, maxY]);
            }

            const [minLon, minLat] = toLonLat([extent[0], extent[1]]);
            const [maxLon, maxLat] = toLonLat([maxX, maxY]);

            setFormData((prevData) => ({
              ...prevData,
              minLon,
              minLat,
              maxLon,
              maxLat,
            }));
          }
        });
      });

      map.addInteraction(translate);
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
        removeAllOverlays();
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

  const calculateCenter = (geometry: any) => {
    let center, coordinates, minRadius;
    const type = geometry.getType();
    if (type === "Polygon") {
      let x = 0;
      let y = 0;
      let i = 0;
      coordinates = geometry.getCoordinates()[0].slice(1);
      coordinates.forEach(function (coordinate: any) {
        x += coordinate[0];
        y += coordinate[1];
        i++;
      });
      center = [x / i, y / i];
    } else {
      center = getCenter(geometry.getExtent());
    }
    let sqDistances;
    if (coordinates) {
      sqDistances = coordinates.map(function (coordinate: any) {
        const dx = coordinate[0] - center[0];
        const dy = coordinate[1] - center[1];
        return dx * dx + dy * dy;
      });
      minRadius = Math.sqrt(Math.max(...sqDistances)) / 3;
    } else {
      minRadius =
        Math.max(
          getWidth(geometry.getExtent()),
          getHeight(geometry.getExtent())
        ) / 3;
    }
    return {
      center: center,
      coordinates: coordinates,
      minRadius: minRadius,
      sqDistances: sqDistances,
    };
  };

  return (
    <div className="w-screen h-screen">
      <DefaultMapHeader
        isDrawShape={isDrawShape}
        setIsDrawShape={setIsDrawShape}
        onSaveOptionSelect={handleSaveOptionSelect}
        hasDrawnShape={!!currentFeature}
      />
      <MapAreaTool onMapSourceChange={handleMapSourceChange} />
      <div ref={mapRef} className="w-full h-[calc(100vh-5rem)]" />
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
