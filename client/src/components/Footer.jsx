import React from "react";
import { Link } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation } from "react-router-dom";

export default function Footer() {
  let location = useLocation();

  if (
    location.pathname === "/cart" ||
    location.pathname === "/wishlist" ||
    location.pathname === "/contact" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/cart/payment-info" ||
    location.pathname === "/cart/payment" ||
    location.pathname === "/cart/payment/:id" ||
    location.pathname === "/cart/payment/success" ||
    location.pathname === "/cart/voucher" ||
    location.pathname === "/cart/bank-transfer-info" ||
    location.pathname === "/cart/payment/failed" ||
    location.pathname === "/user" ||
    location.pathname === "/user/edit" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/forgot-password-otp" ||
    location.pathname === "/change-password" ||
    location.pathname === "/otp" ||
    location.pathname === "/user/order"
  ) {
    return null;
  }

  return (
    <div className=" bg-slate-800 w-full text-white z-50 xxsm:sticky xxsm:bottom-0 xsm:sticky xsm:bottom-0 sm:sticky sm:bottom-0 md:sticky md:bottom-0 lg:sticky lg:bottom-0 ">
      <footer className=" container mx-auto grid grid-cols-3 gap-4 py-3 justify-items-center p-6 xxsm:hidden xsm:hidden sm:hidden md:hidden lg:hidden ">
        <div className=" flex flex-col gap-3">
          <h1>Thông tin và chính sách</h1>
          <p className=" cursor-pointer ml-2">Chính sách bảo mật</p>
          <p className=" cursor-pointer ml-2">Chính sách đổi trả</p>
          <p className=" cursor-pointer ml-2">Chính sách giao hàng</p>
          <p className=" cursor-pointer ml-2">Tra thông tin bảo hành</p>
        </div>

        <div className="flex flex-col gap-3">
          <h1>Trung tâm hỗ trợ</h1>
          <p className=" ml-2">Hotline: 19006868</p>
          <p className=" ml-2"></p>
        </div>

        <div className=" flex flex-col gap-3 ">
          <h1>Kết nối với chúng tôi</h1>
          <p className=" ml-2">TechStore</p>
          <p className=" ml-2">227 Quận 5 HCM Việt Nam</p>

          <div className="flex gap-4 items-center ml-2">
            <img
              src="/social_images/facebook.png"
              alt="Facebook"
              className=" w-8 h-8 cursor-pointer "
            />
            <img
              src="/social_images/instagram.png"
              alt="Instagram"
              className=" w-8 h-8 cursor-pointer "
            />
            <img
              src="/social_images/youtube.png"
              alt="Youtube"
              className=" w-8 h-8 cursor-pointer "
            />
          </div>
        </div>
      </footer>

      <footer className=" py-3 text-center mb-0 xxsm:hidden xsm:hidden sm:hidden md:hidden lg:hidden">
        {" "}
        &copy; {new Date().getFullYear()}; Powered by TechStore
      </footer>

      <div className=" container mx-auto flex h-17 justify-around items-center xl:hidden 2xl:hidden">
        <Link to="/">
          <div className=" flex flex-col gap-2 items-center p-4 cursor-pointer capitalize xxsm:text-sm xsm:text-sm sm:text-sm md:text-lg hover:bg-gray-500 hover:rounded-lg hover:py-2 text-white">
            <HomeIcon />
            <span>Trang chủ</span>
          </div>
        </Link>

        <Link to="/wishlist">
          <div className=" flex flex-col gap-2 items-center p-4 cursor-pointer capitalize xxsm:text-sm xsm:text-sm sm:text-sm md:text-lg hover:bg-gray-500 hover:rounded-lg hover:py-2 text-white ">
            <FavoriteIcon />
            <span>Yêu thích</span>
          </div>
        </Link>

        <Link to="/contact">
          <div className=" flex flex-col gap-2 items-center p-4 cursor-pointer capitalize xxsm:text-sm xsm:text-sm sm:text-sm md:text-lg hover:bg-gray-500 hover:rounded-lg hover:py-2 text-white ">
            <CallIcon />
            <span>Liên hệ</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
