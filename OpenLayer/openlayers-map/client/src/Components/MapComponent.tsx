// import { Map, View } from "ol";
// import TileLayer from "ol/layer/Tile";
// import { fromLonLat } from "ol/proj";
// import { OSM } from "ol/source";
// import { useEffect, useRef } from "react";

// export const MapComponent = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (mapRef.current) {
//       const map = new Map({
//         target: mapRef.current,
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }),
//         ],
//         view: new View({
//           center: fromLonLat([0, 0]),
//           zoom: 2,
//           projection: "EPSG:3857",
//         }),
//       });

//       return () => {
//         map.setTarget(undefined);
//       };
//     }
//   }, []);

//   return <div ref={mapRef} className="h-screen w-screen" />;
// };

/* ------------------------- 2ed ----------------------------------- */

// import { Map, View } from "ol";
// import TileLayer from "ol/layer/Tile";
// import { fromLonLat } from "ol/proj";
// import XYZ from "ol/source/XYZ";
// import { useEffect, useRef } from "react";

// export const MapComponent = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (mapRef.current) {
//       const map = new Map({
//         target: mapRef.current,
//         layers: [
//           new TileLayer({
//             source: new XYZ({
//               url: "http://localhost:5000/tiles/{z}/{x}/{y}.png", // backend tile route
//               crossOrigin: "anonymous",
//             }),
//           }),
//         ],
//         view: new View({
//           center: fromLonLat([0, 0]),
//           zoom: 2,
//           projection: "EPSG:3857",
//         }),
//       });

//       return () => {
//         map.setTarget(undefined);
//       };
//     }
//   }, []);

//   return <div ref={mapRef} className="h-screen w-screen" />;
// };

/* ------------------------- 3ed ----------------------------------- */

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat, transformExtent } from "ol/proj";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { XYZ } from "ol/source";
import { Extent } from "ol/extent";
import { CustomDialog } from "../ui-components/CustomeDialog";

interface Tile {
  z: number;
  x: number;
  y: number;
  priority?: number;
}

interface DownloadResults {
  success: Tile[];
  failed: Tile[];
}

export const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [draw, setDraw] = useState<Draw | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const vectorSource = useRef<VectorSource>(new VectorSource({ wrapX: false }));
  const vectorLayer = useRef<VectorLayer>(
    new VectorLayer({ source: vectorSource.current })
  );

  const downloadTilesInRegion = async (extent: Extent, currentZoom: number) => {
    const MIN_ALLOWED_ZOOM = 10;
    const MAX_ALLOWED_ZOOM = 19;
    const CHUNK_SIZE = 100;

    const [minX, minY, maxX, maxY] = transformExtent(
      extent,
      "EPSG:3857",
      "EPSG:4326"
    );

    const getTileCoords = (lon: number, lat: number, z: number) => {
      const x = Math.floor(((lon + 180) / 360) * Math.pow(2, z));
      const y = Math.floor(
        ((1 -
          Math.log(
            Math.tan((lat * Math.PI) / 180) +
              1 / Math.cos((lat * Math.PI) / 180)
          ) /
            Math.PI) /
          2) *
          Math.pow(2, z)
      );
      return [x, y];
    };

    const allTiles = [];
    const zoomLevels = [
      currentZoom,
      ...Array.from(
        { length: MAX_ALLOWED_ZOOM - MIN_ALLOWED_ZOOM + 1 },
        (_, i) => MIN_ALLOWED_ZOOM + i
      ).filter((z) => z !== currentZoom),
    ];

    for (const zoom of zoomLevels) {
      const [minTileX, minTileY] = getTileCoords(minX, maxY, zoom);
      const [maxTileX, maxTileY] = getTileCoords(maxX, minY, zoom);

      const tilesCount = (maxTileX - minTileX + 1) * (maxTileY - minTileY + 1);
      console.log(`Processing zoom level ${zoom}: ${tilesCount} tiles`);

      if (tilesCount > 3000) {
        console.warn(
          `Warning: Large number of tiles (${tilesCount}) at zoom level ${zoom}`
        );
      }

      for (let x = minTileX; x <= maxTileX; x++) {
        for (let y = minTileY; y <= maxTileY; y++) {
          allTiles.push({
            z: zoom,
            x,
            y,
            priority: zoom === currentZoom ? 1 : 2,
          });
        }
      }
    }

    // Sort tiles by priority
    allTiles.sort((a, b) => a.priority - b.priority);

    console.log(
      `Preparing to download ${allTiles.length} tiles across zoom levels ${MIN_ALLOWED_ZOOM}-${MAX_ALLOWED_ZOOM}`
    );

    // Process tiles in chunks
    const chunks = [];
    for (let i = 0; i < allTiles.length; i += CHUNK_SIZE) {
      chunks.push(allTiles.slice(i, i + CHUNK_SIZE));
    }

    const results: DownloadResults = {
      success: [],
      failed: [],
    };

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(
        `Processing chunk ${i + 1}/${chunks.length} (${chunk.length} tiles)`
      );

      try {
        const response = await fetch("http://localhost:5000/tiles/batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tiles: chunk }),
        });

        if (!response.ok) {
          throw new Error(`Batch download failed for chunk ${i + 1}`);
        }

        const chunkResults: DownloadResults = await response.json();
        results.success.push(...chunkResults.success);
        results.failed.push(...chunkResults.failed);
      } catch (error) {
        console.error(`Error downloading chunk ${i + 1}:`, error);
        results.failed.push(...chunk);
      }

      // Add a small delay between chunks
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(
      `Download complete. Success: ${results.success.length}, Failed: ${results.failed.length}`
    );
    if (results.failed.length > 0) {
      console.warn("Failed tiles:", results.failed);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      const initializedMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://localhost:5000/tiles/{z}/{x}/{y}.png",
              crossOrigin: "anonymous",
            }),
          }),
          vectorLayer.current,
        ],
        view: new View({
          center: fromLonLat([80.431829, 16.31751]),
          zoom: 10,
          projection: "EPSG:3857",
        }),
      });

      setMap(initializedMap);

      return () => {
        initializedMap.setTarget(undefined);
      };
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    if (draw) {
      map.removeInteraction(draw);
    }

    const geometryFunction = createBox();
    const drawType: "Circle" | "Polygon" = "Circle";

    const newDraw = new Draw({
      source: vectorSource.current,
      type: drawType,
      geometryFunction: geometryFunction,
    });

    newDraw.on("drawend", (event) => {
      const feature = event.feature;
      const geometry = feature.getGeometry();
      if (geometry) {
        setIsDialogOpen(true);
      }
    });

    map.addInteraction(newDraw);
    setDraw(newDraw);
  }, [map]);

  const handleDownload = () => {
    const features = vectorSource.current.getFeatures();
    if (features.length > 0) {
      const geometry = features[0].getGeometry();
      if (geometry) {
        const extent = geometry.getExtent();
        const currentZoom = Math.round(map?.getView().getZoom() || 0);
        downloadTilesInRegion(extent, currentZoom);
      }
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    vectorSource.current.clear();
    setIsDialogOpen(false);
  };

  return (
    <>
      <div ref={mapRef} className="h-screen w-screen" />
      <CustomDialog isOpen={isDialogOpen} onClose={handleCancel}>
        <div className="w-96 h-14 absolute -top-52 left-0">
          <button
            onClick={handleCancel}
            className="w-1/2 h-full bg-yellow-500 text-yellow-700 cursor-pointer rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="w-1/2 h-full text-lime-700 bg-lime-500 cursor-pointer rounded-lg"
          >
            Download tiles
          </button>
        </div>
      </CustomDialog>
    </>
  );
};
