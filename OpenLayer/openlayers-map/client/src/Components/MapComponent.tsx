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
import { fromLonLat } from "ol/proj";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
// import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
// import { SimpleGeometry } from "ol/geom";
import { XYZ } from "ol/source";
import { transformExtent } from "ol/proj";
import { Extent } from "ol/extent";

export const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [draw, setDraw] = useState<Draw | null>(null);

  const vectorSource = useRef<VectorSource>(new VectorSource({ wrapX: false }));
  const vectorLayer = useRef<VectorLayer>(
    new VectorLayer({ source: vectorSource.current })
  );

  useEffect(() => {
    if (mapRef.current) {
      const initializedMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://localhost:5000/tiles/{z}/{x}/{y}.png", // backend tile route
              crossOrigin: "anonymous",
            }),
          }),
          vectorLayer.current,
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
          projection: "EPSG:3857",
        }),
      });

      setMap(initializedMap);

      return () => {
        initializedMap.setTarget(undefined);
      };
    }
  }, []);

  const downloadTilesInRegion = async (extent: Extent, zoom: number) => {
    // Transform coordinates from EPSG:3857 to EPSG:4326 (lat/lon)
    const [minX, minY, maxX, maxY] = transformExtent(
      extent,
      "EPSG:3857",
      "EPSG:4326"
    );

    // Convert bounds to tile coordinates
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

    const [minTileX, minTileY] = getTileCoords(minX, maxY, zoom);
    const [maxTileX, maxTileY] = getTileCoords(maxX, minY, zoom);

    // Prepare batch request
    const tiles = [];
    for (let x = minTileX; x <= maxTileX; x++) {
      for (let y = minTileY; y <= maxTileY; y++) {
        tiles.push({ z: zoom, x, y });
      }
    }

    try {
      const response = await fetch("http://localhost:5000/tiles/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tiles }),
      });

      if (!response.ok) {
        throw new Error("Batch download failed");
      }

      const results = await response.json();
      console.log("Download results:", results);

      // Log statistics
      console.log(`Successfully downloaded: ${results.success.length} tiles`);
      console.log(`Failed downloads: ${results.failed.length} tiles`);

      if (results.failed.length > 0) {
        console.warn("Failed tiles:", results.failed);
      }
    } catch (error) {
      console.error("Error downloading tiles:", error);
    }
  };

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
        const extent = geometry.getExtent();
        const zoom = map.getView().getZoom() || 2;
        console.log("Downloading tiles for extent:", extent);
        downloadTilesInRegion(extent, Math.floor(zoom));
      }
    });

    map.addInteraction(newDraw);
    setDraw(newDraw);
  }, [map]);

  // const handleUndo = () => {
  //   if (draw) {
  //     draw.removeLastPoint();
  //   }
  // };

  return (
    <>
      <div ref={mapRef} className="h-screen w-screen" />
      {/* <div className="row mt-3 absolute top-96 left-0">
        <div className="col-auto">
          <div className="input-group">
            <button className="btn btn-outline-secondary" onClick={handleUndo}>
              Undo
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};
