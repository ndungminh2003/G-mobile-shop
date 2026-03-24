import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { adminForgotPassword } from "../../features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [isSubmited, setIsSubmited] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email should be valid")
        .required("Email is Required"),
    }),
    onSubmit: (values) => {
      const data = { ...values, role: "admin" };
      dispatch(adminForgotPassword(data));
      setIsSubmited(true);
    },
  });
  const { isError, isSuccess, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isSubmited && !isLoading && isSuccess) {
      alert("Reset Password Link Sent to your Email");
      setIsSubmited(false);
    } else if (isSubmited && !isLoading && isError) {
      alert("Email is not registered");
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
        <h3 className="text-center text-xl font-bold title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-4">
          <CustomInput
            type="email"
            label="Email Address"
            id="email"
            name="email"
            val={formik.values.email}
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
          />
          <div className="error mt-2 text-red-600">
            {formik.touched.email && formik.errors.email}
          </div>

          <button
            className="border-0 px-3 py-2 text-white font-bold w-full rounded-lg"
            style={{ background: "#1e293b" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
