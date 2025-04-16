import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DefaultMapScreen from "./pages/DefaultMap.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <DefaultMapScreen />,
      },
    ],
  },
]);
