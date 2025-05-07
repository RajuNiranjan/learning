import React, { useRef, useEffect } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import {
  never,
  platformModifierKeyOnly,
  primaryAction,
} from "ol/events/condition.js";
import { getCenter, getHeight, getWidth } from "ol/extent.js";
import Point from "ol/geom/Point.js";
import Draw, { createBox } from "ol/interaction/Draw.js";
import Modify from "ol/interaction/Modify.js";
import Translate from "ol/interaction/Translate.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector.js";
import OSM from "ol/source/OSM.js";
import VectorSource from "ol/source/Vector.js";
import CircleStyle from "ol/style/Circle.js";
import Fill from "ol/style/Fill.js";
import Stroke from "ol/style/Stroke.js";
import Style from "ol/style/Style.js";
import "ol/ol.css";

export const MapOne: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const typeSelectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (!mapRef.current || !typeSelectRef.current) return;

    const raster = new TileLayer({
      source: new OSM(),
    });

    const source = new VectorSource();

    const style = new Style({
      geometry: function (feature) {
        const modifyGeometry = feature.get("modifyGeometry");
        return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
      },
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "blue",
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: "blue",
        }),
      }),
    });

    function calculateCenter(geometry: any) {
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
      } else if (type === "LineString") {
        center = geometry.getCoordinateAt(0.5);
        coordinates = geometry.getCoordinates();
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
    }

    const vector = new VectorLayer({
      source: source,
      style: function (feature) {
        const styles = [style];
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
          const coordinates = result.coordinates;
          if (coordinates) {
            const minRadius = result.minRadius;
            const sqDistances = result.sqDistances;
            const rsq = minRadius * minRadius;
            const points = coordinates.filter(function (
              coordinate: any,
              index: any
            ) {
              return sqDistances[index] > rsq;
            });
          }
        }
        return styles;
      },
    });

    const map = new Map({
      target: mapRef.current,
      layers: [raster, vector],
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });

    const defaultStyle = new Modify({ source: source })
      .getOverlay()
      .getStyleFunction();

    const modify = new Modify({
      source: source,
      condition: function (event) {
        return primaryAction(event) && !platformModifierKeyOnly(event);
      },
      deleteCondition: never,
      insertVertexCondition: never,
      style: function (feature, resolution) {
        feature.get("features").forEach(function (modifyFeature: any) {
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
      })
    );

    let draw: Draw | null = null;

    function addInteractions() {
      const type = typeSelectRef.current!.value;
      draw = new Draw({
        source: source,
        type: type === "Square" ? "Circle" : (type as any),
        geometryFunction: type === "Square" ? createBox() : undefined,
      });
      map.addInteraction(draw);
    }

    typeSelectRef.current.onchange = function () {
      if (draw) {
        map.removeInteraction(draw);
      }
      addInteractions();
    };

    addInteractions();

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
      <form className="absolute top-0 left-0 p-2 bg-white">
        <label htmlFor="type">Geometry type &nbsp;</label>
        <select id="type" ref={typeSelectRef}>
          {/* <option value="Circle">Circle</option> */}
          <option value="Square">Square</option>
        </select>
      </form>
    </div>
  );
};
