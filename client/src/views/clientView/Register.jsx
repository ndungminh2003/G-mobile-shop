import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  deleteNotVerifiedUser,
  resetAuthState,
} from "../../features/auth/authSlice";
import { toast } from "react-toastify";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const formValidation = Yup.object({
  name: Yup.string()
    .required("Enter your name")
    // .min(2, "First name must be between 2 and 16 characters. ")
    // .max(16, "First name must be between 2 and 16 characters. ")
    .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed"),
  mobile: Yup.string()
    .required("Enter phone number")
    .matches(phoneRegExp, "Phone number is not valid"),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password"
    )
    .email("Enter valid email"),
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
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
  // isAgree: false,
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmited, setIsSubmited] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: formValidation,
    onSubmit: (values) => {
      const { confirmPassword, ...data } = values;
      dispatch(register(data));
      formik.resetForm();
      setIsSubmited(true);
    },
  });
  const { registeredUser, isLoading, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (registeredUser) {
      dispatch(deleteNotVerifiedUser(registeredUser?._id));
      dispatch(resetAuthState());
    }
  }, []);

  useEffect(() => {
    if (isSubmited && !isLoading && isSuccess) {
      navigate("/otp");
    } else if (isSubmited && !isLoading && isError) {
      toast.error("Email hoặc số điện thoại đã được sử dụng");
      setIsSubmited(false);
    }
  }, [isSuccess, isError, isLoading, isSuccess]);

  return (
    <div className="max-w-[700px] m-auto">
      <div className="py-[10px] flex w-full text-center">
        <ArrowBackIcon
          className="justify-start !text-[30px] cursor-pointer"
          onClick={() => navigate("/login")}
        />
        <h1 className="m-auto text-[#4a4a4a] text-[22px] font-bold">
          Đăng ký Techstore Member
        </h1>
      </div>
      <div>
        <div className="mt-5 text-center">
          <img
            src="/logo/small.png"
            alt=""
            className="w-[80px] h-[80px] m-auto rounded-xl"
          />
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-5 mb-3">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nhập họ và tên"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-base text-[#222] w-full !border-b !border-[#e8e8e8] h-[40px] px-[15px] outline-none rounded"
              />
              {formik.touched.name && formik.errors.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </div>
            <div className="mt-5 mb-3">
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Nhập số điện thoại"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-base text-[#222] w-full !border-b !border-[#e8e8e8] h-[40px] px-[15px] outline-none rounded"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div style={{ color: "red" }}>{formik.errors.mobile}</div>
              )}
            </div>
            <div className="mt-5 mb-3">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Nhập email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-base text-[#222] w-full !border-b !border-[#e8e8e8] h-[40px] px-[15px] outline-none rounded"
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
              <p className="text-[#afafaf] text-[13px] italic pl-[15px]">
                (*) Hóa đơn VAT khi mua hàng sẽ được gửi qua email này
              </p>
            </div>
            <div className="mt-5 mb-3">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Nhập mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-base text-[#222] w-full !border-b !border-[#e8e8e8] h-[40px] px-[15px] outline-none rounded"
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <p className="text-[#afafaf] text-[13px] italic pl-[15px]">
                (*) Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ
                in hoa, 1 chữ số, 1 ký tự đặc biệt
              </p>
            </div>
            <div className="mt-5 mb-3">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-base text-[#222] w-full !border-b !border-[#e8e8e8] h-[40px] px-[15px] outline-none rounded"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div style={{ color: "red" }}>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <div>
              <Checkbox id="1" />
              <label htmlFor="1" className="text-[#777] text-[13px]">
                Tôi đồng ý với các điều khoản bảo mật cá nhân
              </label>
            </div>

            <button
              type="submit"
              className="outline-none bg-slate-500 text-white text-center text-sm py-[10px] w-full rounded-md font-semibold"
            >
              Đăng ký
            </button>

            <div className="flex items-center w-full mt-5 h-[49px]">
              <hr className="h-[1px] w-full" />
              <p className="mx-2 whitespace-nowrap text-[#4a4a4a] text-base">
                hoặc đăng ký bằng
              </p>
              <hr className="h-[1px] w-full" />
            </div>

            <div className="flex items-center justify-center gap-[30px] h-[55px]">
              <div className="flex items-center gap-[10px]">
                <img
                  src="https://account.cellphones.com.vn/_nuxt/img/image45.93ceca6.png"
                  alt=""
                  className="w-6 h-6"
                />
                <p>Google</p>
              </div>
              <div className="flex items-center gap-[10px]">
                <img
                  src="https://account.cellphones.com.vn/_nuxt/img/Logo-Zalo-Arc.a36365b.png"
                  alt=""
                  className="w-6 h-6"
                />
                <p>Zalo</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-[5px] my-5 text-sm">
              <p className="text-[#777]">Bạn đã có tài khoản?</p>
              <Link to="/login" className="text-gray-600 font-semibold">
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
