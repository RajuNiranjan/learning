import React from "react";
import "./Home.scss";
import Slider from "../../components/SLIDER/Slider";
import Products from "../../components/PRODUCTS/Products";
import NewContainer from "../../components/NEW_CONTAINER/NewContainer";

const Home = () => {
  return (
    <div className="Home">
      <Slider />
      <Products />
      <NewContainer />
    </div>
  );
};

export default Home;
