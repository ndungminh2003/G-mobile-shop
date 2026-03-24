import React, { useState, useEffect, useRef } from "react";
import MaskedEmail from "./MaskedEmail";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, verifyOTP } from "../../features/auth/authSlice";
import { useFormik } from "formik";
import "../../assets/style/styles.css";
import { toast } from "react-toastify";
const CreateNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const { isSuccess, isLoading, isError, isVerified } = useSelector(
    (state) => state.auth
  );
  const email = useSelector((state) => state.auth?.registeredUser?.email) || "";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      input0: "",
      input1: "",
      input2: "",
      input3: "",
    },
    onSubmit: (values) => {
      if (isCounting) {
        let otp = values.input0 + values.input1 + values.input2 + values.input3;
        dispatch(verifyOTP({ email, otp: otp }));
      } else {
        toast.error("OTP Expired");
      }
      setIsSubmited(true);
      formik.resetForm();
    },
  });
  useEffect(() => {
    let interval;
    if (isCounting) {
      interval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const displayErrorToast = (message) => {
    if (!isToastVisible) {
      setIsToastVisible(true);

      toast.error(message, {
        onClose: () => {
          setIsToastVisible(false);
        },
      });
    }
  };

  const displaySuccessToast = (message) => {
    if (!isToastVisible) {
      setIsToastVisible(true);

      toast.success(message, {
        onClose: () => {
          setIsToastVisible(false);
        },
      });
    }
  };
  useEffect(() => {
    if (
      isSubmited &&
      isCounting &&
      !isLoading &&
      isSuccess &&
      isVerified &&
      isVerified !== undefined
    ) {
      toast.success("Đăng ký thành công");
      navigate("/login");
    } else if (
      isSubmited &&
      isCounting &&
      !isLoading &&
      isError &&
      !isVerified &&
      isVerified !== undefined
    ) {
      displayErrorToast("OTP verification failed");
      setIsSubmited(false);
    } else if (
      isSubmited &&
      !isCounting &&
      !isLoading &&
      !isSuccess &&
      !isVerified &&
      isVerified !== undefined
    ) {
      displayErrorToast("OTP Expired");
      setIsSubmited(false);
    }
  }, [isSuccess, isError, isVerified, isLoading]);

  useEffect(() => {
    if (countdown === 0) {
      setIsCounting(false);
    }
  }, [countdown]);

  const handleKeyUp = (index, event) => {
    if (event.key !== "Backspace" && index < 3) {
      inputRefs[index + 1].current.focus();
      inputRefs[index + 1].current.select();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0) {
      formik.setFieldValue(`input${index}`, "");
      inputRefs[index - 1].current.focus();
      inputRefs[index - 1].current.select();
    }
  };

  const handleResend = () => {
    dispatch(sendOTP({ email }));
    setCountdown(60);
    setIsCounting(true);
  };

  return (
    <div className="restore-password w-[700px] m-auto mt-[20px]">
      <div className="mx-auto text-2xl font-bold text-center">
        <h3>Registration confirmation</h3>
      </div>
      <div className="restore-password-confirm mt-[110px] p-[15px] text-[13px]">
        Enter the OTP sent via email <MaskedEmail email={email} />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-center mt-[40px]">
          {inputRefs.map((inputRef, index) => (
            <input
              key={index}
              ref={inputRef}
              min="0"
              max="9"
              maxLength="1"
              pattern="[0-9]"
              type="tel"
              className="otp-number"
              name={`input${index}`}
              value={formik.values[`input${index}`]}
              onChange={formik.handleChange}
              onKeyUp={(e) => handleKeyUp(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-[20px]">
          OTP code expires in
          {countdown === 0 ? (
            <button onClick={handleResend} className=" text-[#e0052b] text-14">
              Resend
            </button>
          ) : (
            <div className="text-[#e0052b]">{countdown}s</div>
          )}
        </div>
        <div className="res-btn ">
          <button
            type="submit"
            className=" bg-slate-500 rounded-md text-white cursor-pointer block text-center text-14 font-semibold mt-[20px] mb-[20px] mx-auto pt-[11px] pb-[11px] w-full"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPassword;
