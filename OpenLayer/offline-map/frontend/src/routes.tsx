import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import DefaultMapScreen from "./screens/Defaultmap/DefaultMap.screen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DefaultMapScreen />,
      },
    ],
  },
]);
