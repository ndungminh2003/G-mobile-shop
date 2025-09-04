import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import WatchIcon from "@mui/icons-material/Watch";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import DevicesIcon from "@mui/icons-material/Devices";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { resetProductState } from "../features/product/productSlice";

export default function Banner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { categoryBrands } = useSelector((state) => state.pCategory);
  categoryBrands = categoryBrands || [
    { _id: "Phone", brands: [] },
    { _id: "Tablet", brands: [] },
    { _id: "Laptop", brands: [] },
    { _id: "Headphone", brands: [] },
    { _id: "Watch", brands: [] },
    { _id: "ScreenPC", brands: [] },
    { _id: "TV", brands: [] },
  ];
  const catalog = [
    {
      id: 1,
      type: "Phone",
      icon: <PhoneIphoneIcon />,

      brands: {
        title: "Chọn theo hãng",
        brand: [
          ...categoryBrands.filter((item) => item._id === "Phone")[0].brands,
          "Xem thêm tất cả Điện Thoại",
        ],
      },

      price: {
        title: "Mức giá điện thoại",
        range: [
          "Dưới 5 triệu VND",
          "Từ 5 tới 10 triệu VND",
          "Từ 10 tới 15 triệu VND",
          "Trên 15 triệu VND",
        ],
      },

      hot: {
        title: "Hot",
        product: [
          "iPhone 14 Pro Max",
          "Galaxy S23 Ultra 256GB",
          "Galaxy Z Fold4",
          "Galaxy Z Flip4",
          "Vivo X80 Pro",
          "Xiaomi Redmi Note 12 8GB 128GB",
          "OPPO Find N2 Flip",
        ],
      },
    },

    {
      id: 2,
      type: "Tablet",
      icon: <TabletMacIcon />,

      brands: {
        title: "Chọn theo hãng",
        brand: [
          ...categoryBrands.filter((item) => item._id === "Tablet")[0].brands,
          "Xem thêm tất cả Máy Tính Bảng",
        ],
      },

      price: {
        title: "Mức giá Tablet",
        range: [
          "Dưới 10 triệu VND",
          "Từ 10 tới 15 triệu VND",
          "Từ 15 tới 20 triệu VND",
          "Trên 20 triệu VND",
        ],
      },

      hot: {
        title: "Hot",
        product: [
          "iPad Gen 10",
          "iPad mini 6",
          "Galaxy Tab S8",
          "iPad Air 5",
          "Xiaomi Pad 5",
        ],
      },
    },

    {
      id: 3,
      type: "Laptop",
      icon: <LaptopMacIcon />,

      brands: {
        title: "Chọn theo hãng",
        brand: [
          ...categoryBrands.filter((item) => item._id === "Laptop")[0].brands,
          "Xem thêm tất cả Laptop",
        ],
      },

      price: {
        title: "Mức giá laptop",
        range: [
          "Dưới 15 triệu VND",
          "Từ 15 tới 20 triệu VND",
          "Từ 20 tới 25 triệu VND",
          "Trên 25 triệu VND",
        ],
      },

      hot: {
        title: "Hot",
        product: [
          "Macbook Pro M2 2022",
          "Macbook Pro M1",
          "Macbook Air M2",
          "Lenovo Gaming Legion 5",
          "Laptop Asus Rog",
          "MSI Gaming GF63",
          "VivoBook",
        ],
      },
    },

    {
      id: 4,
      type: "Headphone",
      icon: <HeadphonesIcon />,

      brands: {
        title: "Hãng tai nghe",
        brand: [
          ...categoryBrands.filter((item) => item._id === "Headphone")[0]
            .brands,
          "Xem thêm tất cả Tai Nghe",
        ],
      },

      price: {
        title: "Mức giá tai nghe",
        range: [
          "Dưới 1 triệu VND",
          "Từ 1 tới 3 triệu VND",
          "Từ 3 tới 5 triệu VND",
          "Trên 5 triệu VND",
        ],
      },

      hot: {
        title: "Hot",
        product: [
          "AirPods 3",
          "Galaxy Buds2 Pro",
          "AirPods Pro",
          "Sony WH-CH520",
          "Marshall Minor 3",
          "True Wireless JBL",
        ],
      },
    },

    {
      id: 5,
      type: "Watch",
      icon: <WatchIcon />,

      brands: {
        title: "Chọn theo hãng",
        brand: [
          ...categoryBrands.filter((item) => item._id === "Watch")[0].brands,
          "Xem thêm tất cả Đồng Hồ",
        ],
      },

      price: {
        title: "Mức giá đồng hồ",
        range: [
          "Dưới 2 triệu VND",
          "Từ 2 tới 5 triệu VND",
          "Từ 5 tới 10 triệu VND",
          "Trên 10 triệu VND",
        ],
      },

      hot: {
        title: "Hot",
        product: [
          "Apple Watch Series 8",
          "Apple Watch SE",
          "Samsung Galaxy Watch6",
          "Samsung Galaxy Watch5",
          "Garmin Forerunner 55",
          "Xiaomi Watch S1 Pro",
          "Huawei Watch GT3",
        ],
      },
    },

    {
      id: 6,
      type: "ScreenPC",
      icon: <DevicesIcon />,

      brands: {
        title: "Chọn theo hãng",
        brand: [
          ...categoryBrands.filter((item) => item._id === "ScreenPC")[0].brands,
          "Xem thêm tất cả Màn Hình",
        ],
      },

      price: {
        title: "Mức giá PC",
        range: [
          "Dưới 5 triệu VND",
          "Từ 5 tới 10 triệu VND",
          "Từ 10 tới 15 triệu VND",
          "Trên 15 triệu VND",
        ],
      },

      hot: {
        title: "Hot",
        product: [
          "Màn hình ASUS ProArt",
          "Màn hình Gaming Gigabyte G24F",
          "Màn hình Gaming LG UltraGear",
          "Màn hình LG Ultrawide",
          "Màn hình Xiaomi 27 inch",
          "Màn hình cong MSI Pro 34 inch",
        ],
      },
    },

    {
      id: 7,
      type: "TV",
      icon: <ConnectedTvIcon />,

      brands: {
        title: "Chọn theo hãng",
        brand: [
          ...categoryBrands.filter((item) => item._id === "TV")[0].brands,
          "Xem thêm tất cả Tivi",
        ],
      },

      price: {
        title: "Mức giá Tivi",
        range: [
          "Từ 9 tới 12 triệu VND",
          "Từ 12 tới 15 triệu VND",
          "Trên 15 triệu VND",
        ],
      },

      hot: {
        title: "Hot",
        product: [
          "Smart Tivi Khung Tranh The Frame 4K Samsung",
          "Smart Tivi Samsung QLED",
          "Smart Google Tivi Coocaa 4K 70 inch",
          "Android Tivi Xiaomi A2 58 inch",
          "Android Tivi Xiaomi A2 43 inch",
          "Smart Tivi LG 4K 43 inch",
          "Tivi Coocaa 4K 70 inch",
          "Google Tivi Coocaa 4K 55 inch",
        ],
      },
    },
  ];

  const slides = [
    {
      url:
        "https://fptshop.com.vn/Uploads/originals/2023/6/16/638225012888439267_1920x1080.png",
      alt: "iphone 14",
    },
    {
      url:
        "https://cdn.dienthoaigiakho.vn/photos/1644641693487-s22ultr-info.jpg",
      alt: "samsung",
    },
  ];

  const [hoveredElement, setHoveredElement] = useState(null);

  const handleMouseOver = (c) => {
    setHoveredElement(c);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  function extractRange(inputString) {
    const numberPattern = /\d+(\.\d+)?/g;
    const values = inputString.match(numberPattern);
    if (inputString.includes("Dưới")) {
      return [0, parseFloat(values[0])];
    } else if (inputString.includes("Trên")) {
      return [parseFloat(values[0]), 1000]; // Assuming a large upper limit
    } else if (inputString.includes("Từ")) {
      return [parseFloat(values[0]), parseFloat(values[1])];
    }

    return [];
  }

  const handleClick = (params) => {
    let param = "?";
    Object.entries(params).forEach(([key, value]) => {
      if (key === "brand" && value.includes("Xem thêm tất cả")) return;
      param += `${key}=${value}&`;
    });
    dispatch(resetProductState());
    navigate(`/catalog/${param}`);
  };

  const handleHotClick = (product) => {
    navigate(`/search-product/?keyword=${product}`);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrentIndex((currentIndex) => {
        if (currentIndex === slides.length - 1) {
          return 0;
        } else {
          return currentIndex + 1;
        }
      });
    }, 5000);

    return () => {
      clearTimeout(id);
    };
  }, [currentIndex]);

  const prevSlide = () => {
    const isFristSlide = currentIndex === 0;
    const newIndex = isFristSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className=" container mx-auto flex gap-2 justify-between ">
      <div
        id="catalog"
        className=" relative flex flex-col gap-1 w-60 border-2 rounded-3xl ml-2 mt-4 shadow-lg shadow-gray-400 min-w-max h-fit xxsm:hidden xsm:hidden sm:hidden md:hidden "
      >
        {catalog.map((c) => (
          <div
            key={c.id}
            onMouseMove={() => handleMouseOver(c)}
            onMouseOut={handleMouseLeave}
            className=" flex items-center justify-between p-2 cursor-pointer hover:bg-gray-300 hover:rounded-3xl hover:px-2 "
          >
            <div>
              <span>{c.icon}</span>
              <span className=" ml-1">{c.type}</span>
            </div>
            <NavigateNextIcon />
          </div>
        ))}

        {hoveredElement && (
          <div
            onMouseMove={() => handleMouseOver(hoveredElement)}
            onMouseOut={handleMouseLeave}
            className=" absolute w-[84rem] xl:w-[68rem] lg:w-[52rem] md:w-[38rem] h-fit bg-slate-100 left-full rounded-xl z-40"
          >
            <div className=" flex justify-around p-2 md:gap-8">
              <div className=" flex flex-col gap-2 text-lg">
                <div className=" font-bold text-xl">
                  {hoveredElement.brands.title}
                </div>
                {hoveredElement.brands.brand.map((b, index) => (
                  <div
                    key={index}
                    className=" cursor-pointer text-gray-600 hover:text-red-500"
                    onClick={() =>
                      handleClick({ brand: b, category: hoveredElement.type })
                    }
                  >
                    {b}
                  </div>
                ))}
              </div>
              <div className=" flex flex-col gap-2 text-lg">
                <div className=" font-bold text-xl">
                  {hoveredElement.price.title}
                </div>
                {hoveredElement.price.range.map((b, index) => (
                  <div
                    key={index}
                    className=" cursor-pointer text-gray-600 hover:text-red-500"
                    onClick={() =>
                      handleClick({
                        "price[gte]": extractRange(b)[0] * 1000000,
                        "price[lte]": extractRange(b)[1] * 1000000,
                        category: hoveredElement.type,
                      })
                    }
                  >
                    {b}
                  </div>
                ))}
              </div>

              <div className=" flex flex-col gap-2 text-lg ">
                <div className=" flex font-bold text-xl items-center gap-1">
                  {hoveredElement.hot.title}
                  <LocalFireDepartmentIcon sx={{ color: "red" }} />
                </div>
                {hoveredElement.hot.product.map((b, index) => (
                  <div
                    key={index}
                    onClick={() => handleHotClick(b)}
                    className=" cursor-pointer text-gray-600 hover:text-red-500"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className=" flex mt-4 p-1 border-4 rounded-3xl h-[35rem] w-[55rem] shadow-lg shadow-gray-400 xxsm:h-[15rem] xsm:h-[25rem] sm:h-[26rem] md:h-[30rem] lg:h-[28rem] xl:h-[30rem]">
        <div className=" relative w-full h-full p-1">
          <img
            src={slides[currentIndex].url}
            alt=""
            className=" rounded-xl w-full h-full object-fit duration-500 "
          />
          <ArrowBackIosIcon
            sx={{ width: 35, height: 35 }}
            onClick={prevSlide}
            className=" absolute top-1/2  translate-x-[0] tranlate-y-[-50%] cursor-pointer p-2 bg-black/20 text-white left-5 text-xl rounded-full"
          />
          <ArrowForwardIosIcon
            sx={{ width: 35, height: 35 }}
            onClick={nextSlide}
            className=" absolute top-1/2  translate-x-[0] tranlate-y-[-50%] cursor-pointer p-2 bg-black/20 text-white right-5 text-xl rounded-full"
          />
        </div>
      </div>

      <div className=" flex flex-col mt-4 py-1 px-1 gap-3 w-[24rem] h-64 xxsm:hidden xsm:hidden sm:hidden md:hidden lg:hidden">
        <img
          src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/s21-fe-right-banner-th7.png"
          alt=""
          className=" rounded-3xl cursor-pointer "
        />
        <img
          src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/ipadth7-new.png"
          alt=""
          className=" rounded-3xl cursor-pointer  "
        />
        <img
          src="https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/asus%20tuf.jpg"
          alt=""
          className=" rounded-3xl cursor-pointer "
        />
      </div>
    </div>
  );
}
