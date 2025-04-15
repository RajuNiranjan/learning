import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DefaultMapPage from "./pages/DefaultMap.page";
import OfflineMapPage from "./pages/OfflineMap.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DefaultMapPage />,
      },
      {
        path: "/offline",
        element: <OfflineMapPage />,
      },
    ],
  },
]);
