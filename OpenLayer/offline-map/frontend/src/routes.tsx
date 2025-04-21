import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import DefaultMapScreen from "./screens/Defaultmap/DefaultMap.screen";
import MapDashBoardScreen from "./screens/MapDashBoard/MapDashBoard.screen";
import OfflineMapScreen from "./screens/OfflineMap/OffilineMap.screen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DefaultMapScreen />,
      },
      {
        path: "/map-dashboard",
        element: <MapDashBoardScreen />,
      },
      {
        path: "/offline-map/:tileName/:tileId",
        element: <OfflineMapScreen />,
      },
    ],
  },
]);
