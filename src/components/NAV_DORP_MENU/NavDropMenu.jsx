import React from "react";
import "./NavDropMenu.scss";
import { HomeDropDownMenuData } from "../../data/Data";

const NavDropMenu = () => {
  return (
    <div className="home-nav-drop-down-menu">
      {HomeDropDownMenuData?.map((e) => {
        return (
          <div className="home-nav-drop-menu-list" key={e.icon}>
            <p className="home-nav-drop-menu-icon">{e.icon}</p>
            <p className="home-nav-drop-menu-icon-name">{e.iconName}</p>
          </div>
        );
      })}{" "}
    </div>
  );
};

export default NavDropMenu;
