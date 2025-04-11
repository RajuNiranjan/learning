import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";

export const MapComponent = () => {
  const mapRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
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
  }, []);

  return <div ref={mapRef} className="h-screen w-screen" />;
};

// import React, { useEffect, useRef } from "react";
// import "ol/ol.css";
// import Map from "ol/Map";
// import View from "ol/View";
// import TileLayer from "ol/layer/Tile";
// import XYZ from "ol/source/XYZ";
// import { fromLonLat } from "ol/proj";

// const MapComponent: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const tileLayer = new TileLayer({
//       source: new XYZ({
//         url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
//       }),
//     });

//     const map = new Map({
//       target: mapRef.current!,
//       layers: [tileLayer],
//       view: new View({
//         center: fromLonLat([78.9629, 20.5937]), // India center
//         zoom: 4,
//       }),
//     });

//     return () => map.setTarget(undefined);
//   }, []);

//   return <div ref={mapRef} className="w-full h-screen" />;
// };

// export default MapComponent;
