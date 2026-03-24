import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MaskedEmail from "./MaskedEmail";
import { sendOTP } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
const RestorePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  const { message, isError, isSuccess, isLoading } = useSelector(
    (state) => state.auth
  );
  const [isSubmited, setIsSubmited] = useState(false);
  const handleForgotPasswordClick = () => {
    dispatch(sendOTP({ email }));
    setIsSubmited(true);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (isSubmited && !isLoading && isSuccess) {
      navigate(`/forgot-password-otp?email=${email}`);
    } else if (isSubmited && !isLoading && isError) {
      toast.error("Email chưa được đăng ký");
      setIsSubmited(false);
    }
  }, [message, isError, isSuccess, isLoading]);

  return (
    <div className="restore-password w-[700px] m-auto mt-[20px]">
      <div className="flex">
        <div
          className="cursor-pointer restore-password-back"
          onClick={handleBackClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_3392_9050)">
              <path
                d="M25 12H7"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M12 19L5 12L12 5"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>{" "}
            <defs>
              <clipPath id="clip0_3392_9050">
                <rect width="24" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="mx-auto text-2xl font-bold text-center">
          <h3>Quên mật khẩu</h3>
        </div>
      </div>
      <div className="text-center restore-password-logo">
        <img
          src="/logo/small.png"
          alt=""
          className="h-[120px] m-auto rounded-xl "
        />
      </div>
      <div className="restore-password-confirm">
        <div className="restore-password-text text-[#777] text-sm mb-5 ml-3">
          Gửi mã xác nhận để lấy lại mật khẩu
        </div>
        <div className=" res-restore-password border-[2px] border-slate-500 rounded-lg cursor-pointer mb-5 pl-[20px] pr-[20px] pt-[10px] pb-[10px] flex items-center gap-[15px]">
          <div className=" restore-password-icon w-[68px] h-[68px] p-[22px] rounded-[50%] bg-[#ffd9d9]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"
                fill="#e11b1e"
              ></path>
            </svg>
          </div>
          <div className="RestorePassword-info">
            <div className="text-[12px]">Qua email</div>
            <div>
              <strong>
                <MaskedEmail email={email} />
              </strong>
            </div>
          </div>
        </div>
        <div className="res-btn">
          <button
            onClick={handleForgotPasswordClick}
            className=" bg-slate-500 rounded-md text-white cursor-pointer block text-center text-14 font-semibold mt-[20px] mb-[20px] mx-auto pt-[11px] pb-[11px] w-full"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestorePassword;
