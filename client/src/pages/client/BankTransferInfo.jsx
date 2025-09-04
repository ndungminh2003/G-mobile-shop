import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BankTransferInfo = () => {
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    let interval;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const [copySuccess, setCopySuccess] = useState(false);
  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
    });
  };

  useEffect(() => {
    if (copySuccess) {
      const timeout = setTimeout(() => {
        setCopySuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [copySuccess]);

  return (
    <div className="max-w-[1200px] m-auto">
      <div className="bg-[#fffce6] p-[15px] my-4">
        <p className="text-center text-[#d70018] text-base font-semibold">
          Quý Khách vui lòng không tắt trình duyệt cho đến khi nhận được kết quả
          giao dịch trên website. Xin cảm ơn!
        </p>
      </div>
      <div className="max-w-[440px] m-auto">
        <div className="flex items-center justify-center gap-1 mb-4 text-[#ff1f1f]">
          <img
            src="https://cdn2.cellphones.com.vn/x20,webp/media/icon/icon-clock-o.png"
            alt=""
          />
          <p>Giao dịch hết hạn sau </p>
          <span className="font-semibold">{formatTime(seconds)}</span>
        </div>

        <div className="p-5 border border-[#d9d9d9] rounded-[10px]">
          <div>
            <div>
              <p className="text-[#0e2431] font-semibold uppercase text-center text-sm">
                Vui lòng quét mã bên dưới để thanh toán chuyển khoản
              </p>
            </div>
          </div>

          <div>
            <Link>
              {/* <img alt="" src={QrCodeUrl} /> */}
              <img
                src="https://img.vietqr.io/image/970415-106874636610-print.png"
                alt=""
              />
            </Link>
            <div className="flex justify-center mt-3">
              <a
                className="flex"
                download
                href="https://img.vietqr.io/image/970415-106874636610-print.png"
              >
                <img
                  src="https://cdn2.cellphones.com.vn/x20,webp/media/icon/icon-download.png"
                  alt=""
                />
                Tải QR Code
              </a>
            </div>
          </div>
        </div>
        <div className="px-5 py-[10px] mt-[10px] border border-[#d9d9d9] rounded-[10px] text-[#1f6b30] text-sm">
          <strong>Thông tin chuyển khoản</strong>
          <ul>
            <li>Công ty cổ phần ngoài NN</li>
            <li>Ngân hàng Vietinbank – CN Sa Đéc</li>
            <li>
              Số tài khoản: <strong>106874636610</strong>
            </li>
            <li>
              <strong>Hotline hỗ trợ: </strong>
              <a href="" className="font-bold">
                1800.2097
              </a>
            </li>
          </ul>
          <button
            onClick={() => handleCopyClick("106874636610")}
            className="text-black flex items-baseline border bg-[#ececec] border-[#e1ba40] border-dashed py-[1px] px-[6px] gap-1 ustify-end"
          >
            <div className="!w-3 !h-3 justify-end">
              <svg
                data-v-05616da6=""
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="clipboard"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="svg-inline--fa fa-clipboard"
              >
                <path
                  data-v-05616da6=""
                  fill="currentColor"
                  d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"
                  class=""
                ></path>
              </svg>
            </div>
            Sao chép STK
          </button>
          <div>
            <ul>
              <li>
                <p>
                  Nội dung chuyển khoản:{" "}
                  <strong>
                    S943592M WN0301221478 Nguyen Bao Duy 0939570374
                  </strong>
                </p>
              </li>
            </ul>
            <button
              onClick={() =>
                handleCopyClick(
                  "S943592M WN0301221478 Nguyen Bao Duy 0939570374"
                )
              }
              className="text-black flex items-baseline border bg-[#ececec] border-[#e1ba40] border-dashed py-[1px] px-[6px] gap-1 ustify-end"
            >
              <div className="!w-3 !h-3 justify-end">
                <svg
                  data-v-05616da6=""
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="clipboard"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="svg-inline--fa fa-clipboard"
                >
                  <path
                    data-v-05616da6=""
                    fill="currentColor"
                    d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"
                    class=""
                  ></path>
                </svg>
              </div>
              Sao chép
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-3 text-sm">
          <button className="bg-slate-500 text-white hover:bg-slate-600 rounded py-2 min-h-[53px]">
            TÔI ĐÃ CHUYỂN KHOẢN
          </button>
          {copySuccess && <p className="text-green-600">Copy successful!</p>}

          <button className="hover:bg-[#e2e6ea] rounded py-1 min-h-[35px]">
            Hủy giao dịch
          </button>
          <p className="text-[#d70018] font-semibold text-center">
            Hotline hỗ trợ: <a href="tel:18002097">1800.2097</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankTransferInfo;
