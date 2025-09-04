import { Rating, Stack, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "../../assets/style/BoxReview.scss";
import { rating } from "../../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
const BoxReview = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const { productBySlug } = useSelector((state) => state.product);
  const prodId = productBySlug._id;
  const [rateArr, setRateArr] = useState([0, 0, 0, 0, 0]);
  useEffect(() => {
    const arr = [0, 0, 0, 0, 0];
    productBySlug.ratings.map((rate) => {
      arr[rate.star - 1] += 1;
    });
    setRateArr(arr);
  }, [productBySlug.ratings]);
  const handleRatingSubmit = async () => {
    try {
      if (!user?._id) {
        toast.info("Vui lòng đăng nhập tài khoản để đánh giá !");
      }

      if (prodId && star && comment) {
        dispatch(rating({ prodId, comment, star }));
        setComment("");
        setStar(0);
      } else {
        toast.info("Vui lòng đánh giá sản phẩm");
      }
    } catch (error) {
      // Handle error
      console.error("Error updating rating:", error);
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    width: 340,
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#D7000E" : "#308fe8",
    },
  }));
  return (
    <div className="box-review p-2 shadow-cellphone rounded-[10px]">
      <h1 className="text-[#363636] mb-6 text-base font-semibold">
        Đánh giá & nhận xét {productBySlug.title} | Chính hãng VN/A
      </h1>
      <div className="flex items-center border border-[#e5e7eb] rounded-2xl p-2">
        <div className="w-[40%] text-center border-r border-[#e5e7eb]">
          <p className="text-[#363636] text-2xl font-semibold">
            {productBySlug.totalrating}.0/5
          </p>
          <Rating
            readOnly
            value={productBySlug.totalrating}
            className="!text-base"
          />
          <p>
            <strong>{productBySlug.ratings.length}</strong> đánh giá và nhận xét
          </p>
        </div>
        <div className="w-[60%] pl-5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-[#4a4a4a] font-bold text-sm">5</h1>
              <StarIcon className="!fill-[#f59e0b] !text-base" />
            </div>
            <div>
              <BorderLinearProgress
                variant="determinate"
                value={(rateArr[4] / productBySlug.ratings.length) * 100}
              />
            </div>
            <span className="text-xs text-[#4a4a4a]">
              {rateArr[4]} đánh giá
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-[#4a4a4a] font-bold text-sm min-w-[10px]">
                4
              </h1>
              <StarIcon className="!fill-[#f59e0b] !text-base" />
            </div>
            <div>
              <BorderLinearProgress
                variant="determinate"
                value={(rateArr[3] / productBySlug.ratings.length) * 100}
              />
            </div>
            <span className="text-xs text-[#4a4a4a]">
              {rateArr[3]} đánh giá
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-[#4a4a4a] font-bold text-sm min-w-[10px]">
                3
              </h1>
              <StarIcon className="!fill-[#f59e0b] !text-base" />
            </div>
            <div>
              <BorderLinearProgress
                variant="determinate"
                value={(rateArr[2] / productBySlug.ratings.length) * 100}
              />
            </div>
            <span className="text-xs text-[#4a4a4a]">
              {rateArr[2]} đánh giá
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-[#4a4a4a] font-bold text-sm min-w-[10px]">
                2
              </h1>
              <StarIcon className="!fill-[#f59e0b] !text-base" />
            </div>
            <div>
              <BorderLinearProgress
                variant="determinate"
                value={(rateArr[1] / productBySlug.ratings.length) * 100}
              />
            </div>
            <span className="text-xs text-[#4a4a4a]">
              {rateArr[1]} đánh giá
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-[#4a4a4a] font-bold text-sm min-w-[10px]">
                1
              </h1>
              <StarIcon className="!fill-[#f59e0b] !text-base" />
            </div>
            <div>
              <BorderLinearProgress
                variant="determinate"
                value={(rateArr[0] / productBySlug.ratings.length) * 100}
              />
            </div>
            <span className="text-xs text-[#4a4a4a]">
              {rateArr[0]} đánh giá
            </span>
          </div>
        </div>
      </div>
      {/* <p className="text-center my-2">Bạn đánh giá sao sản phẩm này</p>
      <div className="text-center">
        <button className="bg-[#d7000e] w-[300px] text-white rounded-[10px] py-2">
          Đánh giá ngay
        </button>
      </div> */}

      <div className="mt-2">
        {productBySlug.ratings.map((rate) => (
          <div className="mb-4">
            <div className="flex justify-between items-center ">
              <div className="flex items-center gap-2">
                <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                  {rate.postedby.name[0]}
                </p>
                <span className="text-[#4a4a4a] font-semibold text-sm">
                  {rate.postedby.name}
                </span>
              </div>
              <p className="text-[#707070] text-xs font-semibold">
                {moment(rate.createdAt).format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
            <div className="ml-10 my-2 p-2 text-xs">
              <div className="flex items-center">
                <strong className="text-[#363636]">Đánh giá: </strong>
                <Rating value={rate.star} readOnly className="!text-base" />
              </div>
              <div>
                <p className="my-1">
                  <strong className="text-[#363636]">Nhận xét : </strong>
                  {rate.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="mb-4">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                N
              </p>
              <span className="text-[#4a4a4a] font-semibold text-sm">
                Nguyễn Văn Nam PH 1 5 6 1 9
              </span>
            </div>
            <p className="text-[#707070] text-xs font-semibold">
              20/7/2023 23:13
            </p>
          </div>
          <div className="ml-10 my-2 p-2 text-xs">
            <div className="flex items-center">
              <strong className="text-[#363636]">Đánh giá: </strong>
              <Rating value={5} readOnly className="!text-base" />
            </div>
            <div>
              <p className="my-1">
                <strong className="text-[#363636]">Nhận xét : </strong>
                Sản phẩm xịn quá
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                T
              </p>
              <span className="text-[#4a4a4a] font-semibold text-sm">
                Thanh Tran
              </span>
            </div>
            <p className="text-[#707070] text-xs font-semibold">
              10/4/2023 10:19
            </p>
          </div>
          <div className="ml-10 my-2 p-2 text-xs">
            <div className="flex items-center">
              <strong className="text-[#363636]">Đánh giá: </strong>
              <Rating value={5} readOnly className="!text-base" />
            </div>
            <div>
              <p className="my-1">
                <strong className="text-[#363636]">Nhận xét : </strong>
                Sản phẩm xịn quá
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                H
              </p>
              <span className="text-[#4a4a4a] font-semibold text-sm">
                Hà Minh Tâm
              </span>
            </div>
            <p className="text-[#707070] text-xs font-semibold">
              29/12/2022 19:07
            </p>
          </div>
          <div className="ml-10 my-2 p-2 text-xs">
            <div className="flex items-center">
              <strong className="text-[#363636]">Đánh giá: </strong>
              <Rating value={5} readOnly className="!text-base" />
            </div>
            <div>
              <p className="my-1">
                <strong className="text-[#363636]">Nhận xét : </strong>
                Cho mình hỏi mã thanh toán moca còn đc áp dụng ko
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
              <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                L
              </p>
              <span className="text-[#4a4a4a] font-semibold text-sm">
                Lâm Hữu Phát
              </span>
            </div>
            <p className="text-[#707070] text-xs font-semibold">
              20/7/2023 23:13
            </p>
          </div>
          <div className="ml-10 my-2 p-2 text-xs">
            <div className="flex items-center">
              <strong className="text-[#363636]">Đánh giá: </strong>
              <Rating value={5} readOnly className="!text-base" />
            </div>
            <div>
              <p className="my-1">
                <strong className="text-[#363636]">Nhận xét : </strong>
                Đã mua, chuẩn chính hãng
              </p>
            </div>
          </div>
        </div> */}
      </div>

      <div className="text-center">
        <a
          href=""
          className="py-1 shadow-cellphone w-[300px] block m-auto rounded-[10px] border border-[#ccc]"
        >
          Xem thêm
          <KeyboardArrowDownIcon />
        </a>
      </div>

      <div>
        <div>
          <p className="mb-1 text-xl text-[#363636] font-semibold">Đánh giá</p>
          <div>
            <Rating
              name="product-rating"
              value={star}
              onChange={(event, newValue) => {
                setStar(newValue);
              }}
            />
          </div>
          <div className="flex gap-2">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Nhập nhận xét của bạn về sản phẩm này"
              className="w-[calc(100%-80px)] p-3 border border-[#ccc] outline-none h-32 shadow-cellphone rounded-[15px] text-[#363636] text-sm"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              // className="bg-[#d7000e] text-white flex items-center justify-center gap-1 py-[7px]  rounded-lg w-[70px] !h-10"
              className="bg-[#d7000e] text-white flex items-center justify-center gap-1 py-[7px]  rounded-lg w-[70px] !h-10 hover:cursor-pointer"
              onClick={handleRatingSubmit}
            >
              <svg
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-white w-4 h-4 text-base"
              >
                <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path>
              </svg>
              Gửi
            </button>
          </div>
        </div>
        {/* <div>
          <div>
            <div className="flex items-center justify-between my-[10px]">
              <div className="flex items-center gap-2">
                <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                  C
                </p>
                <span className="text-[#4a4a4a] font-semibold text-sm">
                  Chung Duc
                </span>
              </div>
              <div className="text-[#4a4a4a]  font-semibold text-xs flex items-center gap-1">
                <AccessTimeIcon className="!text-base" />3 ngày trước
              </div>
            </div>
            <div className="ml-6 p-[10px] shadow-cellphone rounded-lg border border-gray-200">
              <div>
                <p>Cáp sạc theo máy là bn w hả ad?</p>
              </div>
              <div>
                <button
                  type=""
                  className="flex items-center text-[#d70018] text-sm ml-auto"
                >
                  <QuestionAnswerIcon className="fill-[#d70018] !text-sm" />
                  Trả lời
                </button>
              </div>
            </div>

            <div className="ml-[25px] mt-5">
              <div className="list">
                <div className="item">
                  <div className="flex items-center justify-between my-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[25px] h-[25px]">
                        <svg
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="25"
                            height="25"
                            fill="url(#pattern111)"
                          ></rect>{" "}
                          <defs>
                            <pattern
                              id="pattern111"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0_119_16"
                                transform="scale(0.00333333)"
                              ></use>
                            </pattern>{" "}
                            <image
                              id="image0_119_16"
                              width="300"
                              height="300"
                              xlinkHref="data:image/png;base64,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"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <span className="text-[#4a4a4a] font-semibold text-sm">
                        Quản trị viên
                      </span>
                      <span className="py-[2px] px-[6px] rounded-md bg-red-600 text-white text-[10px]">
                        QTV
                      </span>
                    </div>
                    <div className="text-[#4a4a4a]  font-semibold text-xs flex items-center gap-1">
                      <AccessTimeIcon className="!text-base" />3 ngày trước
                    </div>
                  </div>

                  <div className="ml-6 p-[10px] shadow-cellphone rounded-lg border border-gray-200">
                    <div className="text-[13px] text-[#4a4a4a]">
                      <div>Dạ Cellphones xin chào anh Chung Duc</div>
                      <div>
                        Samsung Galaxy S22 Ultra (8GB - 128GB) giá hiện tại
                        17.990.000 ( HN ) , bên trong hộp có dây sạc kèm theo
                        máy , công suất dây sạc hãng chưa công bố thông tin nên
                        hiện shop chưa có thông tin cụ thể ạ
                      </div>
                      <div>
                        Mình ở khu vực tỉnh thành nào , em kiểm tra và hỗ trợ
                        mình đặt hàng ạ
                      </div>
                      <div>Thân mến</div>
                    </div>
                    <div>
                      <button
                        type=""
                        className="flex items-center text-[#d70018] text-sm ml-auto"
                      >
                        <QuestionAnswerIcon className="fill-[#d70018] !text-sm" />
                        Trả lời
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between my-[10px]">
              <div className="flex items-center gap-2">
                <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                  N
                </p>
                <span className="text-[#4a4a4a] font-semibold text-sm">
                  Nhật Tuấn
                </span>
              </div>
              <div className="text-[#4a4a4a]  font-semibold text-xs flex items-center gap-1">
                <AccessTimeIcon className="!text-base" />3 ngày trước
              </div>
            </div>
            <div className="ml-6 p-[10px] shadow-cellphone rounded-lg border border-gray-200">
              <div>
                <p>
                  Mua gói bảo hành rơi vỡ thì khi bị rơi muốn đổi máy khác ram
                  cao hơn có cần trả thêm nhiều k ạ
                </p>
              </div>
              <div>
                <button
                  type=""
                  className="flex items-center text-[#d70018] text-sm ml-auto"
                >
                  <QuestionAnswerIcon className="fill-[#d70018] !text-sm" />
                  Trả lời
                </button>
              </div>
            </div>

            <div className="ml-[25px] mt-5">
              <div className="list">
                <div className="item">
                  <div className="flex items-center justify-between my-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[25px] h-[25px]">
                        <svg
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="25"
                            height="25"
                            fill="url(#pattern111)"
                          ></rect>{" "}
                          <defs>
                            <pattern
                              id="pattern111"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0_119_16"
                                transform="scale(0.00333333)"
                              ></use>
                            </pattern>{" "}
                            <image
                              id="image0_119_16"
                              width="300"
                              height="300"
                              xlinkHref="data:image/png;base64,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"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <span className="text-[#4a4a4a] font-semibold text-sm">
                        Quản trị viên
                      </span>
                      <span className="py-[2px] px-[6px] rounded-md bg-red-600 text-white text-[10px]">
                        QTV
                      </span>
                    </div>
                    <div className="text-[#4a4a4a]  font-semibold text-xs flex items-center gap-1">
                      <AccessTimeIcon className="!text-base" />3 ngày trước
                    </div>
                  </div>

                  <div className="ml-6 p-[10px] shadow-cellphone rounded-lg border border-gray-200">
                    <div className="text-[13px] text-[#4a4a4a]">
                      <div>Cellphones Xin Chào Anh Nhật Tuấn!</div>
                      <div>
                        Tên sản phẩm: SAMSUNG GALAXY S22 ULTRA 8GB 128GB
                      </div>
                      <div>
                        Loại 1: Máy hoạt động bình thường, màn đẹp, thân máy
                        đẹp.
                      </div>
                      <div>
                        Dạ Em gửi Giá tham khảo ,mình mang máy đến cửa hàng để
                        thẩm định dựa trên tình hình thực tế sản phẩm nhé!
                      </div>
                      <div>
                        Không biết mình muốn đổi sang dòng máy nào để em tiện
                        kiểm tra giá cần thêm nhé
                      </div>
                      <div>Mong nhận được phản hồi từ mình</div>
                      <div>Thân mến</div>
                    </div>
                    <div>
                      <button
                        type=""
                        className="flex items-center text-[#d70018] text-sm ml-auto"
                      >
                        <QuestionAnswerIcon className="fill-[#d70018] !text-sm" />
                        Trả lời
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between my-[10px]">
              <div className="flex items-center gap-2">
                <p className="text-[#1e1619] font-semibold w-[25px] h-[25px] bg-[#ddd] text-center rounded-[5px]">
                  C
                </p>
                <span className="text-[#4a4a4a] font-semibold text-sm">
                  Chung Duc
                </span>
              </div>
              <div className="text-[#4a4a4a]  font-semibold text-xs flex items-center gap-1">
                <AccessTimeIcon className="!text-base" />3 ngày trước
              </div>
            </div>
            <div className="ml-6 p-[10px] shadow-cellphone rounded-lg border border-gray-200">
              <div>
                <p>Cáp sạc theo máy là bn w hả ad?</p>
              </div>
              <div>
                <button
                  type=""
                  className="flex items-center text-[#d70018] text-sm ml-auto"
                >
                  <QuestionAnswerIcon className="fill-[#d70018] !text-sm" />
                  Trả lời
                </button>
              </div>
            </div>

            <div className="ml-[25px] mt-5">
              <div className="list">
                <div className="item">
                  <div className="flex items-center justify-between my-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[25px] h-[25px]">
                        <svg
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="25"
                            height="25"
                            fill="url(#pattern111)"
                          ></rect>{" "}
                          <defs>
                            <pattern
                              id="pattern111"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0_119_16"
                                transform="scale(0.00333333)"
                              ></use>
                            </pattern>{" "}
                            <image
                              id="image0_119_16"
                              width="300"
                              height="300"
                              xlinkHref="data:image/png;base64,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"
                            ></image>
                          </defs>
                        </svg>
                      </div>
                      <span className="text-[#4a4a4a] font-semibold text-sm">
                        Quản trị viên
                      </span>
                      <span className="py-[2px] px-[6px] rounded-md bg-red-600 text-white text-[10px]">
                        QTV
                      </span>
                    </div>
                    <div className="text-[#4a4a4a]  font-semibold text-xs flex items-center gap-1">
                      <AccessTimeIcon className="!text-base" />3 ngày trước
                    </div>
                  </div>

                  <div className="ml-6 p-[10px] shadow-cellphone rounded-lg border border-gray-200">
                    <div className="text-[13px] text-[#4a4a4a]">
                      <div>Dạ Cellphones xin chào anh Chung Duc</div>
                      <div>
                        Samsung Galaxy S22 Ultra (8GB - 128GB) giá hiện tại
                        17.990.000 ( HN ) , bên trong hộp có dây sạc kèm theo
                        máy , công suất dây sạc hãng chưa công bố thông tin nên
                        hiện shop chưa có thông tin cụ thể ạ
                      </div>
                      <div>
                        Mình ở khu vực tỉnh thành nào , em kiểm tra và hỗ trợ
                        mình đặt hàng ạ
                      </div>
                      <div>Thân mến</div>
                    </div>
                    <div>
                      <button
                        type=""
                        className="flex items-center text-[#d70018] text-sm ml-auto"
                      >
                        <QuestionAnswerIcon className="fill-[#d70018] !text-sm" />
                        Trả lời
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div> */}

        {/* <div className="text-center mt-[15px]">
          <a
            href=""
            className="py-1 shadow-cellphone w-[300px] block m-auto rounded-[10px] border border-[#ccc]"
          >
            Xem thêm 949 bình luận
            <KeyboardArrowDownIcon />
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default BoxReview;
