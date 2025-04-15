import { Outlet } from "react-router-dom";
import { NavBar } from "./Components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
