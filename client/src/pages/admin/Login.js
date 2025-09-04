import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthState } from "../../features/auth/authSlice";
import { resetState } from "../../features/product/productSlice";
import { toast } from "react-toastify";
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmited, setIsSubmited] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      values = { ...values, role: "admin" };
      dispatch(login(values));
      setIsSubmited(true);
      formik.resetForm();
    },
  });
  const authState = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = authState;
  useEffect(() => {
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSubmited && !isLoading && isSuccess && user?.role === "admin") {
      toast.success("Login Successfull");
      navigate("/admin");
    } else if (
      isSubmited &&
      !isLoading &&
      (user?.role === undefined || user?.role !== "admin")
    ) {
      setIsSubmited(false);
    } else if (user?.role !== undefined) {
      navigate(-1);
    }
    // else {
    //   navigate("/admin-login");
    // }
  }, [user, isError, isSuccess, isLoading]);

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
      <div className="my-5 w-1/4 bg-white rounded-lg mx-auto p-6">
        <h3 className="text-center title text-3xl font-bold p-2">
          Admin Login
        </h3>
        <p className="text-center mb-4">Login to your account to continue.</p>
        <div className="error text-center" style={{ color: "red" }}>
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className=" flex flex-col gap-2"
        >
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2 text-red-600">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2 text-red-600">
            {formik.touched.password && formik.errors.password}
          </div>

          <div className="mb-3 flex justify-between">
            <Link to="/salesperson-login" className=" hover:text-blue-500">
              Login as a Sales person
            </Link>

            <Link to="/admin/forgot-password" className=" hover:text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <button
            className="border-0 px-3 py-2 text-white font-bold w-full text-center text-decoration-none text-xl rounded-lg"
            style={{ background: "#1e293b" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
