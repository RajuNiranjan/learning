import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import HomeScreen from "./views/Home/page/index";
import SearchScreen from "./views/Search/page/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomeScreen />,
      },
      {
        path: "search",
        element: <SearchScreen />,
      },
    ],
  },
]);
