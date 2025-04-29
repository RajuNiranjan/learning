import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Suspense, lazy } from "react";
import { Loader } from "./ui-global/Loader";

// Lazy load screens
const DefaultMapScreen = lazy(
  () => import("./screens/Defaultmap/DefaultMap.screen")
);
const MapDashBoardScreen = lazy(
  () => import("./screens/MapDashBoard/MapDashBoard.screen")
);
const OfflineMapScreen = lazy(
  () => import("./screens/OfflineMap/OffilineMap.screen")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <DefaultMapScreen />
          </Suspense>
        ),
      },
      {
        path: "/map-dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <MapDashBoardScreen />
          </Suspense>
        ),
      },
      {
        path: "/offline-map/:tileName/:tileId",
        element: (
          <Suspense fallback={<Loader />}>
            <OfflineMapScreen />
          </Suspense>
        ),
      },
    ],
  },
]);
