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

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { useEffect, useRef } from "react";

export const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://localhost:5000/tiles/{z}/{x}/{y}.png", // backend tile route
              crossOrigin: "anonymous",
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
          projection: "EPSG:3857",
        }),
      });

      return () => {
        map.setTarget(undefined);
      };
    }
  }, []);

  return <div ref={mapRef} className="h-screen w-screen" />;
};
