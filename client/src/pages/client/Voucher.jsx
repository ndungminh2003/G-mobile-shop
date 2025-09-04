import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon } from "../../features/coupon/couponSlice";
import { createOrder } from "../../features/order/orderSlice";
import "../../assets/style/res.scss";
import { toast } from "react-toastify";

function Voucher() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [isApply, setIsApply] = useState(false);
  const { appliedCoupon, isLoading, isSuccess, isError } = useSelector(
    (state) => state.coupon
  );
  const order = JSON.parse(localStorage.getItem("order"));
  const formatNumberWithDots = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleApplyCoupon = () => {
    dispatch(applyCoupon({ coupon }));
    setIsApply(true);
  };

  useEffect(() => {
    if (isApply && !isLoading && isSuccess) {
      toast.success("Áp dụng mã giảm giá thành công");
      order.totalAfterDiscount =
        order.total - (appliedCoupon.discount / 100) * order.total;
      localStorage.setItem("order", JSON.stringify(order));
      setIsApply(false);
    }
    if (isApply && !isLoading && isError) {
      toast.error("Mã giảm giá không hợp lệ");
      order.totalAfterDiscount = order.total;
      localStorage.setItem("order", JSON.stringify(order));
      setIsApply(false);
    }
  }, [isLoading]);
  const handlePaymentClick = () => {
    dispatch(createOrder({ order, paymentMethod: "COD" }));
    navigate("/cart/payment");
  };
  return (
    <div className="">
      <div className="flex items-center justify-center max-w-[700px] m-auto my-5">
        <div
          className="res-none py-[10px] flex w-full text-center cursor-pointer"
          onClick={() => navigate("/cart/payment-info")}
        >
          <div className="!text-base text-gray-600 justify-start flex items-center font-semibold">
            <ArrowBackIosIcon />
            <h1 className="hover:underline">Trở về</h1>
          </div>
          <h1 className="text-lg text-gray-600 font-semibold justify-center m-auto pr-[70px]">
            Phiếu giảm giá
          </h1>
        </div>
      </div>

      <div className=" h-[100vh] ">

      <div className=" h-[100vh]">
      <div className="bg-[#fef2f2] max-w-[600px] m-auto rounded-[15px]">
        <div className="max-w-[600px] m-auto p-4 flex items-center ">
          <div className="w-[20%] flex flex-col items-center text-xs text-[#0e2431]">
            <div className="w-[35px] h-[35px] border border-[#d70018] rounded-full relative">
              <svg
                data-v-76247bda=""
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="text-sm w-5 h-5 text-[#d70018] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] absolute"
              >
                <path
                  data-v-76247bda=""
                  fill="currentColor"
                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                  className=""
                ></path>
              </svg>
            </div>
            <p className="text-[#d70018] text-center  h-[75px]  ">
              Chọn sản phẩm
            </p>
          </div>
          <div className="w-[20%] flex flex-col items-center text-xs text-[#0e2431] process-item relative active">
            <div className="w-[35px] h-[35px] border border-[#d70018] rounded-full relative">
              <svg
                data-v-76247bda=""
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="address-card"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="text-sm w-5 h-5 text-[#d70018] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] absolute"
              >
                <path
                  data-v-76247bda=""
                  fill="currentColor"
                  d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
                  className=""
                ></path>
              </svg>
            </div>
            <p className="text-[#d70018] text-center h-[75px]">
              Thông tin đặt hàng
            </p>
          </div>
          <div className="w-[20%] flex flex-col items-center text-xs text-[#0e2431] process-item relative active">
            <div className="w-[35px] h-[35px] border border-[#d70018] rounded-full relative">
              <svg
                data-v-76247bda=""
                id="icon-voucher"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="text-sm w-5 h-5 fill-[#d70018] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] absolute"
              >
                <path
                  data-v-76247bda=""
                  d="M395.13,306.087c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696s16.696-7.49,16.696-16.696
      C411.826,313.577,404.336,306.087,395.13,306.087z"
                ></path>{" "}
                <path
                  data-v-76247bda=""
                  d="M261.565,172.522c-9.206,0-16.696,7.49-16.696,16.696s7.49,16.696,16.696,16.696c9.206,0,16.696-7.49,16.696-16.696
      S270.771,172.522,261.565,172.522z"
                ></path>{" "}
                <path
                  data-v-76247bda=""
                  d="M495.304,72.348H144.696v50.087c0,9.217-7.479,16.696-16.696,16.696s-16.696-7.479-16.696-16.696V72.348H16.696
      C7.479,72.348,0,79.826,0,89.044v333.913c0,9.217,7.479,16.696,16.696,16.696h94.609v-50.087c0-9.217,7.479-16.696,16.696-16.696
      s16.696,7.479,16.696,16.696v50.087h350.609c9.217,0,16.696-7.479,16.696-16.696V89.044C512,79.826,504.521,72.348,495.304,72.348
      z M144.696,322.783c0,9.217-7.479,16.696-16.696,16.696s-16.696-7.479-16.696-16.696v-33.391c0-9.217,7.479-16.696,16.696-16.696
      s16.696,7.479,16.696,16.696V322.783z M144.696,222.609c0,9.217-7.479,16.696-16.696,16.696s-16.696-7.479-16.696-16.696v-33.391
      c0-9.217,7.479-16.696,16.696-16.696s16.696,7.479,16.696,16.696V222.609z M211.478,189.217c0-27.619,22.468-50.087,50.087-50.087
      c27.619,0,50.087,22.468,50.087,50.087c0,27.619-22.468,50.087-50.087,50.087C233.946,239.304,211.478,216.836,211.478,189.217z
       M257.512,343.544c-4.271,0-8.544-1.631-11.804-4.892c-6.521-6.521-6.521-17.087,0-23.609L387.37,173.37
      c6.521-6.522,17.086-6.522,23.608,0c6.521,6.521,6.521,17.087,0,23.609L269.315,338.652
      C266.054,341.914,261.782,343.544,257.512,343.544z M395.13,372.87c-27.619,0-50.087-22.468-50.087-50.087
      c0-27.619,22.468-50.087,50.087-50.087s50.087,22.468,50.087,50.087C445.217,350.402,422.75,372.87,395.13,372.87z"
                ></path>
              </svg>
            </div>
            <p className="text-[#d70018] text-center h-[75px]">
              Phiếu giảm giá
            </p>
          </div>
          <div className="w-[20%] flex flex-col items-center text-xs text-[#0e2431] process-item relative">
            <div className="w-[35px] h-[35px] border border-[#777] rounded-full relative">
              <svg
                data-v-76247bda=""
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="credit-card"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="text-sm w-5 h-5 text-[#777] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] absolute"
              >
                <path
                  data-v-76247bda=""
                  fill="currentColor"
                  d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"
                  className=""
                ></path>
              </svg>
            </div>
            <p className=" text-center h-[75px]">Thanh toán</p>
          </div>

          <div className="w-[20%] flex flex-col items-center text-xs text-[#0e2431] process-item relative">
            <div className="w-[35px] h-[35px] border border-[#777] rounded-full relative">
              <svg
                data-v-76247bda=""
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="box-open"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="text-sm w-5 h-5 text-[#777] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] absolute"
              >
                <path
                  data-v-76247bda=""
                  fill="currentColor"
                  d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"
                  className=""
                ></path>
              </svg>
            </div>
            <p className="text-center h-[75px]">Hoàn tất đặt hàng</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl shadow-cellphone mx-2 p-[10px] mb-4 gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="w-[30px] h-[30px] absolute top-[5px] left-[10px]">
                <svg
                  data-v-784887ae=""
                  id="icon-voucher"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  className="fill-[#d70018]"
                >
                  <path
                    data-v-784887ae=""
                    d="M395.13,306.087c-9.206,0-16.696,7.49-16.696,16.696c0,9.206,7.49,16.696,16.696,16.696s16.696-7.49,16.696-16.696
      C411.826,313.577,404.336,306.087,395.13,306.087z"
                  ></path>{" "}
                  <path
                    data-v-784887ae=""
                    d="M261.565,172.522c-9.206,0-16.696,7.49-16.696,16.696s7.49,16.696,16.696,16.696c9.206,0,16.696-7.49,16.696-16.696
      S270.771,172.522,261.565,172.522z"
                  ></path>{" "}
                  <path
                    data-v-784887ae=""
                    d="M495.304,72.348H144.696v50.087c0,9.217-7.479,16.696-16.696,16.696s-16.696-7.479-16.696-16.696V72.348H16.696
      C7.479,72.348,0,79.826,0,89.044v333.913c0,9.217,7.479,16.696,16.696,16.696h94.609v-50.087c0-9.217,7.479-16.696,16.696-16.696
      s16.696,7.479,16.696,16.696v50.087h350.609c9.217,0,16.696-7.479,16.696-16.696V89.044C512,79.826,504.521,72.348,495.304,72.348
      z M144.696,322.783c0,9.217-7.479,16.696-16.696,16.696s-16.696-7.479-16.696-16.696v-33.391c0-9.217,7.479-16.696,16.696-16.696
      s16.696,7.479,16.696,16.696V322.783z M144.696,222.609c0,9.217-7.479,16.696-16.696,16.696s-16.696-7.479-16.696-16.696v-33.391
      c0-9.217,7.479-16.696,16.696-16.696s16.696,7.479,16.696,16.696V222.609z M211.478,189.217c0-27.619,22.468-50.087,50.087-50.087
      c27.619,0,50.087,22.468,50.087,50.087c0,27.619-22.468,50.087-50.087,50.087C233.946,239.304,211.478,216.836,211.478,189.217z
       M257.512,343.544c-4.271,0-8.544-1.631-11.804-4.892c-6.521-6.521-6.521-17.087,0-23.609L387.37,173.37
      c6.521-6.522,17.086-6.522,23.608,0c6.521,6.521,6.521,17.087,0,23.609L269.315,338.652
      C266.054,341.914,261.782,343.544,257.512,343.544z M395.13,372.87c-27.619,0-50.087-22.468-50.087-50.087
      c0-27.619,22.468-50.087,50.087-50.087s50.07,22.468,50.087,50.087C445.217,350.402,422.75,372.87,395.13,372.87z"
                  ></path>
                </svg>
              </div>
            </div>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Đừng quên sử dụng mã giảm giá mà bạn có nhé"
              className="border border-none focus:border-[2px] bg-[#f3f4f6] focus:border-[#333] h-full flex-1 py-[10px] rounded-[10px] pl-[50px] w-full placeholder-[#d70018]"
            />
          </div>

          <button
            onClick={handleApplyCoupon}
            className="py-[6px] px-3 bg-[#d70018] rounded text-white"
          >
            Áp dụng
          </button>
        </div>

        <div className="p-[10px] bg-white shadow-cellphone rounded-[15px]">
          <div className="p-[10px] shadow-cellphone rounded-[15px]">
            <h1 className="text-xl font-semibold text-center uppercase">
              Thông tin đặt hàng
            </h1>
            <p className="font-bold text-lg my-[15px]">
              <span className="font-normal">Người đặt: </span>
              {order.name}
            </p>
            <p className="font-bold text-lg my-[15px]">
              <span className="font-normal">Số Điện Thoại: </span>
              {order.mobile}
            </p>
            <p className="font-bold text-lg my-[15px]">
              <span className="font-normal">Email: </span>
              {order.email}
            </p>
            <p className="font-bold text-lg my-[15px]">
              <span className="font-normal">Nhận Sản Phẩm Tại: </span>
              {order.address}
            </p>
            <p className="font-bold text-lg my-[15px]">
              <span className="font-normal">Tổng Tiền: </span>
              {formatNumberWithDots(order.total)} ₫
            </p>
          </div>
        </div>
      </div>
      </div>


      <div className="w-full max-w-[670px] m-auto bg-white shadow-cellphone rounded-md p-[10px] mt-5 sticky bottom-0">
        <div className="flex items-center justify-between mb-2 text-base">
          <h1 className="text-[#0e2431] font-semibold">Tổng tiền tạm tính:</h1>
          <span className="text-[#d70018] font-bold">
            {formatNumberWithDots(order.totalAfterDiscount)} ₫
          </span>
        </div>
        
        <div className="flex flex-col gap-2 font-bold">
          <button
            className="px-3 py-[6px] uppercase h-[60px] bg-slate-500 rounded text-white"
            onClick={handlePaymentClick}
          >
            Tiếp tục
          </button>
          <Link
            className="px-3 py-[6px] uppercase h-[60px] leading-[48px] text-center border border-slate-500 rounded text-black hover:bg-slate-500 hover:text-white"
            to="/"
          >
            Chọn thêm sản phẩm khác
          </Link>
        </div>
      </div>

      </div>

    </div>
  );
}

export default Voucher;
