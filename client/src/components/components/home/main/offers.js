import styles from "./styles.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { offersArray } from "@/data/home";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersArray.map((offer) => (
          <SwiperSlide>
            <Link href="/">
              <img src={offer.image} alt="" />
            </Link>
            <span>{offer.price}đ</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
