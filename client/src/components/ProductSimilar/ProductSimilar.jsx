import React from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatNumberWithDots } from "../../utils/formatNumber";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Rating } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductSimilar = () => {
  let { relatedProduct } = useSelector((state) => state.product);
  relatedProduct = relatedProduct || [];
  return (
    <>
      <div className="mt-6">
        <h1 className="text-[#4a4a4a] font-semibold text-base">
          SẢN PHẨM TƯƠNG TỰ
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
          className="!min-h-[0] mt-[10px] md:mt-5 md:!mx-0 !mx-4 rounded-xl !p-[10px]"
        >
          {relatedProduct.map((product) => (
            <SwiperSlide
              key={product._id}
              className="!w-[228px] rounded-[15px] shadow-cellphone p-[10px]"
            >
              <div className="percent-discount">
                <p className="mt-[5px]">Giảm 12%</p>
              </div>
              <Link to={`/product-view/${product.slug}`}>
                <img
                  className="rounded-xl w-[160px] !object-cover"
                  src={product.thumbnail}
                  alt="slider"
                  preview={false}
                  width={"100%"}
                ></img>
                <h3 className="h-[65px] text-[#444] font-semibold text-sm">
                  {product.title}
                </h3>
                <div className="flex items-center gap-[10px] mb-[10px]">
                  <p className="text-[#d70018] text-base font-bold">
                    {formatNumberWithDots(product.price)}₫
                  </p>
                  <p className="text-[#707070] font-semibold text-sm line-through">
                    {formatNumberWithDots(product.price)}₫
                  </p>
                </div>
                <Rating
                  value={product.totalrating}
                  readOnly
                  className="!text-base"
                />
              </Link>
              <div className="text-xs flex items-center gap-1 justify-end ">
                <span>Yêu thích</span>
                <FavoriteBorderIcon className="text-[#d70018] hover:animate-ping cursor-pointer" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductSimilar;
