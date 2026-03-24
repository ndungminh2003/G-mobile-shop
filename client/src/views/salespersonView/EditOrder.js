import React, { useEffect, useState } from "react";
import { Checkbox, DatePicker, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  getOrderById,
  updateOrder,
} from "../../features/order/orderSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { formatNumberWithDots } from "../../utils/formatNumber";
import { toast } from "react-toastify";
import dayjs from "dayjs";
const defaultOrderState = {
  _id: "",
  products: [],
  paymentIntent: {
    method: "",
    status: "",
    amount: 0,
    currency: "",
    created: "",
  },
  orderStatus: "",
  email: "",
  name: "",
  phone: "",
  address: "",
  total: 0,
  totalAfterDiscount: 0,
  totalQuantity: 0,
  createdAt: "",
};

const EditOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onChange = (date, dateString) => {
    formik.setFieldValue("createdAt", dateString);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrderById(params.id));
  }, []);
  const { orderById, isSuccess, isError, isLoading } = useSelector(
    (state) => state.order
  );
  const order = orderById ? orderById : defaultOrderState;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: order,
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateOrder(values));
      setIsSubmitted(true);
      // dispatch(resetState());
    },
  });

  useEffect(() => {
    if (isSubmitted && !isLoading && isSuccess) {
      toast.success("Update order successfully");
      navigate(-1);
    } else if (isSubmitted && !isLoading && isError) {
      toast.error("Update order failed");
      setIsSubmitted(false);
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <div className="max-w-[1320px] m-auto">
      <div className="py-5">
        <h1 className="text-[#071437] text-lg font-semibold">Edit Order</h1>
        <ul className="flex items-center gap-1 text-[#B5B5C3]">
          <li>
            <a href="">Dashboard</a>
          </li>
          <span className="w-[5px] h-[2px] bg-[#B5B5C3] mt-[2px]"></span>
          <li>Orders</li>
        </ul>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex gap-10">
        <div className="w-[300px] border border-[#F1F1F2] rounded-xl">
          <div className="px-[26px] bg-white rounded-md">
            <h1 className="text-xl min-h-[70px] text-[#071437] font-semibold leading-[70px]">
              Order Details
            </h1>
          </div>
          <div className="px-[26px] pb-[30px] flex flex-col gap-10 bg-white rounded-md">
            <div>
              <label
                htmlFor=""
                className="text-sm text-[#252F4A] font-semibold"
              >
                Order ID
              </label>
              <div className="text-lg font-semibold">#{order._id}</div>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="method"
                className="label-required text-[#252F4A] font-semibold mb-[7px]"
              >
                Payment Method
              </label>
              <Select
                name="method"
                defaultValue={formik.values.paymentIntent.method}
                value={formik.values.paymentIntent.method}
                style={{ width: "100%" }}
                onChange={formik.handleChange("paymentIntent.method")}
                options={[
                  { value: "COD", label: "Cash on Delivery" },
                  { value: "VNPAY", label: "VnPay" },
                ]}
              />
              <p className="text-[#99A1B7] text-xs">
                Set the date of the order to process.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="paymentStatus"
                className="label-required text-[#252F4A] font-semibold mb-[7px]"
              >
                Payment Status
              </label>
              <Select
                name="paymentStatus"
                defaultValue={formik.values.paymentIntent.status}
                value={formik.values.paymentIntent.status}
                style={{ width: "100%" }}
                onChange={formik.handleChange("paymentIntent.status")}
                options={[
                  { value: "Cash on Delivery", label: "Cash on Delivery" },
                  { value: "processing", label: "Processing" },
                  { value: "success", label: "Success" },
                  { value: "failed", label: "Failed" },
                ]}
              />
              <p className="text-[#99A1B7] text-xs">
                Set the date of the order to process.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="orderStatus"
                className="label-required text-[#252F4A] font-semibold mb-[7px]"
              >
                Order Status
              </label>
              <Select
                name="orderStatus"
                defaultValue={formik.values.orderStatus}
                value={formik.values.orderStatus}
                style={{ width: "100%" }}
                onChange={formik.handleChange("orderStatus")}
                options={[
                  { value: "Not Processed", label: "Not Processed" },
                  { value: "Processing", label: "Processing" },
                  { value: "Delivering", label: "Delivering" },
                  { value: "Completed", label: "Completed" },
                  { value: "Cancelled", label: "Cancelled" },
                ]}
              />
              <p className="text-[#99A1B7] text-xs">
                Set the date of the order to process.
              </p>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="createdAt"
                className="label-required text-[#252F4A] font-semibold mb-[7px]"
              >
                Order Date
              </label>
              <DatePicker
                name="createdAt"
                defaultValue={dayjs(formik.values.createdAt, "YYYY-MM-DD")}
                onChange={onChange}
              />
              <p className="text-[#99A1B7] text-xs">
                Set the date of the order to process.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-7">
          <div className="border border-[#F1F1F2] rounded-xl px-[30px] bg-white rounded-md pb-[15px]">
            <h1 className="text-xl min-h-[70px]  text-[#071437] font-semibold leading-[70px]">
              Order Products
            </h1>
            <div className="">
              <label
                htmlFor=""
                className="text-sm text-[#252F4A] font-medium mb-[7px]"
              >
                All products in the order
              </label>
              <div className="grid grid-cols-2 p-3 gap-3 border border-dashed rounded-md border-[#F1F1F2]">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="p-3 border border-dashed rounded-md border-[#F1F1F2] flex gap-5"
                  >
                    <img
                      src={product.product.thumbnail}
                      alt=""
                      className="w-[50px] h-[50px]"
                    />
                    <div className="flex flex-col">
                      <a
                        href=""
                        className="text-base text-[#252F4A] font-semibold"
                      >
                        {product.product.title}
                      </a>
                      <span className="text-[xs] text-[#071437] font-medium">
                        Price: {formatNumberWithDots(product.price)} ₫
                      </span>
                      <span className="text-[xs] text-[#071437] font-medium">
                        Qty: {product.count}
                      </span>
                      <span className="text-[xs] text-[#99A1B7] font-medium">
                        Slug: {product.product.slug}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <h1 className="text-lg font-semibold text-[#071437] mt-4">
                Total Cost: {formatNumberWithDots(order.totalAfterDiscount)} ₫
              </h1>
            </div>

            <div className="border border-b-[#F1F1F2] h-0 my-10" />

            {/* <div>
              <div>
                <input
                  type="text"
                  name=""
                  placeholder="Search Products"
                  className="w-1/2 py-[10px] pl-[40px] pr-[13px] bg-[#F9F9F9] outline-none border-none font-semibold text-[#4B5675] rounded-lg"
                />
              </div>
            </div> */}

            <div className="mt-7">
              <table className="w-full">
                <thead className="!border-b !border-dashed !border-[#F1F1F2] text-xs">
                  <tr className="text-start text-gray-400 font-semibold uppercase ">
                    <th
                      className="w-[25px] px-2 "
                      rowSpan="1"
                      colSpan="1"
                      aria-label=""
                    ></th>
                    <th
                      className="min-w-200px"
                      tabIndex="0"
                      rowSpan="1"
                      colSpan="1"
                    >
                      Product
                    </th>
                    <th
                      className="min-w-[100px] text-end px-5"
                      tabIndex="0"
                      rowSpan="1"
                      colSpan="1"
                    >
                      Qty Remaining
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-start text-gray-400 font-bold uppercase ">
                    <th
                      className="w-[25px] px-2 "
                      rowSpan="1"
                      colSpan="1"
                      aria-label=""
                    ></th>
                    <th
                      className="min-w-200px"
                      tabIndex="0"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Product: activate to sort column ascending"
                    ></th>
                    <th
                      className="min-w-[100px] text-end px-5"
                      tabIndex="0"
                      rowSpan="1"
                      colSpan="1"
                    ></th>
                  </tr>
                </tbody>
              </table>
              <div className="max-h-[400px] overflow-auto w-full">
                <table className="w-full">
                  <thead className="!border-b !border-dashed !border-[#F1F1F2]">
                    <tr className="text-start text-gray-400 font-bold uppercase ">
                      <th
                        className="w-[25px] px-2 "
                        rowSpan="1"
                        colSpan="1"
                        aria-label=""
                      ></th>
                      <th
                        className="min-w-[200px]"
                        tabIndex="0"
                        rowSpan="1"
                        colSpan="1"
                      ></th>
                      <th
                        className="min-w-[100px] text-end px-5"
                        tabIndex="0"
                        rowSpan="1"
                        colSpan="1"
                      ></th>
                    </tr>
                  </thead>

                  <tbody className="font-semibold text-gray-600 w-full ">
                    {order.products.map((product, index) => (
                      <tr key={index} className="odd">
                        <td>
                          <div className="py-5">
                            <Checkbox
                              className="bg-[#F1F1F2] rounded !w-[20px] !h-[20px] border-none outline-none"
                              checked
                            />
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <a href="#" className="symbol symbol-50px">
                              <img
                                src={product.product.thumbnail}
                                alt=""
                                className="w-[50px] h-[50px]"
                              />
                            </a>

                            <div className="mx-5">
                              <a
                                href="#"
                                className="text-[#252F4A] text-[15px] font-semibold"
                              >
                                {product.product.title}
                              </a>

                              <div className="text-[#78829D] text-xs font-medium">
                                Price
                                <span data-kt-ecommerce-edit-order-filter="">
                                  : {formatNumberWithDots(product.price)} ₫
                                </span>
                              </div>
                              <div className="text-[#78829D] text-xs font-medium">
                                Qty: {formatNumberWithDots(product.count)}
                              </div>

                              <div className="text-[#99A1B7] text-xs font-medium">
                                Slug: {product.product.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="text-end px-5"
                          data-order={product.product.quantity}
                        >
                          {product.product.quantity < 20 ? (
                            <span className="bg-[#fff8dd] px-2 py-1 rounded font-medium text-[#ffc700] mr-2">
                              Low stock
                            </span>
                          ) : null}
                          <span className="text-sm text-[#78829D] font-bold leading-[52px] py-">
                            {product.product.quantity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="border border-[#F1F1F2] rounded-xl px-[30px] pb-[30px] bg-white rounded-md">
            <div className="flex flex-col gap-7">
              <h1 className="text-lg text-[#071437] font-semibold mt-[20px]">
                Customer Details
              </h1>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="label-required text-[#252F4A] font-semibold mb-[7px]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={formik.values.name}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[#252F4A] font-semibold mb-[7px]"
                  >
                    Email
                  </label>
                  <input
                    placeholder="Address Line 2"
                    type="email"
                    name="email"
                    defaultValue={formik.values.email}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="phone"
                    className="text-[#252F4A] font-semibold mb-[7px]"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={formik.values.phone}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                    pattern="[0-9]{9,15}"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="customerAddress"
                  className="label-required text-[#252F4A] font-semibold mb-[7px]"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="customerAddress"
                  defaultValue={formik.values.address}
                  className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                  disabled
                />
              </div>
            </div>

            <div className="flex gap-1 my-7">
              <Checkbox checked />
              <p className="text-[#99A1B7] font-medium">
                Shipping address is the same as billing address
              </p>
            </div>

            <div className="flex flex-col gap-7">
              <h1 className="text-lg text-[#071437] font-semibold">
                Shipping Address
              </h1>
              {/* <div className="grid grid-cols-2 gap-5"> */}
              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="text-[#252F4A] font-semibold mb-[7px]"
                >
                  Address Line
                </label>
                <input
                  type="text"
                  name="address"
                  defaultValue={formik.values.address}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                  required
                />
              </div>
              {/* <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[#252F4A] font-semibold mb-[7px]"
                  >
                    Address Line 2
                  </label>
                  <input
                    placeholder="Address Line 2"
                    type="text"
                    name=""
                    defaultValue="1/23 Hastings Road"
                    className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                  />
                </div> */}
              {/* </div> */}

              {/* <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[#252F4A] font-semibold mb-[7px]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name=""
                    defaultValue="Melbourne"
                    className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[#252F4A] font-semibold mb-[7px]"
                  >
                    Postcode
                  </label>
                  <input
                    type="text"
                    name=""
                    defaultValue="3000"
                    className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[#252F4A] font-semibold mb-[7px]"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name=""
                    defaultValue="1/23 Hastings Road"
                    className="border border-[#DBDFE9] rounded-md px-[13px] py-[10px] text-[#4B5675] font-medium text-base outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor=""
                  className="text-[#252F4A] font-semibold mb-[7px]"
                >
                  Country
                </label>
                <Select
                  defaultValue="standard_rate"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  options={[
                    { value: "na", label: "N/A - Virtual Product" },
                    { value: "standard_rate", label: "Standard Rate" },
                    { value: "express_rate", label: "Express Rate" },
                    {
                      value: "speed_overnight_rate",
                      label: "Speed Overnight Rate",
                    },
                  ]}
                />
              </div> */}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type=""
              onClick={() => navigate(-1)}
              className="py-[11px] px-[20px] bg-white text-[#78829D] rounded-lg hover:bg-[#F1F1F2] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-[11px] px-[20px] bg-[#3E97FF] hover:bg-[#0095e8] text-white rounded-lg font-medium"
            >
              Save Change
            </button>
          </div>
        </div>

        <div></div>
      </form>
    </div>
  );
};

export default EditOrder;
