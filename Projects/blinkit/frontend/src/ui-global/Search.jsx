import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import { IoSearch, IoArrowBack } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMobile } from "../hooks/userMobile";

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();

  const [isSeachScreen, setIsSearchScreen] = useState(false);

  const isSeach = location.pathname === "/search";

  useEffect(() => {
    setIsSearchScreen(isSeach);
  }, [location, isSeach]);

  const redirectToSearchScreen = () => {
    navigate("/search");
  };

  console.log(isSeachScreen);

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg overflow-hidden border flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 ">
      <div>
        {!(isMobile && isSeach) ? (
          <button className="flex justify-center items-center h-full p-2 group-focus-within:text-primary-200 ">
            <IoSearch size={20} />
          </button>
        ) : (
          <Link
            to="/"
            className="flex justify-center items-center h-full group-focus-within:text-primary-200 bg-white p-2 m-1 rounded-full shadow-md "
          >
            <IoArrowBack size={20} />
          </Link>
        )}
      </div>

      <div className="w-full h-full ">
        {isSeachScreen ? (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search here"
              autoFocus
              className="w-full h-full bg-transparent focus:outline-none "
            />
          </div>
        ) : (
          <div
            onClick={redirectToSearchScreen}
            className="h-full w-full  flex  items-center"
          >
            <TypeAnimation
              sequence={[
                "search 'Milk'",
                1000,
                "search 'bread'",
                1000,
                "search 'sugar'",
                1000,
                "search 'panner'",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        )}
      </div>
    </div>
  );
};
