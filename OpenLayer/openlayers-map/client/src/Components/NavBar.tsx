import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="h-12 w-full flex items-center justify-center bg-gray-800 shadow-md">
      <ul className="flex items-center justify-center gap-6">
        <li>
          <Link
            to="/"
            className={`px-4 py-2 rounded ${
              location.pathname === "/"
                ? "bg-yellow-500 text-black"
                : "text-white"
            }`}
          >
            Default Map
          </Link>
        </li>
        <li>
          <Link
            to="/offline"
            className={`px-4 py-2 rounded ${
              location.pathname === "/offline"
                ? "bg-yellow-500 text-black"
                : "text-white"
            }`}
          >
            Offline Map
          </Link>
        </li>
      </ul>
    </nav>
  );
};
