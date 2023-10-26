import React from "react";
import "./NewPopUp.scss";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NavLink } from 'react-router-dom'

const NewPopup = (props) => {
  return (
    <>
      {
        props.moreInfo?.map((e) => {
          return <div className="new-pop-up" key={e.id}>
            <div className="new-pop-up-left">
              <div className="new-pop-up-left-top">
                <h3 className="new-pop-up-left-top-brand">
                  {e.itemName}
                </h3>
                <small className="new-pop-up-left-top-ratings">
                  <div className="new-pop-up-left-top-starts">
                    <span className="new-pop-up-left-top-start">{e.starts}</span>
                    <StarIcon className="new-pop-up-left-top-start-icon" />
                  </div>
                  <span className="new-pop-up-left-top-rat-review">
                    {e.rating} Ratings & {e.reviews} Reviews
                  </span>
                </small>
              </div>
              <div className="new-pop-up-left-bottom">
                <small className="new-pop-up-left-bottom-rom-info">
                  &bull; {e.info_1}
                </small>
                <small className="new-pop-up-left-bottom-size-info">
                  &bull; {e.info_2}
                </small>
                <small className="new-pop-up-left-bottom-camere-info">
                  &bull;{e.info_3}
                </small>
                <small className="new-pop-up-left-bottom-processor-info">
                  &bull; {e.info_4}
                </small>
                <small className="new-pop-up-left-bottom-processor-info">
                  &bull; {e.info_5}
                </small>
                <small className="new-pop-up-left-bottom-warenty-info">
                  &bull; 1 Year Warranty for Phone and 6 Months Waranty for
                  Box-Accessories
                </small>
              </div>
            </div>
            <div className="new-pop-up-right">
              <div className="new-pop-up-right-top">
                <h3 className="new-pop-up-right-off-cost">₹ {e.off_cost}</h3>
                <div className="offer-container">
                  <p className="new-pop-up-right-org-cost">₹ {e.org_cost}</p>
                  <span className="new-pop-up-right-off">{e.dis} % off</span>
                </div>
                <small className="new-pop-up-right-freeDelivery">Free Delivery</small>
                <small className="new-pop-up-right-hot-deal">Hot Deal</small>
              </div>
              <div className="new-pop-up-right-bottom">
                <NavLink to={'/'} className="new-pop-up-right-bottom-goto">
                  <span>View</span>
                  <KeyboardArrowRightIcon className="new-pop-up-right-bottom-goto-icon" />
                </NavLink>
              </div>
            </div>
          </div>
        })
      }
    </>
  );
};

export default NewPopup;
