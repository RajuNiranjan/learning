import { CoordsCardProps } from "../types";

export const CoordsCard = ({ coords }: CoordsCardProps) => {
  return (
    <div className="w-64 h-14 p-2 flex justify-center items-center rounded-md backdrop-blur-xs text-black/50 border border-white/50 absolute top-28 left-2">
      <div className="flex flex-col items-start">
        <p className="text-sm">lon: {coords.lon}</p>
        <p className="text-sm">lat: {coords.lat}</p>
      </div>
    </div>
  );
};
