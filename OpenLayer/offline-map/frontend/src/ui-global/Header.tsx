import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <div className="h-10 shadow flex justify-center gap-4 items-center px-4 bg-[#aad3df] ">
      <Link
        to="/"
        className={`${
          location.pathname === "/"
            ? "bg-[#00c3ff] text-white rounded-md px-2"
            : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/map-dashboard"
        className={`${
          location.pathname === "/map-dashboard"
            ? "bg-[#00c3ff] text-white rounded-md px-2"
            : ""
        }`}
      >
        Offline Map Dash Board
      </Link>
    </div>
  );
};
