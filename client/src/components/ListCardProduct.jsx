import React, { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { useSelector } from "react-redux";

export default function ListCardProduct(props) {
  const [products, setProducts] = useState(props.productState);
  const [brand, setBrand] = useState("");
  let { categoryBrands } = useSelector((state) => state.pCategory);
  categoryBrands = categoryBrands || [
    { _id: "Phone", brands: [] },
    { _id: "Tablet", brands: [] },
    { _id: "Laptop", brands: [] },
    { _id: "Headphone", brands: [] },
    { _id: "Watch", brands: [] },
    { _id: "ScreenPC", brands: [] },
    { _id: "TV", brands: [] },
  ];
  categoryBrands = categoryBrands.filter(
    (categoryBrand) =>
      categoryBrand._id.toLowerCase() === props.type.toLowerCase()
  );
  let wishlist = useSelector((state) => state.auth.user?.wishlist);
  wishlist = wishlist || [];
  const productIdsInWishlist = wishlist.map((product) => product._id);
  useEffect(() => {
    let productList = [];
    if (brand === "" || brand === "ALL") {
      productList = props.productState;
    } else {
      productList = props.productState.filter(
        (product) => product.brand.toLowerCase() === brand.toLowerCase()
      );
    }
    setProducts(productList);
  }, [props.productState, brand]);

  return (
    <div className=" container mx-auto flex flex-col">
      <div className=" flex gap-4 justify-between px-4 py-2 xxsm:flex-col xsm:flex-col sm:flex-col md:flex-col ">
        <h1 className=" font-bold text-3xl text-gray-500">{props.type}</h1>
        <div className=" flex gap-5 xxsm:hidden xsm:gap-4 sm:gap-4 md:gap-4 ">
          {categoryBrands[0]?.brands.map((brand, index) => (
            <span
              key={index}
              className=" cursor-pointer bg-slate-200 p-4 rounded-xl hover:bg-slate-400 duration-300"
              onClick={() => setBrand(brand)}
            >
              {brand}
            </span>
          ))}
          <span
            className=" cursor-pointer bg-slate-200 p-4 rounded-xl hover:bg-slate-400 duration-300 xsm:hidden sm:hidden"
            onClick={() => setBrand("ALL")}
          >
            All
          </span>
        </div>
      </div>

      <div className=" flex flex-col gap-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },

            1280: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1536: {
              slidesPerView: 5,
              spaceBetween: 0,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <CardProduct
                key={product._id}
                id={product._id}
                name={product.title}
                price={product.price}
                brand={product.brand}
                color={product.color}
                thumbnail={product.thumbnail}
                slug={product.slug}
                feature={product.feature}
                totalrating={product.totalrating}
                isFavorite={productIdsInWishlist.includes(product._id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
