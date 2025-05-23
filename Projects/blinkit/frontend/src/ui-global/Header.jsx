import React from "react";
import { LogoIcon } from "../assets";
import { Search } from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { useMobile } from "../hooks/userMobile";

export const Header = () => {
  const [isMoblie] = useMobile();
  const location = useLocation();

  const isSeachPage = location.pathname === "/search";

  return (
    <header className="h-auto lg:h-20 lg:shadow-md sticky top-0 flex items-center flex-col justify-center gap-2 ">
      {!(isSeachPage && isMoblie) && (
        <div className="container mx-auto flex items-center  justify-between h-full px-2 ">
          {/* logo */}
          <div>
            <Link to="/">
              <img
                src={LogoIcon}
                alt="logo"
                width={170}
                height={60}
                className="hidden lg:block"
              />
              <img
                src={LogoIcon}
                alt="logo"
                width={170}
                height={60}
                className=" lg:hidden"
              />
            </Link>
          </div>
          {/* searche section  */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* login and my cart */}
          <div>
            <button className="text-neutral-600 lg:hidden">
              <FaUser size={22} />
            </button>
            <div className="hidden lg:block">
              <Link to="/login">Login</Link>
              <button>
                <div>
                  <FaCartPlus />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};
