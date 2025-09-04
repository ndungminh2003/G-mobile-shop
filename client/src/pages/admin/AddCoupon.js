import { React, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../../features/coupon/couponSlice";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

const defaultCouponState = {
  name: "",
  expiry: "0000-00-00",
  discount: 0,
};

const AddCoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    updatedCoupon,
  } = newCoupon;

  let coupon =
    couponName !== undefined && couponName !== null
      ? couponName
      : defaultCouponState;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    let [day, month, year] = newDate.split("/");
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return [year, month, day].join("-");
  };
  coupon = {
    name: coupon.name,
    discount: coupon.discount,
    expiry: changeDateFormat(coupon.expiry),
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfullly!");
    }
    if (!isLoading && isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfullly!");
      navigate("/admin/coupon-list");
    }
    if (!isLoading && isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: coupon,
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        dispatch(resetState());
      }
    },
  });

  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className=" flex flex-col gap-2"
        >
          <div className=" h-16">
            <CustomInput
              type="text"
              name="name"
              onChng={formik.handleChange}
              onBlr={formik.handleBlur}
              val={formik.values.name}
              label="Enter Coupon Name"
              id="name"
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>

          <div className=" h-16 flex justify-center flex-col">
            <input
              type="date"
              name="expiry"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.expiry}
              label="Enter Expiry Data"
              id="date"
              className=" w-full h-10"
            />
            <div className="error h-4">
              {formik.touched.expiry && formik.errors.expiry}
            </div>
          </div>

          <div className=" h-16">
            <CustomInput
              type="number"
              name="discount"
              onChng={formik.handleChange}
              onBlr={formik.handleBlur}
              val={formik.values.discount}
              label="Enter Discount"
              id="discount"
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>
          </div>
          <button
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
