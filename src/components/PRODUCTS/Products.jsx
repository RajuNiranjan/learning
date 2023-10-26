import "./Products.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Product from "./Product";
import { MoreData } from "../../data/Data";
import { NavLink } from 'react-router-dom'



const Products = () => {




  return (
    <div className="product">
      <div className="products">
        <div className="products-top">
          <div className="products-top-left">
            <h5 className="products-top-left-name">PRODUCTS</h5>
          </div>
          <NavLink className="products-top-right">
            <small className="products-top-right">View more</small>
            <KeyboardArrowRightIcon className="products-top-right-icon" />
          </NavLink>
        </div>
        <div className="products-bottom">
          <Product />
        </div>

      </div>
      {
        MoreData?.map((e) => {
          return <div className="menu" key={e.id}>
            <h3 className="menu-name" style={{ fontSize: 12 }}>{e.name}</h3>
            <ul>
              {
                e.more?.map((e) => {
                  return <li style={{ color: e.color }}>{e.name}</li>
                })
              }
            </ul>
          </div>
        })
      }
    </div >
  );
};

export default Products;


