import React, { useState } from "react";
import "./Nav.scss";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavDropMenu from "../NAV_DORP_MENU/NavDropMenu";
import Emartlogo from "../../asserts/e.png";
import { NavLink } from 'react-router-dom'

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);



  return (
    <nav className="Nav">
      <NavLink to={'/'} className="nav_left">
        <img className="nav_left_logo" src={Emartlogo} alt="" />
        <p className="nav_left_logo_text">Mart</p>
      </NavLink>
      <div className="nav_center">
        <div className="nav_center_search">
          <input
            type="text"
            placeholder="search for products, brands and more"
          />
        </div>
        <div className="nav_center_search_icon">
          <SearchIcon className="nav_center_searchIcon" />
        </div>
      </div>
      <div className="nav_right">
        <NavLink className="nav_right_icons" >
          <StorefrontIcon className="nav_right_icon" /> <span>become a seller</span>
        </NavLink>
        <div className="account" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} >
          <div className="user_account">
            <p className="nav_right_icons">
              <PersonOutlineIcon className="nav_right_icon" /> account{" "}
              <KeyboardArrowDownIcon className="nav_right_icon rotate" />
            </p>
          </div>
          {showMenu && (
            <div className="user_account_dropdown">
              <NavDropMenu />
            </div>
          )}
        </div>
        <NavLink className="nav_right_icons">
          <ShoppingCartOutlinedIcon className="nav_right_icon" /> cart
        </NavLink>
        <MoreVertIcon className="nav_right_icon" />
      </div>
    </nav>
  );
};

export default Nav;


