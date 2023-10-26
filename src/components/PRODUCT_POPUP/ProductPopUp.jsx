import React from "react";
import "./ProductPopUp.scss";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NavLink } from 'react-router-dom'

const ProductPopUp = (props) => {
  return (
    <>
      {
        props.moreInfo?.map((e) => {
          return <div className="product-pop-up" key={e.id}>
            <div className="product-pop-up-left">
              <div className="product-pop-up-left-top">
                <h3 className="product-pop-up-left-top-brand">
                  {e.brand}
                </h3>
                <small className="product-pop-up-left-top-ratings">
                  <div className="product-pop-up-left-top-starts">
                    <span className="product-pop-up-left-top-start">{e.stars}</span>
                    <StarIcon className="product-pop-up-left-top-start-icon" />
                  </div>
                  <span className="product-pop-up-left-top-rat-review">
                    {e.rating} Ratings & {e.review} Reviews
                  </span>
                </small>
              </div>
              <div className="product-pop-up-left-bottom">
                <small className="product-pop-up-left-bottom-rom-info">
                  &bull;{e.info_1}
                </small>
                <small className="product-pop-up-left-bottom-size-info">
                  &bull; {e.info_2}
                </small>
                <small className="product-pop-up-left-bottom-camere-info">
                  &bull; {e.info_3}
                </small>
                <small className="product-pop-up-left-bottom-processor-info">
                  &bull;{e.info_4}
                </small>
                <small className="product-pop-up-left-bottom-warenty-info">
                  &bull; 1 Year Warranty for Phone and 6 Months Waranty for
                  Box-Accessories
                </small>
              </div>
            </div>
            <div className="product-pop-up-right">
              <div className="product-pop-up-right-top">
                <h3 className="product-pop-up-right-off-cost">₹ {e.off_cost}</h3>
                <div className="offer-container">
                  <p className="product-pop-up-right-org-cost">₹ {e.org_cost}</p>
                  <span className="product-pop-up-right-off">{e.off_persentage} % off</span>
                </div>
                <small className="product-pop-up-right-freeDelivery">
                  Free Delivery
                </small>
                <small className="product-pop-up-right-hot-deal">Hot Deal</small>
              </div>
              <div className="product-pop-up-right-bottom">
                <NavLink
                  to={'/'} className="product-pop-up-right-bottom-goto">
                  <span>View</span>
                  <KeyboardArrowRightIcon className="product-pop-up-right-bottom-goto-icon" />
                </NavLink>
              </div>
            </div>
          </div>
        })
      }
    </>
  );
};

export default ProductPopUp;
