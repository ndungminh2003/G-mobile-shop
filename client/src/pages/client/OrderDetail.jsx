import { useEffect, useState } from "react";
import Address from "../../assets/icons/address.svg";
import User from "../../assets/icons/user.svg";
import Card from "../../assets/icons/card.svg";
import Icon1 from "../../assets/icons/icon1.svg";
import Icon2 from "../../assets/icons/icon2.svg";
import Icon3 from "../../assets/icons/icon3.svg";
import Icon4 from "../../assets/icons/icon4.svg";
import Phone from "../../assets/icons/phone.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, resetOrderState } from "../../features/order/orderSlice";
import { formatNumberWithDots } from "../../utils/formatNumber";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function OrderDetail() {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetOrderState());
    dispatch(getOrderById(param.id));
  }, [dispatch, param.id]);
  let { orderById } = useSelector((state) => state.order);
  orderById = orderById || {
    _id: "",
    products: [],
    paymentIntent: {
      id: "",
      method: "",
      amount: 0,
      status: "",
      created: 0,
      currency: "",
    },
    orderStatus: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    total: 0,
    totalAfterDiscount: 0,
    createdAt: "",
  };

  return (
    <div className=" bg-[#F4F6F8] p-4 rounded-lg">
      <div className="max-w-3xl mx-auto mb-3">
        <div className="flex items-center justify-center">
          <div
            className="res-none flex text-center"
            onClick={() => navigate(-1)}
          >
            <div className="!text-base text-gray-600 justify-start flex items-start font-semibold w-20">
              <ArrowBackIosIcon />
              <h1 className="hover:underline cursor-pointer">Trở về</h1>
            </div>
          </div>
          <p className="font-bold text-[#4A4A4A] text-center w-full text-2xl pr-[35px]">
            Chi tiết đơn hàng
          </p>
        </div>
      </div>
      <div className="flex max-w-3xl mx-auto mb-3">
        <div className="flex-1 text-gray-500">
          Mã đơn hàng:{" "}
          <span className="text-[#303030] font-bold">{orderById._id}</span>
        </div>
        <StatusTag
          title={orderById.orderStatus}
          status={orderById.orderStatus}
        />
      </div>
      <div className="max-w-3xl mx-auto mb-3 text-gray-500 ">
        {moment(orderById.createdAt).format("DD/MM/YYYY HH:mm")}
      </div>
      {orderById.products.map((product) => (
        <div className="flex max-w-3xl my-5 px-5 py-4 mx-auto bg-white rounded-lg">
          <div>
            <img
              width={110}
              height={110}
              src={product.product.thumbnail}
              alt=""
            />
          </div>

          <div className="flex-1 ml-6">
            <div className="text-[#4a4a4a]">{product.product.title}</div>
            <div className="flex justify-between">
              <div className="text-[#8a8a8a] mt-2 border w-fit border-gray-300 rounded-md px-2 d-inline">
                {product.color}
              </div>
              <div className="text-[#000] mt-[10px]">
                Số lượng: <span className="text-red-600">{product.count}</span>
              </div>
            </div>
            <div className="mt-3 font-bold text-red-600">
              {formatNumberWithDots(product.price * product.count)}đ
              <span className="line-through ml-2 font-bold text-[#787878]">
                {formatNumberWithDots(product.price * product.count)}đ
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="p-5 mx-auto rounded-md">
        <div className="flex justify-center">
          <div className="flex">
            <div className="w-[70px]">
              <div className="flex justify-center">
                <img src={Icon1} alt="" />
              </div>
              <div className="text-[#d70018] text-12 mt-[15px] text-center">
                Đặt hàng thành công
              </div>
              <div className="text-[#8a8a8a] text-12 mt-[10px] text-center">
                {moment(orderById.createdAt).format("DD/MM/YYYY HH:mm")}
              </div>
            </div>
            <div className="relative">
              <div className="border-t-[3px] border-dashed absolute left-2 border-red-600 opacity-50 top-6 w-5"></div>
            </div>
          </div>
          <div className="flex ml-[35px]">
            <div className="w-[70px]">
              <div className="flex justify-center opacity-50">
                <img src={Icon2} alt="" />
              </div>
              <div className="text-[#E88994] text-12 mt-[15px] text-center">
                Đã xác nhận
              </div>
            </div>
            <div className="relative">
              <div className="border-t-[3px] border-dashed absolute left-2 border-red-600 opacity-50 top-6 w-5"></div>
            </div>
          </div>
          <div className="flex ml-[35px]">
            <div className="w-[70px]">
              <div className="flex justify-center opacity-50">
                <img src={Icon3} alt="" />
              </div>
              <div className="text-[#E88994] text-12 mt-[15px] text-center">
                Đang vận chuyển
              </div>
            </div>
            <div className="relative">
              <div className="border-t-[3px] border-dashed absolute left-2 border-red-600 opacity-50 top-6 w-5"></div>
            </div>
          </div>
          <div className="flex ml-[35px]">
            <div className="w-[70px]">
              <div className="flex justify-center opacity-50">
                <img src={Icon4} alt="" />
              </div>
              <div className="text-[#E88994] text-12 mt-[15px] text-center">
                Đã giao hàng
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl px-5 py-6 mx-auto bg-white rounded-lg">
        <div className="flex mb-[10px]">
          <div className="mr-[10px]">
            <img src={Card} alt="" />
          </div>
          <div>Thông tin thanh toán</div>
        </div>
        <div className="mb-[10px] flex justify-between text-[#717171]">
          <span>Tổng tiền sản phẩm</span>
          <span>{formatNumberWithDots(orderById.total)}đ</span>
        </div>
        <div className="mb-[10px] flex justify-between text-[#717171]">
          <span>Giảm giá</span>
          <span>
            {formatNumberWithDots(
              orderById.totalAfterDiscount - orderById.total
            )}
            đ
          </span>
        </div>
        <div className="mb-[10px] flex justify-between text-[#717171]">
          <span>Phí vận chuyển</span>
          <span>Miễn phí</span>
        </div>
        <div className="mb-[10px] flex justify-between text-[#717171]">
          <span>Phải thanh toán</span>
          <span className="text-[#4a4a4a] font-bold">
            {formatNumberWithDots(orderById.totalAfterDiscount)}đ
          </span>
        </div>
      </div>

      <div className="max-w-3xl px-5 py-6 mx-auto mt-5 bg-white rounded-lg">
        <div className="flex mb-[10px]">
          <div className="mr-[10px]">
            <img
              height={30}
              width={30}
              src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/Shipper_CPS.png"
              alt=""
            />
          </div>
          <div>Thông tin khách hàng</div>
        </div>

        <div className="flex mb-[10px]">
          <div className="mr-[10px]">
            <img src={User} alt="" />
          </div>
          <div className="text-[#717171]">{orderById.name}</div>
        </div>
        <div className="flex mb-[10px]">
          <div className="mr-[10px]">
            <img src={Phone} alt="" />
          </div>
          <div className="text-[#717171]">{orderById.phone}</div>
        </div>

        <div className="flex mb-[10px]">
          <div className="mr-[10px]">
            <img src={Address} alt="" />
          </div>
          <div className="text-[#717171]">{orderById.address}</div>
        </div>
      </div>
    </div>
  );
}

const StatusTag = ({ title, status }) => {
  const [bgColorStatus, setBgColorStatus] = useState("bg-[#DBDEE1]");
  const [colorStatus, setColorStatus] = useState("text-[#929CA4]");
  const [text, setText] = useState("Đã xác nhận");

  useEffect(() => {
    switch (status) {
      case "Processing": {
        setBgColorStatus("bg-[#3378dc20]");
        setColorStatus("text-[#3378dc]");
        setText("Đang xử lý");
        break;
      }
      case "Completed": {
        setBgColorStatus("bg-[#3aa56620]");
        setColorStatus("text-[#3aa566]");
        setText("Đã hoàn thành");
        break;
      }
      case "Cancelled": {
        setBgColorStatus("bg-[#d42b5220]");
        setColorStatus("text-[#d42d52]");
        setText("Đã hủy");
        break;
      }
      case "Delivering": {
        setBgColorStatus("bg-[#3378dc20]");
        setColorStatus("text-[#3378dc]");
        setText("Đang giao hàng");
        break;
      }
      case "Not Processed": {
        setBgColorStatus("bg-[#d1385a20]");
        setColorStatus("text-[#d1385a]");
        setText("Chưa xử lý");
        break;
      }
      default:
        break;
    }
  }, [status]);

  return (
    <div
      className={`px-2 fit ${bgColorStatus} ${colorStatus} border-gray-300 rounded-md `}
    >
      {text}
    </div>
  );
};

export default OrderDetail;
