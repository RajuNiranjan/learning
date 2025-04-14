import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Draw, { createBox } from "ol/interaction/Draw";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { SimpleGeometry } from "ol/geom";

const MapDrawShapes: React.FC = () => {
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
        layers: [new TileLayer({ source: new OSM() }), vectorLayer.current],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      setMap(initializedMap);
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
        console.log(
          "Coordinates:",
          (geometry as SimpleGeometry).getCoordinates()
        );
      }
    });

    map.addInteraction(newDraw);
    setDraw(newDraw);
  }, [map]);

  const handleUndo = () => {
    if (draw) {
      draw.removeLastPoint();
    }
  };

  return (
    <div className="container mt-4">
      <div
        ref={mapRef}
        className="map"
        style={{ width: "100%", height: "400px" }}
      ></div>

      <div className="row mt-3 absolute top-96 left-0">
        <div className="col-auto">
          <div className="input-group">
            <button className="btn btn-outline-secondary" onClick={handleUndo}>
              Undo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDrawShapes;
