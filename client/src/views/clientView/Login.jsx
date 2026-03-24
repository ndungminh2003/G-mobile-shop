import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthState } from "../../features/auth/authSlice";
import * as Yup from "yup";
import { toast } from "react-toastify";
import RingLoader from "react-spinners/RingLoader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const initialValues = {
  email: "",
  password: "",
};

const loginValidation = Yup.object({
  email: Yup.string()
    .required("Email address is required.")
    .email("Please enter a valid email address."),
  password: Yup.string().required("Please enter a password"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmited, setIsSubmited] = useState(false);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: (values) => {
      values = { ...values, role: "user" };
      dispatch(resetAuthState());
      dispatch(login(values));
      setIsSubmited(true);
      formik.resetForm();
      setIsEmailFilled(false);
    },
  });

  const authState = useSelector((state) => state.auth);
  const { user, isError, isSuccess, isLoading, message } = authState;

  useEffect(() => {
    if (isSubmited && isSuccess && !isLoading && user?.role === "user") {
      toast.success("Đăng nhập thành công");
      navigate("/");
    } else if (
      isSubmited &&
      !isLoading &&
      (user?.role === undefined || user?.role !== "user")
    ) {
      setIsSubmited(false);
    } else if (user?.role !== undefined) {
      navigate(-1);
    }
  }, [user, isError, isSuccess, isLoading]);

  const handleForgotPasswordClick = () => {
    if (isEmailFilled) {
      navigate(`/forgot-password?email=${formik.values.email}`);
    } else {
      alert("Vui lòng điền vào trường email trước khi tiếp tục.");
    }
  };

  return (
    <div className="max-w-[700px] m-auto">
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          className="overlay"
        >
          <RingLoader color="#e8fffa" loading size={150} speedMultiplier={1} />
        </div>
      )}

      <div className="py-[10px] flex w-full text-center">
        <ArrowBackIcon
          className="justify-start !text-[30px] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="m-auto text-[#4a4a4a] text-[22px] font-bold">
          Đăng nhập Techstore Member
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
          <div className="error text-center" style={{ color: "red" }}>
            {message.message === "Rejected"
              ? "Email hoặc mật khẩu không đúng"
              : ""}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-5 mb-3">
              <input
                type="text"
                name="email"
                placeholder="Nhập số điện thoại/email"
                className="text-base text-[#222] w-full !border-b !border-[#e8e8e8] h-[40px] px-[15px] outline-none rounded"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={(event) => {
                  formik.handleBlur(event);
                  setIsEmailFilled(!!formik.values.email);
                }}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mt-5 mb-3">
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                className="text-base text-[#222] w-full !border-b !border-[#e8e8e8] h-[40px] px-[15px] outline-none rounded"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              <div className="flex justify-end w-full mt-[15px]">
                <p
                  className="text-[#afafaf] text-[13px] cursor-pointer"
                  onClick={handleForgotPasswordClick}
                >
                  Quên mật khẩu?
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="outline-none bg-slate-500 text-white text-center text-sm py-[10px] w-full rounded-md font-semibold"
            >
              Đăng nhập
            </button>

            <div className="flex items-center w-full mt-5 h-[49px]">
              <hr className="h-[1px] w-full" />
              <p className="mx-2 whitespace-nowrap text-[#4a4a4a] text-base">
                hoặc đăng nhập bằng
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
              <p className="text-[#777]">Bạn chưa có tài khoản?</p>
              <Link to={"/register"} className="text-gray-600 font-semibold">
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
