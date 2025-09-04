import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import Countdown from "@/components/countdown";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";
import { flashDealsArray } from "@/data/home";
import FlashCard from "./Card";

export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <Countdown date={new Date(2023, 10, 10)} />
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={40}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
        breakpoints={{
          450: {
            slidePerView: 2,
          },
          630: {
            slidePerView: 3,
          },
          920: {
            slidePerView: 4,
          },
          1232: {
            slidePerView: 5,
          },
          1520: {
            slidePerView: 6,
          },
        }}
      >
        <div className={styles.flashDeals__list}>
          {flashDealsArray.map((product, i) => (
            <SwiperSlide>
              <FlashCard product={product} key={i} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
