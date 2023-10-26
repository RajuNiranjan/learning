import React, { useState } from 'react'
import NewPopup from '../NEW_POP_UP/NewPopUp'
import { NavLink } from 'react-router-dom'

const New = (props) => {

  const [show, setShow] = useState({})


  const updatePopupShowState = (id) => {
    setShow((prevShow) => {
      const newShow = { ...prevShow };

      if (newShow.hasOwnProperty(id)) {
        newShow[id] = !newShow[id];
      } else {
        newShow[id] = true;
      }

      return newShow;
    });
  };



  return (
    <>
      {
        props.items?.map((e) => {
          return <div key={e.id} className="new" onMouseEnter={() => { { updatePopupShowState(e.id) } }} onMouseLeave={() => { { updatePopupShowState(e.id) } }} >
            <div className="new-item-center-top">
              <NavLink to={'/'} className="new-item-center-top-left">
                <img
                  src={e.img}
                  alt=""
                  className="new-item-center-left-img"
                />
              </NavLink>
              <div className="new-item-center-top-right">
                <h5 className="new-item-center-top-right-name">
                  {e.brand}
                </h5>
                <small className="new-item-center-top-right-name2">
                  {e.specifications}
                </small>
              </div>
            </div>
            {show[e.id]
              &&
              (<div className="new-item-center-bottom">
                <NewPopup moreInfo={e.moreInfo} />
              </div>

              )}

          </div >
        })
      }
    </>
  )
}

export default New
