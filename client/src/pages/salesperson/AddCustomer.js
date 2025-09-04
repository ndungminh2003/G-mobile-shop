import { React, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  getAUser,
  createAUser,
  updateAUser,
  resetState,
} from "../../features/account/accountSlice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup.string().required("Email is Required"),
  mobile: yup
    .string()
    .required("Enter phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
  dateOfBirth: yup.date(),
  role: yup.string().required("Role is Required"),
  address: yup.string().required("Address is Required"),
});

const defaultCustomertState = {
  name: "",
  email: "",
  mobile: "",
  dateOfBirth: "",
  role: "",
  address: "",
};

const AddCustomer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getUserId = location.pathname.split("/")[3];
  const newCustomer = useSelector((state) => state.account);

  const changeDateFormet = (date) => {
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

  useEffect(() => {
    dispatch(resetState());
  }, []);
  useEffect(() => {
    if (getUserId !== undefined) {
      dispatch(getAUser(getUserId));
    } else {
      dispatch(resetState());
    }
  }, [getUserId]);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCustomer,
    updatedCustomer,
    userDetail,
  } = newCustomer;

  let customer = userDetail || defaultCustomertState;

  customer = {
    name: customer.name,
    email: customer.email,
    mobile: customer.mobile,
    dateOfBirth: changeDateFormet(customer.dateOfBirth),
    role: customer.role,
    address: customer.address,
  };

  useEffect(() => {
    if (isSuccess && createdCustomer) {
      toast.success("Customer Added Successfullly!");
    }
    if (isSuccess && updatedCustomer) {
      toast.success("Customer Updated Successfullly!");
      navigate("/admin/list-customer");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: customer,
    validationSchema: schema,
    onSubmit: (values) => {
      if (getUserId !== undefined) {
        const data = { id: getUserId, accountData: values };
        dispatch(updateAUser(data));
        dispatch(resetState());
      } else {
        dispatch(createAUser(values));
        formik.resetForm();
        dispatch(resetState());
        // This is optional
        // setTimeout(() => {
        //   dispatch(resetState());
        // }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getUserId !== undefined ? "Edit" : "Add"} Customer
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Customer Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="email"
            label="Enter Customer Email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="number"
            label="Enter Phone Number"
            name="mobile"
            onChng={formik.handleChange("mobile")}
            onBlr={formik.handleBlur("mobile")}
            val={formik.values.mobile}
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <CustomInput
            type="date"
            name="dateOfBirth"
            onChng={formik.handleChange("dateOfBirth")}
            onBlr={formik.handleBlur("dateOfBirth")}
            val={formik.values.dateOfBirth}
            label="Enter Date of Birth"
            id="date"
          />
          <div className="error">
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          </div>
          <select
            name="role"
            onChange={formik.handleChange("role")}
            onBlur={formik.handleBlur("role")}
            value={formik.values.role}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="salesperson">Salesperson</option>
          </select>
          <div className="error">
            {formik.touched.role && formik.errors.role}
          </div>

          <CustomInput
            type="text"
            label="Enter Customer Address"
            name="address"
            onChng={formik.handleChange("address")}
            onBlr={formik.handleBlur("address")}
            val={formik.values.address}
          />
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getUserId !== undefined ? "Edit" : "Add"} Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
