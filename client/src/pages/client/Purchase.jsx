import React, { useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Button from "@mui/material/Button";
import SecurityIcon from "@mui/icons-material/Security";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOrdersByUserId,
  resetOrderState,
} from "../../features/order/orderSlice";
import { formatNumberWithDots } from "../../utils/formatNumber";

export default function Purchase() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { orders } = useSelector((state) => state.order);
  orders = orders || [
    {
      products: [{ product: { title: "" }, count: 0, price: 0 }],
      orderStatus: "",
      paymentIntent: { amount: 0 },
      total: 0,
      totalAfterDiscount: 0,
    },
  ];
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredOrders(orders);
      return;
    }
    setFilteredOrders(orders.filter((order) => order.orderStatus === status));
  };
  useEffect(() => {
    dispatch(resetOrderState());
    dispatch(getOrdersByUserId());
  }, []);
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);
  return (
    <div>
      <div className=" flex flex-col gap-5 min-w-[36rem]">
        <div className=" flex text-2xl bg-slate-500 h-20 justify-between rounded-lg">
          <span
            className=" flex justify-center items-center p-4 w-1/6 text-white cursor-pointer hover:bg-slate-600 hover:duration-500 hover:rounded-lg xxsm:text-lg xsm:text-lg sm:text-lg md:text-xl"
            onClick={() => handleFilter("All")}
          >
            Tất cả
          </span>
          <span
            className=" flex justify-center items-center p-4 w-1/6 text-white cursor-pointer hover:bg-slate-600 hover:duration-500 hover:rounded-lg xxsm:text-lg xsm:text-lg sm:text-lg md:text-xl"
            onClick={() => handleFilter("Not Processed")}
          >
            Chưa xử lý
          </span>
          <span
            className=" flex justify-center items-center p-4 w-1/6 text-white cursor-pointer hover:bg-slate-600 hover:duration-500 hover:rounded-lg xxsm:text-lg xsm:text-lg sm:text-lg md:text-xl"
            onClick={() => handleFilter("Processing")}
          >
            Đang xử lý
          </span>
          <span
            className=" flex justify-center items-center p-4 w-1/5 text-white cursor-pointer hover:bg-slate-600 hover:duration-500 hover:rounded-lg xxsm:text-lg xsm:text-lg sm:text-lg md:text-xl"
            onClick={() => handleFilter("Delivering")}
          >
            Đang vận chuyển
          </span>
          <span
            className=" flex justify-center items-center p-4 w-1/6 text-white cursor-pointer hover:bg-slate-600 hover:duration-500 hover:rounded-lg xxsm:text-lg xsm:text-lg sm:text-lg md:text-xl"
            onClick={() => handleFilter("Completed")}
          >
            Hoàn thành
          </span>
          <span
            className=" flex justify-center items-center p-4 w-1/6 text-white cursor-pointer hover:bg-slate-600 hover:duration-500 hover:rounded-lg xxsm:text-lg xsm:text-lg sm:text-lg md:text-xl"
            onClick={() => handleFilter("Cancelled")}
          >
            Hủy
          </span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className=" flex flex-col h-[55rem] bg-slate-200 rounded-lg justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png"
                alt=""
                className="w-40 h-40"
              />
              <div className="text-lg">Không có đơn hàng nào</div>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col h-[55rem] bg-slate-200 rounded-lg items-center overflow-y-auto">
            {filteredOrders.map((order) => (
              <div className=" flex flex-col p-4 bg-white w-[97%] m-4 rounded-lg gap-4 only:">
                <div className=" flex items-center justify-between border-b border-gray-400 p-4">
                  {order.orderStatus === "Completed" ? (
                    <span className=" text-green-500 text-lg">
                      {" "}
                      <LocalShippingIcon /> The order was shipped successfully{" "}
                    </span>
                  ) : (
                    ""
                  )}
                  {order.orderStatus === "Not Processed" ? (
                    <span className=" text-lg font-bold text-red-500">
                      {order.orderStatus}
                    </span>
                  ) : null}
                  {order.orderStatus === "Processing" ? (
                    <span className=" text-lg font-bold text-blue-500">
                      {order.orderStatus}
                    </span>
                  ) : null}
                  {order.orderStatus === "Delivering" ? (
                    <span className=" text-lg font-bold text-blue-500">
                      {order.orderStatus}
                    </span>
                  ) : null}
                  {order.orderStatus === "Completed" ? (
                    <span className=" text-lg font-bold text-green-500">
                      {order.orderStatus}
                    </span>
                  ) : null}
                  {order.orderStatus === "Cancelled" ? (
                    <span className=" text-lg font-bold text-red-500">
                      {order.orderStatus}
                    </span>
                  ) : null}
                </div>
                {order.products.map((product) => (
                  <div className=" flex gap-4 justify-between border-b border-gray-400 p-4">
                    <div className=" flex gap-4 ">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className=" w-24 h-24 "
                      />
                      <div className=" flex flex-col h-24">
                        <span className=" text-xl font-bold">
                          {product.product.title}
                        </span>
                        <span className="font-bold">
                          {formatNumberWithDots(product.price)}₫
                        </span>
                        <span>x{product.count}</span>
                      </div>
                    </div>
                    <div className=" flex items-center font-bold text-lg ">
                      {formatNumberWithDots(product.price * product.count)}₫
                    </div>
                  </div>
                ))}
                <div className=" flex text-xl font-bold flex-row-reverse">
                  <span className=" flex items-center">
                    <SecurityIcon className=" mr-2" /> Thành tiền:{" "}
                    <span className=" text-red-700 text-2xl ml-2">
                      {formatNumberWithDots(order.totalAfterDiscount)}₫
                    </span>
                  </span>
                </div>

                <div className=" flex text-xl font-bold mt-4 gap-2 flex-row-reverse">
                  <div className=" flex gap-4">
                    <Button size="large" variant="contained" color="success">
                      Mua lại
                    </Button>
                    <Button
                      onClick={() => navigate(order._id)}
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      Chi tiết đơn hàng
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
