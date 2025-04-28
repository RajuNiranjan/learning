import React from "react";
import { ZoomInIcon, ZoomOutIcon } from "../assets/assets";
import { Map } from "ol";

interface ZoomControlsProps {
  mapInstanceRef: React.RefObject<Map>;
  zoomLevel: number;
}

export const ZoomControls = ({
  mapInstanceRef,
  zoomLevel,
}: ZoomControlsProps) => {
  const handleZoom = (delta: number) => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      if (view) {
        view.setZoom((view.getZoom() || 0) + delta);
      }
    }
  };

  return (
    <div className="absolute bottom-4 right-4 flex gap-[0.25rem] z-50">
      <button
        onClick={() => handleZoom(1)}
        className="w-[2.5rem] h-[2rem] bg-[#00000080] rounded-[0.25rem] flex items-center justify-center cursor-pointer"
      >
        <img src={ZoomInIcon} alt="zoom-in" />
      </button>
      <button
        onClick={() => handleZoom(-1)}
        className="w-[2.5rem] h-[2rem] bg-[#00000080] rounded-[0.25rem] flex items-center justify-center cursor-pointer"
      >
        <img src={ZoomOutIcon} alt="zoom-out" />
      </button>
      <p className="w-[6.25rem] text-[#FFF] h-[2rem] bg-[#00000080] rounded-[0.25rem] flex items-center justify-start px-[0.5rem] font-montserrat text-[0.875rem] font-normal font-weight-400 leading-[1.25rem] tracking-[0.01563rem]">
        {Math.min(Math.max(0, zoomLevel * 10))}%
      </p>
    </div>
  );
};
