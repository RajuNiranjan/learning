import { MapThumbNailCard } from "./components/MapThumbNailCard";
import { MapDashBoardHeader } from "./components/MapDashBoardHeader";

const MapDashBoardScreen = () => {
  return (
    <div className="p-4 bg-[#000] min-h-screen w-screen">
      <MapDashBoardHeader />
      <div className="grid grid-cols-4 gap-4">
        <MapThumbNailCard />
      </div>
    </div>
  );
};

export default MapDashBoardScreen;
