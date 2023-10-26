import React from "react";
import "./Footer.scss";
import { FooterBottomData } from "../../data/Data";
import { FooterTopData } from "../../data/Data";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        {FooterTopData?.map((e) => {
          return (
            <div className="fotter-top-items" key={e.name}>
              <p className="footer-top-name">{e.name}</p>
              {e.items?.map((e) => {
                return <p className="footer-top-sub-name">{e.itemName}</p>;
              })}
            </div>
          );
        })}
      </div>
      <div className="footer-bottom">
        {FooterBottomData?.map((e) => {
          return (
            <div className="footer-bottom-left" key={e.icon}>
              <p className="footer-bottom-left-icon">{e.icon}</p>
              <p className="footer-bottom-left-icon-name">{e.itemName}</p>
            </div>
          );
        })}
        <div className="footer-bottom-right">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
