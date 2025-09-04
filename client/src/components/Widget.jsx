import React from "react";
import { Link } from "react-router-dom";

const accessories = [
  {
    id: 1,
    title: "Nổi bật",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
  },
  {
    id: 2,
    title: "Dán màn hình",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
  },
  {
    id: 3,
    title: "Ốp lưng - Bao da",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-108.svg",
  },
  {
    id: 4,
    title: "Cáp sạc",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-114.svg",
  },
  {
    id: 5,
    title: "Pin dự phòng",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-122.svg",
  },
  {
    id: 6,
    title: "Thiết bị mạng",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-676.svg",
  },
  {
    id: 7,
    title: "Gaming Gear",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg",
  },
  {
    id: 8,
    title: "Gimbal",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-852.svg",
  },
  {
    id: 9,
    title: "USB",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-109.svg",
  },
  {
    id: 10,
    title: "Chuột, bàn phím",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-663.svg",
  },

  {
    id: 11,
    title: "Camera hành trình",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/tmp/catalog/product/i/c/icon_cam_htrinh.png",
  },
  {
    id: 12,
    title: "Camera an ninh",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/tmp/catalog/product/i/c/icon_cam_anninh.png",
  },
  {
    id: 13,
    title: "Phụ kiện laptop",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-44.svg",
  },
  {
    id: 14,
    title: "Ổ cứng di động",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-750.svg",
  },
];

const second_hand = [
  {
    id: 1,
    title: "Điện thoại",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/i/p/ip-14-hp-cu.png",
  },
  {
    id: 2,
    title: "Ipad",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/i/p/ipad-cate-cu.png",
  },
  {
    id: 3,
    title: "Mac",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-392.svg",
  },
  {
    id: 4,
    title: "Laptop",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-878.svg",
  },
  {
    id: 5,
    title: "Smart-watch",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-451.svg",
  },
  {
    id: 6,
    title: "Tai nghe",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/c/a/cate-tai-nghe_1.png",
  },
  {
    id: 7,
    title: "Màn hình máy tính",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/c/a/cate-man-hinh.png",
  },
];

const electronic_computer = [
  {
    id: 1,
    title: "CPU",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/c/p/cpu_1.png",
  },
  {
    id: 2,
    title: "Mainboard",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/m/a/mainboard_1.png",
  },

  {
    id: 3,
    title: "Computer Case",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/c/a/case_1.png",
  },

  {
    id: 4,
    title: "HDD",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/s/s/ssd_2.png",
  },
  {
    id: 5,
    title: "Graphics card",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/v/g/vga.png",
  },
  {
    id: 6,
    title: "Nguồn máy tính",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/p/s/psu.png",
  },
  {
    id: 7,
    title: "Tản nhiệt",
    img:
      "https://cdn2.cellphones.com.vn/150x,webp,q70/media/catalog/product/t/_/t_n_nhi_t_2.png",
  },
];

export default function Widget() {
  return (
    <div className=" flex flex-col gap-4 container mx-auto mb-10">
      <div className=" flex flex-col gap-2">
        <h1 className=" font-bold text-3xl text-gray-500 px-4 py-2 ">
          PHỤ KIỆN
        </h1>
        <div className=" flex flex-wrap gap-7 ml-2">
          {accessories.map((i, index) => (
            <Link
              key={index}
              to="#"
              className=" hover:scale-110 hover:duration-200"
            >
              <div className=" flex flex-col items-center justify-center w-48 h-48 xl:w-44 xl:h-40 lg:w-40 lg:h-44 md:w-36 md:h-36 sm:w-32 sm:h-32 xsm:w-28 xsm:h-28 bg-red-400 rounded-xl cursor-pointer">
                <div className=" text-white text-xl mt-2 md:text-sm sm:text-sm xsm:text-sm">
                  {i.title}
                </div>
                <img
                  src={i.img}
                  alt=""
                  className=" object-fill w-36 h-36 xl:w-36 xl:h-36 lg:w-32 lg:h-32 md:w-32 md:h-32 sm:w-24 sm:h-24 xsm:w-20 xsm:h-20"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className=" flex flex-col gap-2">
        <h1 className=" font-bold text-3xl text-gray-500 px-4 py-2 ">
          LINH KIỆN MÁY TÍNH
        </h1>
        <div className=" flex flex-wrap gap-7 ml-2">
          {electronic_computer.map((i, index) => (
            <Link
              key={index}
              to="#"
              className=" hover:scale-110 hover:duration-200"
            >
              <div className=" flex flex-col items-center justify-center w-48 h-48 xl:w-44 xl:h-40 lg:w-40 lg:h-44 md:w-36 md:h-36 sm:w-32 sm:h-32 xsm:w-28 xsm:h-28 bg-orange-300 rounded-xl cursor-pointer">
                <div className=" text-white text-xl mt-2 md:text-sm sm:text-sm xsm:text-sm">
                  {i.title}
                </div>
                <img
                  src={i.img}
                  alt=""
                  className=" object-fill w-36 h-36 xl:w-36 xl:h-36 lg:w-32 lg:h-32 md:w-32 md:h-32 sm:w-24 sm:h-24 xsm:w-20 xsm:h-20"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className=" flex flex-col gap-2">
        <h1 className=" font-bold text-3xl text-gray-500 px-4 py-2 ">
          HÀNG CŨ
        </h1>
        <div className=" flex flex-wrap gap-7 ml-2">
          {second_hand.map((i, index) => (
            <Link
              key={index}
              to="#"
              className=" hover:scale-110 hover:duration-200"
            >
              <div className=" flex flex-col items-center justify-center w-48 h-48 xl:w-44 xl:h-40 lg:w-40 lg:h-44 md:w-36 md:h-36 sm:w-32 sm:h-32 xsm:w-28 xsm:h-28 bg-sky-300 rounded-xl cursor-pointer">
                <div className=" text-white text-xl mt-2 md:text-sm sm:text-sm xsm:text-sm">
                  {i.title}
                </div>
                <img
                  src={i.img}
                  alt=""
                  className=" object-fill w-36 h-36 xl:w-36 xl:h-36 lg:w-32 lg:h-32 md:w-32 md:h-32 sm:w-24 sm:h-24 xsm:w-20 xsm:h-20"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
