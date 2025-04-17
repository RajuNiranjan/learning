import { MapThumbNailCard } from "./components/MapThumbNailCard";

const MapDashBoardScreen = () => {
  return (
    <div className="p-4 bg-blue-50 h-screen w-screen">
      <div className="grid grid-cols-3 gap-4">
        <MapThumbNailCard />
      </div>
    </div>
  );
};

export default MapDashBoardScreen;
