import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./ui-global/Header";
export const App = () => {
  const location = useLocation();
  const shouldShowHeader = !location.pathname.startsWith("/offline-map");

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Outlet />
    </div>
  );
};
