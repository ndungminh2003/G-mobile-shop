import { React, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createAReport,
  updateAReport,
  getAReport,
  resetState,
} from "../../features/salesreport/reportSlice";

let schema = yup.object().shape({
  noOrders: yup.number().required("Number of orders is Required"),
  sold: yup.number().required("Product sold is Required"),
  totalRevenue: yup.number().required("Total revenue is Required"),
});

const defaultReportState = {
  sold: "",
  noOrders: "",
  totalRevenue: "",
};

const AddSalesReport = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const getReportId = location.pathname.split("/")[3];
  const newReport = useSelector((state) => state.report);
  const user = useSelector((state) => state.auth.user);

  const {
    isSuccess,
    isError,
    isLoading,
    createdReport,
    updatedReport,
    reportDetails,
  } = newReport;

  let report =
    reportDetails !== undefined && reportDetails !== null
      ? reportDetails
      : defaultReportState;

  useEffect(() => {
    if (getReportId !== undefined) {
      dispatch(getAReport(getReportId));
    } else {
      dispatch(resetState());
    }
  }, [getReportId]);

  useEffect(() => {
    dispatch(resetState());
  }, []);

  useEffect(() => {
    if (isSubmitted && !isLoading && isSuccess && createdReport) {
      toast.success("Report Added Successfullly!");
      setIsSubmitted(false);
    }
    if (isSubmitted && !isLoading && isSuccess && updatedReport) {
      toast.success("Report Updated Successfullly!");
      navigate(-1);
    }
    if (isSubmitted && !isLoading && isError) {
      toast.error("Something Went Wrong!");
      setIsSubmitted(false);
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: report,
    validationSchema: schema,
    onSubmit: (values) => {
      if (getReportId !== undefined) {
        console.log(values);
        dispatch(updateAReport(values));
        dispatch(resetState());
        setIsSubmitted(true);
      } else {
        let data = {
          ...values,
          name: user.name,
          email: user.email,
        };
        dispatch(createAReport(data));
        dispatch(resetState());
        formik.resetForm();
        setIsSubmitted(true);
      }
    },
  });

  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">
        {getReportId !== undefined ? "Edit" : ""} Sales Report
      </h3>
      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className=" flex flex-col gap-2"
        >
          <div className=" h-16">
            <CustomInput
              type="number"
              name="noOrders"
              onChng={formik.handleChange}
              onBlr={formik.handleBlur}
              val={formik.values.noOrders}
              label="Enter Number Of Orders"
              id="noOrders"
            />
            <div className="error">
              {formik.touched.noOrders && formik.errors.noOrders}
            </div>
          </div>
          <div className=" h-16">
            <CustomInput
              type="number"
              name="sold"
              onChng={formik.handleChange}
              onBlr={formik.handleBlur}
              val={formik.values.sold}
              label="Enter Number Of Products Sold"
              id="sold"
            />
            <div className="error">
              {formik.touched.sold && formik.errors.sold}
            </div>
          </div>
          <div className=" h-16">
            <CustomInput
              type="number"
              name="totalRevenue"
              onChng={formik.handleChange}
              onBlr={formik.handleBlur}
              val={formik.values.totalRevenue}
              label="Enter Total Revenue (VNĐ)"
              id="totalRevenue"
            />
            <div className="error">
              {formik.touched.totalRevenue && formik.errors.totalRevenue}
            </div>
          </div>
          <button
            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600 my-5"
            type="submit"
          >
            {getReportId !== undefined ? "Edit" : "Add"} Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSalesReport;
