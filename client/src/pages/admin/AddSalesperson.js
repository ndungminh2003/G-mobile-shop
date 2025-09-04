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
  createUserInAdmin,
  updateAUser,
  resetState,
} from "../../features/account/accountSlice";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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

const defaultSalespersonState = {
  name: "",
  email: "",
  mobile: "",
  dateOfBirth: "",
  role: "salesperson",
  address: "",
  password: "",
};

const AddSalesperson = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getUserId = location.pathname.split("/")[3];
  const newSales = useSelector((state) => state.account);

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
    createdUser,
    updatedUser,
    userDetail,
  } = newSales;

  let salesperson = userDetail || defaultSalespersonState;

  salesperson = {
    name: salesperson.name,
    email: salesperson.email,
    mobile: salesperson.mobile,
    dateOfBirth: changeDateFormet(salesperson.dateOfBirth),
    role: salesperson.role,
    address: salesperson.address,
    password: "",
  };

  useEffect(() => {
    if (!isLoading && isSuccess && createdUser) {
      toast.success("Salesperson Added Successfullly!");
    }
    if (!isLoading && isSuccess && updatedUser) {
      toast.success("Salesperson Updated Successfullly!");
      navigate("/admin/customer-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: salesperson,
    validationSchema: schema,
    onSubmit: (values) => {
      if (getUserId !== undefined) {
        if (values.password === "") delete values.password;
        const data = { id: getUserId, accountData: values };
        dispatch(updateAUser(data));
        dispatch(resetState());
      } else {
        dispatch(createUserInAdmin(values));
        formik.resetForm();
        dispatch(resetState());
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title text-3xl font-bold">
        {getUserId !== undefined ? "Edit" : "Add"} Salesperson
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="flex gap-3 flex-col">
          <div className=" h-16">
            <CustomInput
              type="text"
              label="Enter Salesperson Name"
              name="name"
              onChng={formik.handleChange("name")}
              onBlr={formik.handleBlur("name")}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>

          <div className=" h-16">
            <CustomInput
              type="email"
              label="Enter Salesperson Email"
              name="email"
              onChng={formik.handleChange("email")}
              onBlr={formik.handleBlur("email")}
              val={formik.values.email}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div className=" h-16">
            <CustomInput
              type="tel"
              label="Enter Phone Number"
              name="mobile"
              onChng={formik.handleChange("mobile")}
              onBlr={formik.handleBlur("mobile")}
              val={formik.values.mobile}
            />
            <div className="error">
              {formik.touched.mobile && formik.errors.mobile}
            </div>
          </div>

          <div className=" h-16">
            <CustomInput
              type="date"
              name="dateOfBirth"
              onChng={formik.handleChange("dateOfBirth")}
              onBlr={formik.handleBlur("dateOfBirth")}
              val={formik.values.dateOfBirth}
              id="date"
            />
            <div className="error">
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            </div>
          </div>

          <div className=" h-16">
            <select
              name="role"
              onChange={formik.handleChange("role")}
              onBlur={formik.handleBlur("role")}
              value={formik.values.role}
              className="block appearance-none w-full px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded py-3 mb-3"
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
          </div>

          <div className=" h-16">
            <CustomInput
              type="text"
              label="Enter Salesperson Address"
              name="address"
              onChng={formik.handleChange("address")}
              onBlr={formik.handleBlur("address")}
              val={formik.values.address}
            />
            <div className="error">
              {formik.touched.address && formik.errors.address}
            </div>
          </div>
          {getUserId !== undefined ? (
            <div className=" h-16">
              <CustomInput
                type="password"
                label="Change Salesperson Password"
                name="password"
                onChng={formik.handleChange}
                onBlr={formik.handleBlur}
                val={formik.values.password}
              />
            </div>
          ) : (
            <div className=" h-16">
              <CustomInput
                type="password"
                label="Enter Salesperson Password"
                name="password"
                onChng={formik.handleChange}
                onBlr={formik.handleBlur}
                val={formik.values.password}
              />
              <div className="error">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>
          )}

          <button
            className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600 border-0 rounded-3 my-5"
            type="submit"
          >
            {getUserId !== undefined ? "Edit" : "Add"} Salesperson
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalesperson;
