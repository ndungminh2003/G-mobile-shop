import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../assets/style/res.scss";
import { resetProductState } from "../../features/product/productSlice";

export default function CardProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(resetProductState());
    const cartData = localStorage.getItem("cart");
    const cart = cartData
      ? JSON.parse(cartData)
      : { products: [], total: 0, totalQuantity: 0, totalDiscount: 0 };

    setCartItems(cart.products);
    setTotalPrice(cart.total);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTotalPrice(
        cartItems.reduce((total, item) => total + item.count * item.price, 0)
      );
      const cartUpdate = {
        products: cartItems,
        total: cartItems.reduce(
          (total, item) => total + item.count * item.price,
          0
        ),
        totalQuantity: cartItems.reduce((total, item) => total + item.count, 0),
        totalDiscount: 0,
      };
      localStorage.setItem("cart", JSON.stringify(cartUpdate));
      window.dispatchEvent(new Event("storage"));
    }
  }, [cartItems]);

  const handleDeleteItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);

    setCartItems(updatedCart);
  };

  const formatNumberWithDots = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className=" ">
      <div className="flex items-center justify-center max-w-[700px] m-auto my-5 ">
        <div
          className="res-none py-[10px] flex w-full text-center"
          onClick={() => navigate("/")}
        >
          <div className="!text-base text-gray-600 justify-start flex items-center font-semibold">
            <ArrowBackIosIcon />
            <h1 className="hover:underline cursor-pointer">Trở về</h1>
          </div>

          <h1 className="text-lg text-gray-600 font-semibold justify-center m-auto pr-[70px]">
            Giỏ hàng
          </h1>
        </div>
      </div>

      {cartItems.length !== 0 ? (
        <div className=" h-[100vh]">
          <div className="res-content max-w-[600px] h-[100%] overflow-auto m-auto flex flex-col gap-10 hidden-scrollbar">
            {cartItems.map((item) => {
              const handleQuantityChange = (newQuantity) => {
                if (newQuantity <= 0) {
                  handleDeleteItem(item._id); // Gọi hàm xóa sản phẩm khi số lượng bằng 0
                  return;
                }

                const updatedCart = cartItems.map((cartItem) => {
                  if (cartItem._id === item._id) {
                    return { ...cartItem, count: newQuantity };
                  }
                  return cartItem;
                });

                setCartItems(updatedCart);
              };
              return (
                <div key={item._id} className="flex">
                  <div>
                    <img
                      src={item.thumbnail} // Đặt URL hình ảnh sản phẩm ở đây
                      alt=""
                      className="w-[170px] px-[10px]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Link
                        className="text-[#0e2431] text-[15px] font-bold"
                        to={`/product/${item.slug}`} // Điều hướng đến trang chi tiết sản phẩm
                      >
                        {item.name}
                      </Link>
                      <DeleteIcon
                        className="cursor-pointer"
                        onClick={() => handleDeleteItem(item._id)}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[15px]">
                      <div className="flex items-center gap-1">
                        <p className="text-[#d70018] font-bold">
                          {formatNumberWithDots(item.price)} ₫
                        </p>
                        <p className="text-[#777] text-sm line-through">
                          {/* {item.originalPrice} ₫ */}
                          {formatNumberWithDots(item.price)} ₫
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className="py-1 px-2 text-lg cursor-pointer"
                          onClick={() =>
                            handleQuantityChange(Math.max(item.count - 1, 0))
                          }
                        >
                          -
                        </span>
                        <input
                          type="number"
                          name=""
                          value={item.count}
                          readOnly
                          className="w-[30px] text-center text-lg"
                        />
                        <span
                          className="py-1 px-2 text-lg cursor-pointer"
                          onClick={() => handleQuantityChange(item.count + 1)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="res-total-price sticky bottom-0 mb-5">
            <div className="w-full max-w-[670px] m-auto bg-white shadow-cellphone rounded-md p-[10px] mt-20">
              <div className="flex items-center justify-between text-base mb-2">
                <h1 className="text-[#0e2431] font-semibold">
                  Tổng tiền tạm tính:
                </h1>
                <span className="text-[#d70018] font-bold">
                  {formatNumberWithDots(totalPrice)} ₫
                </span>
              </div>
              <div className="flex flex-col font-bold gap-2">
                <button
                  className="px-3 py-[6px] uppercase h-[60px] bg-slate-500 rounded text-white"
                  onClick={() => navigate("/cart/payment-info")}
                >
                  Tiến hành đặt hàng
                </button>
                <Link
                  to="/"
                  className="px-3 py-[6px] uppercase h-[60px] leading-[48px] text-center border border-slate-500 rounded text-black hover:bg-slate-500 hover:text-white"
                >
                  Chọn thêm sản phẩm khác
                </Link>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : (
        // <div className="res-content max-w-[600px] h-[600px] overflow-auto max-h-[600px] m-auto flex flex-col gap-10 hidden-scrollbar">
        <div className="max-w-[570px] m-auto my-[100px] text-center">
          <div className="w-[50px] h-[50px] text-center m-auto text-[#0e2431]">
            <svg
              data-v-5a4f0845=""
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="frown"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              className="svg-inline--fa fa-frown"
            >
              <path
                data-v-5a4f0845=""
                fill="currentColor"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm170.2 218.2C315.8 367.4 282.9 352 248 352s-67.8 15.4-90.2 42.2c-13.5 16.3-38.1-4.2-24.6-20.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c13.6 16.2-11 36.7-24.5 20.4z"
                className=""
              ></path>
            </svg>
          </div>
          <p className="text-[#444] text-[21px] my-[50px]">
            Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại
          </p>
          <button
            className="p-[10px] bg-[#1E293B] text-white rounded"
            onClick={() => navigate("/")}
          >
            Quay lại trang chủ
          </button>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
