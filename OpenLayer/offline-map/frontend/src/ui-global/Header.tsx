import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <div className="h-10 shadow flex justify-center gap-4 items-center px-4">
      <Link
        to="/"
        className={`${
          location.pathname === "/"
            ? "bg-blue-500 text-white rounded-md px-2"
            : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/map-dashboard"
        className={`${
          location.pathname === "/map-dashboard"
            ? "bg-blue-500 text-white rounded-md px-2"
            : ""
        }`}
      >
        Offline Map Dash Board
      </Link>
    </div>
  );
};
