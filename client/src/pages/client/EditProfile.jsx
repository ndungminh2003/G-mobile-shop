import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { changeProfile } from "../../features/auth/authSlice";

const defaultProfileState = {
  name: "",
  mobile: "",
  dateOfBirth: "0000-00-00",
  address: "",
};

export default function Edit() {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmited, setIsSubmited] = useState(false);

  let { user, isSuccess, isError, isLoading } = useSelector(
    (state) => state.auth
  );
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

  user = user ? user : defaultProfileState;
  user = { ...user, dateOfBirth: changeDateFormat(user.dateOfBirth) };
  const handleClickChangePass = () => {
    navigate(`/forgot-password?email=${user.email}`);
  };
  const formik = useFormik({
    initialValues: user,

    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      mobile: Yup.string()
        .max(11, "Please enter a valid mobile number.")
        .min(10, "Please enter a valid mobile number.")
        .matches(phoneRegExp, "Please enter a valid mobile number.")
        .required("Required"),
    }),

    onSubmit: (values) => {
      let updateData = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        dateOfBirth: values.dateOfBirth,
        address: values.address,
      };
      dispatch(changeProfile(updateData));
      setIsSubmited(true);
    },
  });
  const data = {
    name: "Name: Minh Dung Nguyen",
    mobile: "Phone Number: 0934117756",
    dateOfBirth: "dateOfBirth: 15/02/2003",
    address: "Address: District 8 TPHCM",
  };

  useEffect(() => {
    if (isSubmited && !isLoading && isSuccess) {
      toast.success("Cập nhật thành công");
      //   navigate("/user");
    } else if (isSubmited && !isLoading && isError) {
      toast.error("Cập nhật thất bại");
      setIsSubmited(false);
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <div className=" container">
      <form onSubmit={formik.handleSubmit} className=" flex justify-center p-6">
        <div className=" flex flex-col gap-4 items-center w-1/2 min-w-[400px]">
          <div className=" flex flex-col items-center gap-2">
            <div className=" w-20 h-20">
              <img src="/logo/small.png" alt="logo" className=" rounded-xl" />
            </div>
            <div className=" font-bold text-xl text-gray-600">{user.name}</div>
          </div>

          <div className=" flex flex-col gap-5 w-full">
            <div className=" flex flex-col">
              <input
                id="name"
                name="name"
                type="text"
                className=" w-full p-4 border-b-gray-300 border-b-[1px] rounded-md outline-none focus:border-sky-500 focus:duration-500 "
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={user.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className=" text-red-500 text-sm ml-4">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            <div className=" ">
              <input
                id="mobile"
                type="tel"
                name="mobile"
                className=" w-full p-4 border-b-gray-300 border-b-[1px] rounded-md outline-none focus:border-sky-500 focus:duration-500 "
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={user.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className=" text-red-500 text-sm ml-4">
                  {formik.errors.mobile}
                </div>
              ) : null}
            </div>

            <div className="">
              <label className=" ml-4 text-gray-400">Birthday</label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                className=" w-full p-4 border-b-gray-300 border-b-[1px] rounded-md outline-none focus:border-sky-500 focus:duration-500 "
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                placeholder={user.dateOfBirth}
              />
            </div>

            <div className=" ">
              <input
                id="address"
                type="text"
                name="address"
                className=" w-full p-4 border-b-gray-300 border-b-[1px] rounded-md outline-none focus:border-sky-500 focus:duration-500 "
                value={formik.values.address}
                onChange={formik.handleChange}
                placeholder={user.address}
              />
            </div>

            <div className=" ">
              <input
                id="change_pass"
                type="password"
                name="change_pass"
                onClick={handleClickChangePass}
                className=" w-full p-4 border-b-gray-300 border-b-[1px] rounded-md outline-none focus:border-sky-500 focus:duration-500 "
                placeholder="Update password"
              />
            </div>

            <button
              type="submit"
              className=" w-full flex justify-center bg-slate-400 items-center p-4 border-b-gray-300 border-b-[1px] rounded-md outline-none focus:border-sky-500 focus:duration-500 text-xl"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
