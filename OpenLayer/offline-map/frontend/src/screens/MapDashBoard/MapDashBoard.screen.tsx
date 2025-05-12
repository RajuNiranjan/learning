import { MapThumbNailCard } from "./components/MapThumbNailCard";
import { MapDashBoardHeader } from "./components/MapDashBoardHeader";

const MapDashBoardScreen = () => {
  return (
    <div className="p-4 bg-[#000] min-h-screen w-screen">
      <MapDashBoardHeader />
      <div className="flex flex-wrap gap-4 ">
        <MapThumbNailCard />
      </div>
    </div>
  );
};

export default MapDashBoardScreen;
