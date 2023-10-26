import React, { useState } from "react";
import "./Products.scss";
import ProductPopUp from "../PRODUCT_POPUP/ProductPopUp";
import { NavLink } from 'react-router-dom'
import { PRODUCTS } from "../../data/Data";


// const moreURL = "http://localhost:3000/PRODUCTS"



const Product = () => {


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


  // const [productData, setProductData] = useState([]);

  // const FetchProductData = async (apiURL) => {
  //   try {
  //     const response = await fetch(apiURL);
  //     const data = await response.json();
  //     setProductData(data)
  //     // console.log(data);
  //   } catch (error) {

  //   }
  // }

  // useEffect(() => {
  //   FetchProductData(moreURL)
  // }, [])



  return (
    <>
      {
        PRODUCTS?.map((e) => {
          return <div className="product-bottom-containers"
            onMouseEnter={() => { { updatePopupShowState(e.id) } }} onMouseLeave={() => { { updatePopupShowState(e.id) } }}
          >
            <div className="products-bottom-container">
              <div className="products-bottom-left">
                <h5 className="products-bottom-left-name">{e.name}</h5>
              </div>

              <NavLink to={'/'} className="products-bottom-right">
                <img
                  src={e.img}
                  alt=""
                  className="products-bottom-right-img"
                />
              </NavLink>

            </div>
            {show[e.id] && (
              <div className="products-bottom-popUp-container">
                <ProductPopUp moreInfo={e.moreInfo} />
              </div>
            )}
          </div>
        })
      }
    </>
  )
}

export default Product
