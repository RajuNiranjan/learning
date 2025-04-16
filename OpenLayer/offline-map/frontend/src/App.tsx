import { Outlet } from "react-router-dom";
import { Header } from "./ui-global/Header";
export const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
