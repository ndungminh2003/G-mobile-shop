import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CallIcon from "@mui/icons-material/Call";
import NotesIcon from "@mui/icons-material/Notes";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import DropDown from "./DropDown";
import useAuth from "../hook/useAuth";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import WatchIcon from "@mui/icons-material/Watch";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import DevicesIcon from "@mui/icons-material/Devices";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getCategoryBrands } from "../features/pcategory/pcategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { resetProductState } from "../features/product/productSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  let { user } = useAuth();
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

  function extractRange(inputString) {
    const numberPattern = /\d+(\.\d+)?/g;
    const values = inputString.match(numberPattern);
    let result;
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

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
    if (isOpen === false) {
      // Create the overlay element
      const overlay = document.createElement("div");
      overlay.id = "overlay";

      // Apply styles to the overlay
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.53)";
      overlay.style.zIndex = "45";

      // Add the overlay to the body
      document.body.appendChild(overlay);
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } else {
      // Remove the overlay when isOpen is true
      const overlay = document.getElementById("overlay"); // Assuming the overlay is the first div added to the body
      if (overlay) {
        overlay.remove();
      }
    }
  };

  const [hoveredElement, setHoveredElement] = useState(null);
  const updateQuantityFromLocalStorage = (event) => {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    const newQuantity = cart ? cart.totalQuantity : 0;
    setQuantity(newQuantity);
  };
  useEffect(() => {
    window.addEventListener("storage", updateQuantityFromLocalStorage);
    dispatch(getCategoryBrands());
    return () => {
      window.removeEventListener("storage", updateQuantityFromLocalStorage);
    };
  }, []);

  const handleMouseOver = (c) => {
    setHoveredElement(c);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  return (
    <div className=" w-full bg-slate-800 sticky top-0 z-50">
      <div className=" relative container mx-auto flex h-17 justify-around items-center ">
        <Link to="/">
          <div className=" w-52 flex items-center justify-center xxsm:w-28 xsm:w-32 sm:w-36 md:w-40 lg:w-44">
            <img src="/logo/big.png" alt="logo" className=" object-fill" />
          </div>
        </Link>

        <div onClick={handleOnClick} className="">
          <div className=" flex gap-2 items-center p-4 cursor-pointer capitalize text-lg min-w-fit hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white xxsm:hidden xsm:hidden sm:hidden md:hidden ">
            <NotesIcon />
            <span>Danh mục</span>
          </div>

          {isOpen ? (
            <div
              id="catalog"
              className=" absolute left-0 top-[70px] flex flex-col gap-1 w-60 border-2 rounded-3xl ml-2 mt-8 shadow-lg shadow-gray-400 min-w-max h-fit xxsm:hidden xsm:hidden sm:hidden z-50 bg-white"
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
                            handleClick({
                              brand: b,
                              category: hoveredElement.type,
                            })
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
                          className=" cursor-pointer text-gray-600 hover:text-red-500"
                          key={index}
                          onClick={() => handleHotClick(b)}
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        <SearchBar />

        <Link to="/cart">
          <div className="flex gap-2 items-center p-4 cursor-pointer capitalize text-lg xxsm:text-lg xsm:text-sm sm:text-lg md:text-lg xsm:flex-col hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white min-w-fit xxsm:hidden">
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartIcon color="white" />
            </Badge>
            <div>Giỏ hàng</div>
          </div>
        </Link>

        <Link to="/wishlist">
          <div className=" flex gap-2 items-center p-4 cursor-pointer capitalize text-lg hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white xxsm:hidden xsm:hidden sm:hidden md:hidden lg:hidden">
            <FavoriteIcon />
            <span>Yêu thích</span>
          </div>
        </Link>

        <Link to="/contact">
          <div className=" flex gap-2 items-center p-4 cursor-pointer capitalize text-lg hover:bg-gray-500 hover:rounded-lg hover:py-4 text-white xxsm:hidden xsm:hidden sm:hidden md:hidden lg:hidden xl:hidden">
            <CallIcon />
            <span>Liên hệ</span>
          </div>
        </Link>

        <DropDown user={user} />
      </div>
    </div>
  );
}
