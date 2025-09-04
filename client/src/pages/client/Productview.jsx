import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as GiftBoxIcon } from "../../assets/giftbox.svg";
import "../../assets/style/Productview.scss";
import ProductInfor from "../../components/ProductInfor/ProductInfor";
import ProductSimilar from "../../components/ProductSimilar/ProductSimilar";
import ContentProduct from "../../components/ContentProduct/ContentProduct";
import { Autoplay, Navigation, Pagination } from "swiper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BackToTop from "../../components/BackToTop";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductBySlug,
  resetProductState,
  getRelatedProduct,
} from "../../features/product/productSlice";
import generateHtmlApi from "../../utils/generateHtml";
import CheckIcon from "@mui/icons-material/Check";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
export default function ProductView() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const lastSlashIndex = pathname.lastIndexOf("/");
  const [slug, setSlug] = useState(pathname.slice(lastSlashIndex + 1));
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return "Invalid amount";
    }
    return numericAmount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    dispatch(resetProductState());
    dispatch(getProductBySlug(slug));
    dispatch(getRelatedProduct(slug));
  }, [slug]);

  let { productBySlug, relatedProduct } = useSelector((state) => state.product);
  relatedProduct = relatedProduct || [];

  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const listImage = productBySlug?.images?.map((obj) => obj.url) || [];

  const pagination = {
    clickable: true,
    renderBullet: function(index, className) {
      if (index !== 0) {
        return (
          '<img class="w-[50px] h-[50px] cursor-pointer rounded-md z-10 ' +
          className +
          '" src="' +
          listImage[index - 1] +
          '">' +
          "</img>"
        );
      } else {
        return (
          '<div class="text-[10px] ' +
          className +
          '">' +
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 21 20" style="width: 20px; height:20px; margin: auto"><title>star</title> <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><image width="21" height="20" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABHNCSVQICAgIfAhkiAAAAZlJREFUOE+lVYtRQjEQ3FSgVoBUIB2gFWgHYgdLBUIFbgdCB3YgdgAVaAfSQZx9kzB5fwYzk5mXkGz27naPgDMGyQ2ARwBLSf4eHGHsAMkFgHcABwATAFNJx6F754D+ADDIE4BvAGtJq4tBC5YvDpvkB4D5GNtBpiR3AG4l3ZoZyXsAnym36mPbCUpyFkK4izG6KBXLDJAemoQQFjHGQ1d+A0mzeAZgFtcAZgUDXyrXZuu1I7gqznl9DCHsYoxbg7oQBtsD8LdndUiS91qDZH7chDz9kPec77VBfdFSeegDGZNdyneW3tKgOZx4KXChkq2kRVWo/wA3AY13qv4lwF2ANdAG450kO6h3JNXYYVXI5cGWTpMOIckSOwe0puMW08TWPt9I4ljVSbq4rV5QY5r099tlQ4cryRo+jb6omqDZ29asDWBlOF+vSeTec0+tTJH67FzStDenJB3yG4CbZFt/2zFfANyh/LuN4l6wBlA9KKlGrsnUfdKszMis3ZhZsLYVDexp7+dzp8iGJOVirfr+OlLuM/i+qZQ/ZTTSBXFK4lAAAAAASUVORK5CYII="></image></g></g></svg>' +
          "Tính năng nổi bật" +
          "</div>"
        );
      }
    },
  };

  const handleAddToCart = () => {
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart
      ? JSON.parse(existingCart)
      : { products: [], total: 0, totalQuantity: 0, totalDiscount: 0 };

    const foundIndex = cart.products.findIndex(
      (x) => x._id === productBySlug._id
    );
    if (foundIndex > -1) {
      cart.products[foundIndex].count += 1;
    } else {
      const productToAdd = {
        _id: productBySlug._id,
        color:
          selectedColor !== null
            ? productBySlug.color[selectedColor]
            : productBySlug.color.length > 0
            ? productBySlug.color[0]
            : "",
        name: productBySlug.title,
        slug: productBySlug.slug,
        thumbnail: productBySlug.thumbnail,
        feature:
          selectedFeature !== null
            ? productBySlug.feature[selectedFeature].name
            : productBySlug?.feature !== undefined &&
              productBySlug.feature.length > 0
            ? productBySlug.feature[productBySlug.feature.length - 1].name
            : "",
        price:
          selectedFeature !== null
            ? productBySlug.feature[selectedFeature].price
            : productBySlug.price,
        count: 1,
      };

      cart.products.push(productToAdd);
    }
    cart.totalQuantity += 1;
    cart.total += productBySlug.price;
    toast.success("Thêm vào giỏ hàng thành công");
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleCardClick = (slug) => {
    navigate(`/product-view/${slug}`);
    setSlug(slug);
  };

  return (
    <>
      {productBySlug ? (
        <div className="max-w-[1200px] m-auto">
          {showMessage && (
            <div className="fixed inset-0 h-[60px] z-10 flex top-[73px] items-center justify-center">
              <div className="flex px-4 py-2 text-center text-white bg-green-500 rounded-lg shadow-lg w-max">
                <svg
                  className="w-8 h-8 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-lg font-semibold text-[16px]">Thành công!</p>
              </div>
            </div>
          )}

          <section className="option">
            <div className="option-title flex gap-1 mt-[30px]">
              <h1 className="text-lg text-[#0a263c] font-bold">
                {productBySlug.title}
              </h1>
              <Rating
                name="read-only"
                value={productBySlug.totalrating}
                readOnly
              />
              <p>{productBySlug.ratings.length} đánh giá</p>
            </div>
            <hr className="my-[15px] border-none" />
            <div className="flex option-top">
              <div className="option-img w-[60%]">
                <div>
                  <Swiper
                    pagination={pagination}
                    modules={[Pagination, Navigation, Autoplay]}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: true,
                    }}
                    navigation
                    className=""
                  >
                    <FavoriteBorderIcon className="absolute top-2 left-2 !cursor-pointer z-20 text-[#d70018] hover:animate-ping"></FavoriteBorderIcon>

                    {listImage.map((img, index) => {
                      if (index !== 0) {
                        return (
                          <SwiperSlide key={index}>
                            <LightGallery
                              licenseKey="your_license_key"
                              speed={500}
                              plugins={[lgThumbnail, lgZoom, lgFullscreen]}
                              className="flex"
                            >
                              <a href={listImage[index]}>
                                <img
                                  src={listImage[index]}
                                  alt=""
                                  className="w-[398px] h-[398px] m-auto object-cover"
                                />
                              </a>
                            </LightGallery>
                          </SwiperSlide>
                        );
                      } else {
                        return (
                          <SwiperSlide>
                            <div className="option-bg bg-gradient h-full w-full min-w-[718px] min-h-[398px] rounded-[10px]">
                              <div className="flex items-center w-full h-full gap-2 p-4 option-outstanding">
                                <img
                                  src={productBySlug.thumbnail}
                                  alt=""
                                  className="w-[270px] h-[270px] rounded-[10px] object-cover"
                                />
                                <div className="text-white w-[350px]">
                                  <p className="text-lg mb-[5px] uppercase font-semibold text-center">
                                    Tính năng nổi bật
                                  </p>
                                  <div>
                                    <ul
                                      dangerouslySetInnerHTML={{
                                        __html: generateHtmlApi(
                                          productBySlug.description,
                                          "li"
                                        ),
                                      }}
                                      className="text-sm flex flex-col gap-[5px] list-disc pl-3"
                                    ></ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    })}
                  </Swiper>
                </div>
                <ProductInfor title={productBySlug.title} />
                {/* <BoughtTogether /> */}
              </div>
              <div className="option-price w-[40%] pl-[20px]">
                <div className="mb-[10px]">
                  <div className="flex gap-[10px] w-full flex-wrap">
                    {productBySlug?.feature ? (
                      productBySlug?.feature.map((obj, index) => (
                        <Link
                          key={index}
                          className={`border w-[calc(100%/3-10px)] px-1 py-[5px] text-xs flex flex-col text-center gap-1 rounded-lg ${
                            selectedFeature === index ? "border-[#d70018]" : ""
                          }`}
                          onClick={() => setSelectedFeature(index)}
                          style={{ position: "relative" }}
                        >
                          {selectedFeature === index && (
                            <CheckIcon
                              className="bg-[#d70018] absolute top-0 left-0 "
                              style={{
                                width: "20px",
                                height: "20px",
                                padding: "1px 5px 5px 1px ",

                                borderRadius: "15px 0px 100px 0px",
                                MozBorderRadius: "15px 0px 100px 0px",
                                WebkitBorderRadius: "15px 0px 100px 0px",
                                border: "0px solid #8e97f2",
                              }}
                            />
                          )}

                          <strong>{obj.name}</strong>
                          <span>{formatCurrency(obj.price)}</span>
                        </Link>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <p className="text-[#444] mb-[10px] text-sm font-bold">
                      Chọn màu để xem giá và chi nhánh có hàng
                    </p>
                  </div>
                  <div>
                    <ul className="flex flex-wrap gap-[10px] w-full">
                      {productBySlug?.color ? (
                        productBySlug?.color.map((obj, index) => (
                          <li className="w-[calc(100%/3-10px)]">
                            <Link
                              className={`border h-[60px] justify-center items-center px-1 py-[5px] text-xs flex text-center gap-1 rounded-lg  ${
                                selectedColor === index
                                  ? "border-[#d70018]"
                                  : "border-[#d1d5db]"
                              }`}
                              onClick={() => setSelectedColor(index)}
                              style={{ position: "relative" }}
                            >
                              {selectedColor === index && (
                                <CheckIcon
                                  className="bg-[#d70018] absolute top-0 left-0 "
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    padding: "1px 5px 5px 1px ",
                                    borderRadius: "15px 0px 100px 0px",
                                    MozBorderRadius: "15px 0px 100px 0px",
                                    WebkitBorderRadius: "15px 0px 100px 0px",
                                    border: "0px solid #8e97f2",
                                  }}
                                />
                              )}

                              <img
                                src={
                                  listImage[
                                    listImage.length -
                                      productBySlug.color.length +
                                      index
                                  ]
                                }
                                alt="img_product"
                                className="w-[30px] h-[30px]"
                              />
                              <div className="flex flex-col">
                                <strong>{obj}</strong>
                                <span>
                                  {formatCurrency(productBySlug.price)}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-[10px] mt-[10px] overflow-hidden border border-[#A6C0EA]">
                    <div className="flex items-center gap-[10px] p-2 bg-[#A6C0EA]">
                      <div className="w-5 fill-[#1E293B] ">
                        <GiftBoxIcon />
                      </div>
                      <h1 className="text-base text-[#1E293B] font-semibold">
                        Khuyến mãi
                      </h1>
                    </div>
                    <div className="flex flex-col gap-4 px-2 py-4 text-sm">
                      <div className="flex gap-1">
                        <p className="p-1 bg-[#1E293B] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center">
                          1
                        </p>
                        <Link>
                          Nhận ngay ưu đãi YouTube Premium dành cho chủ sở hữu
                          {" " + productBySlug.title}
                        </Link>
                      </div>
                      <div className="flex gap-1">
                        <p className="p-1 bg-[#1E293B] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center">
                          2
                        </p>
                        <Link>Trả góp 12 tháng 0 lãi, 0đ</Link>
                      </div>
                      <div className="flex gap-1">
                        <p className="p-1 bg-[#1E293B] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center">
                          3
                        </p>
                        <Link>
                          Tặng Sim 4G Mobifone siêu data - Miễn phí 12 tháng
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-[10px] mt-[10px]">
                    <button
                      className="w-[calc(100%-80px)] flex flex-col items-center justify-center just text-white bg-[#1E293B] py-2 rounded-[10px]"
                      onClick={handleBuyNow}
                    >
                      <strong className="text-base">MUA NGAY</strong>
                      <span className="text-sm">
                        (Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)
                      </span>
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="rounded-[10px] border-[2px] border-[#1E293B] px-1"
                    >
                      <div>
                        <AddShoppingCartIcon sx={{ fontSize: "25px" }} />
                      </div>
                      <span className="text-[7.5px] text-[#1E293B] font-semibold">
                        Thêm vào giỏ
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            {/* <ProductSimilar /> */}
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
                navigation={true}
                slidesPerGroupAuto
                slidesPerView={"auto"}
                className="!min-h-[0] mt-[10px] md:mt-5 md:!mx-0 !mx-4 rounded-xl !p-[10px]"
              >
                {relatedProduct.map((product, index) => (
                  <SwiperSlide
                    key={product._id}
                    className="!w-[228px] rounded-[15px] shadow-cellphone p-[10px]"
                  >
                    <div className="percent-discount">
                      <p className="mt-[5px]">Giảm 12%</p>
                    </div>
                    <div onClick={() => handleCardClick(product.slug)}>
                      {/* <a href={`/product-view/${product.slug}`}> */}
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
                          {formatCurrency(product.price)}
                        </p>
                        <p className="text-[#707070] font-semibold text-sm line-through">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <Rating
                        value={product.totalrating}
                        readOnly
                        className="!text-base"
                      />
                      {/* </a> */}
                    </div>
                    <div className="text-xs flex items-center gap-1 justify-end ">
                      <span>Yêu thích</span>
                      <FavoriteBorderIcon className="text-[#d70018] hover:animate-ping cursor-pointer" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
          <ContentProduct
            description={productBySlug.description}
            specifications={productBySlug.specifications}
          />
          <BackToTop />
        </div>
      ) : (
        <div> Không tìm thấy sản phẩm ! </div>
      )}
    </>
  );
}
