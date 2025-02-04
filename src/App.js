// src/App.js

import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import SearchWeather from "./components/SearchWeather";
import History from "./components/History";
import LocalWeather from "./components/LocalWeather";

function App() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="app-container">
      
      <Swiper
        slidesPerView={1}
        initialSlide={1}
        pagination={{ clickable: true }} modules={[Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        allowSlideNext={activeIndex < 2}
        allowSlidePrev={activeIndex > 0}
      >
        <SwiperSlide>
          <LocalWeather />
        </SwiperSlide>
        <SwiperSlide>
          <SearchWeather />
        </SwiperSlide>
        <SwiperSlide>
          <History />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;