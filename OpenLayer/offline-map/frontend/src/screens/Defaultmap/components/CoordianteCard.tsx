type CoordianteCardProps = {
  coordinates: { lat: number; lon: number };
};

export const CoordianteCard = ({ coordinates }: CoordianteCardProps) => {
  return (
    <div className="w-64 h-14 p-2 rounded border border-white/50 shadow/10 backdrop-blur-xs absolute bottom-14 left-5">
      <div className="flex gap-2">
        <div className="text-sm text-black/50">Latitude</div>
        <div className="text-sm text-black">{coordinates.lat}</div>
      </div>
      <div className="flex gap-2">
        <div className="text-sm text-black/50">Longitude</div>
        <div className="text-sm text-black">{coordinates.lon}</div>
      </div>
    </div>
  );
};
