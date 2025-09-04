import React from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const BoughtTogether = () => {
  return (
    <>
      <div className="mt-6">
        <h1 className="text-[#4a4a4a] font-semibold text-base">
          Phụ kiện mua cùng
        </h1>
        <Swiper
          spaceBetween={10}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          slidesPerGroupAuto
          slidesPerView={"auto"}
          className="!min-h-[0] mt-[85px] md:mt-5 md:!mx-0 !mx-4 rounded-xl !p-[10px]"
        >
          <SwiperSlide className="!w-[194px] rounded-[15px] shadow-cellphone p-[10px]">
            <img
              className="rounded-xl w-[160px] !object-cover"
              src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_1_3_9.png"
              alt="slider"
              preview={false}
              width={"100%"}
            ></img>
            <h3 className="h-[65px] text-[#444] font-semibold text-sm">
              Tai nghe không dây Samsung Galaxy Buds2
            </h3>
            <div className="flex items-center gap-[10px] mb-[10px]">
              <p className="text-[#d70018] text-base font-bold">1.450.000₫</p>
              <p className="text-[#707070] font-semibold text-sm line-through">
                2.990.000₫
              </p>
            </div>
            <Rating value={5} readOnly className="!text-base" />
            <div className="text-xs flex items-center gap-1 justify-end ">
              <span>Yêu thích</span>
              <FavoriteBorderIcon className="text-[#d70018] hover:animate-ping cursor-pointer" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!w-[194px] rounded-[15px] shadow-cellphone p-[10px]">
            <img
              className="rounded-xl w-[160px] !object-cover"
              src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_182_2.png"
              alt="slider"
              preview={false}
              width={"100%"}
            ></img>
            <h3 className="h-[65px] text-[#444] font-semibold text-sm">
              Tai nghe không dây Samsung Galaxy Buds2
            </h3>
            <div className="flex items-center gap-[10px] mb-[10px]">
              <p className="text-[#d70018] text-base font-bold">1.450.000₫</p>
              <p className="text-[#707070] font-semibold text-sm line-through">
                2.990.000₫
              </p>
            </div>
            <Rating value={5} readOnly className="!text-base" />
            <div className="text-xs flex items-center gap-1 justify-end ">
              <span>Yêu thích</span>
              <FavoriteBorderIcon className="text-[#d70018] hover:animate-ping cursor-pointer" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!w-[194px] rounded-[15px] shadow-cellphone p-[10px]">
            <img
              className="rounded-xl w-[160px] !object-cover"
              src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_2007_2_.png"
              alt="slider"
              preview={false}
              width={"100%"}
            ></img>
            <h3 className="h-[65px] text-[#444] font-semibold text-sm">
              Pin sạc dự phòng Energizer 20.000mAh UE20012PQ
            </h3>
            <div className="flex items-center gap-[10px] mb-[10px]">
              <p className="text-[#d70018] text-base font-bold">690.000₫</p>
              <p className="text-[#707070] font-semibold text-sm line-through">
                1.000.000₫
              </p>
            </div>
            <Rating value={5} readOnly className="!text-base" />
            <div className="text-xs flex items-center gap-1 justify-end ">
              <span>Yêu thích</span>
              <FavoriteBorderIcon className="text-[#d70018] hover:animate-ping cursor-pointer" />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!w-[194px] rounded-[15px] shadow-cellphone p-[10px]">
            <img
              className="rounded-xl w-[160px] !object-cover"
              src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_201_4.png"
              alt="slider"
              preview={false}
              width={"100%"}
            ></img>
            <h3 className="h-[65px] text-[#444] font-semibold text-sm">
              Tai nghe không dây Samsung Galaxy Buds2 Pro
            </h3>
            <div className="flex items-center gap-[10px] mb-[10px]">
              <p className="text-[#d70018] text-base font-bold">3.790.000₫</p>
              <p className="text-[#707070] font-semibold text-sm line-through">
                4.990.000₫
              </p>
            </div>
            <Rating value={5} readOnly className="!text-base" />
            <div className="text-xs flex items-center gap-1 justify-end ">
              <span>Yêu thích</span>
              <FavoriteBorderIcon className="text-[#d70018] hover:animate-ping cursor-pointer" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default BoughtTogether;
