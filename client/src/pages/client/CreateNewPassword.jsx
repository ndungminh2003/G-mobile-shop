import React, { useState } from "react";
import "../../assets/style/styles.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const changePasswordValidation = Yup.object({
  password: Yup.string()
    .required("Use 6 or more characters with a mix of letters and numbers")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf(
      [Yup.ref("password")],
      "The password and its confirm are not the same"
    ),
});

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  const isVerified = queryParams.get("isVerified") === "true" || false;
  const { user } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidation,
    onSubmit: (values) => {
      if (isVerified) {
        const { password } = values;
        const data = {
          email,
          password,
        };
        dispatch(changePassword(data));
        toast.success("Đổi mật khẩu thành công");
        if (user === null || user === undefined) navigate("/login");
        else navigate("/");
      } else {
        toast.error("Email chưa được xác thực OTP");
      }
      formik.resetForm();
    },
  });
  return (
    <div className="restore-password w-[700px] m-auto mt-[20px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto text-2xl font-bold text-center">
          <h3>Tạo mật khẩu mới</h3>
        </div>
        <div className="mt-6 text-center restore-password-logo">
          <img
            src="/logo/small.png"
            alt=""
            className="h-[120px] m-auto rounded-xl"
          />
        </div>
        <div>
          <h5 className="ml-3 mr-1">Tạo mật khẩu mới</h5>
          <br />
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu mới của bạn"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
          </div>

          <div className="text-[#afafaf] text-[13px] italic pl-[15px]">
            Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa,
            1 chữ số, 1 ký tự đặc biệt
          </div>
          <br />
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận lại mật khẩu"
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div style={{ color: "red" }}>
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>
        <div className="ml-3 mr-3">
          <button
            type="submit"
            className="bg-slate-500 rounded-md text-white cursor-pointer block text-center text-14 font-semibold mt-[20px] mb-[20px] mx-auto pt-[11px] pb-[11px] w-full"
          >
            Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPassword;
