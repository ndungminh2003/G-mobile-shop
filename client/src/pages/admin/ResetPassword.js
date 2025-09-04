import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { adminResetPassword } from "../../features/auth/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [isSubmited, setIsSubmited] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      password: yup.string().required("Password is Required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      const data = { ...values, token };
      dispatch(adminResetPassword(data));
      setIsSubmited(true);
    },
  });
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSubmited && !isLoading && isSuccess) {
      alert("Password Reset Successfully");
      navigate("/admin-login");
    } else if (isSubmited && !isLoading && isError) {
      alert("Password Reset Failed");
      setIsSubmited(false);
    }
  }, [isLoading, isSuccess, isError, isSubmited]);

  return (
    <div
      className="admin py-5"
      style={{ background: "#1e293b", minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-1/4 bg-white rounded-lg mx-auto p-6 flex flex-col gap-4">
        <h3 className="text-center text-xl font-bold title"> Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-4">
          <CustomInput
            type="password"
            label="New Password"
            id="password"
            name="password"
            val={formik.values.password}
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
          />
          <div className="error mt-2 text-red-600">
            {formik.touched.password && formik.errors.password}
          </div>
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            val={formik.values.confirmPassword}
            onChng={formik.handleChange}
            onBlr={formik.handleBlur}
          />
          <div className="error mt-2 text-red-600">
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </div>

          <button
            className="border-0 px-3 py-2 text-white font-bold w-full rounded-lg"
            style={{ background: "#1e293b" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
