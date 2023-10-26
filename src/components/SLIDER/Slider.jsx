import React from "react";
import "./Slider.scss";
import { HomeSliderData } from "../../data/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const Slider = () => {
  return (
    <Swiper
      className="slider"
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
    // navigation={true}
    >
      {HomeSliderData?.map((e) => {
        return (
          <SwiperSlide className="slider-imgs" key={e.img}>
            <img className="slider-img" src={e.img} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
