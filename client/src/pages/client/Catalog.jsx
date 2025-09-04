import React, { useState, useEffect } from "react";
import CardProduct from "../../components/CardProduct";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProductByCatalog } from "../../features/product/productSlice";
import RangeSlider from "../../components/RangeSlider";
import MoneyIcon from "@mui/icons-material/Money";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Checkbox from "@mui/material/Checkbox";
import { Pagination } from "antd";
export default function Catalog() {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = location.search;
  const { products, totalProducts, page, limit } = useSelector(
    (state) => state.product
  );
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [size, setSize] = useState(limit || 10);
  const [sortedProducts, setSortedProducts] = useState(products || []);
  const sortLowToHigh = () => {
    const sorted = [...(sortedProducts || [])].sort(
      (a, b) => a.price - b.price
    );
    setSortedProducts(sorted);
  };

  const sortHighToLow = () => {
    const sorted = [...(sortedProducts || [])].sort(
      (a, b) => b.price - a.price
    );
    setSortedProducts(sorted);
  };
  useEffect(() => {
    setSortedProducts(products || []);
  }, [products]);

  useEffect(() => {
    dispatch(getProductByCatalog(param + `page=${currentPage}&limit=${size}`));
  }, [param]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const [isOpen1, setIsOpen1] = useState(false);

  const handleOnClick1 = () => {
    setIsOpen1((prev) => !prev);
  };

  const findMaxPrice = () => {
    let max = 0;
    products?.forEach((product) => {
      if (product.price > max) {
        max = product.price;
      }
    });
    max = Math.ceil(max / 1000000) * 1000000 + 1000000;
    return max;
  };

  const findColorArray = () => {
    let colorArray = [];
    products?.forEach((product) => {
      product.color.forEach((color) => {
        if (!colorArray.includes(color)) {
          colorArray.push(color);
        }
      });
    });
    colorArray.push("Tất cả");
    return colorArray;
  };

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(findMaxPrice());
  const [color, setColor] = useState("Tất cả");
  const [filterArray, setFilterArray] = useState([0, 0]);
  const [isFiltered, setIsFiltered] = useState(false);
  useEffect(() => {
    if (isFiltered) {
      let filtered = [...(products || [])];
      if (filterArray[0] === 1 && color !== "Tất cả") {
        filtered = filtered.filter((product) => product.color.includes(color));
      }
      if (filterArray[1] === 1) {
        filtered = filtered.filter(
          (product) => product.price >= minValue && product.price <= maxValue
        );
      }
      setSortedProducts(filtered);
    }
  }, [isFiltered, filterArray]);

  const handleColorClick = (color) => {
    setColor(color);
    setIsFiltered(true);
    setIsOpen1(false);
    setFilterArray([1, filterArray[1]]);
  };

  const handleShowSizeChange = (current, size) => {
    setSize(size);
    setCurrentPage(1);
    dispatch(getProductByCatalog(param + `page=${currentPage}&limit=${size}`));
  };
  return (
    <div className=" flex flex-col m-6 container mx-auto gap-4">
      {/* {products?.totalProducts === 0 ? (
        <span className="flex justify-center text-xl text-red-500 font-bold">
          Error: No products found for the keyword{" "}
          <b className="mx-1">'{products?.keyword}'</b>
        </span>
      ) : (
        <span className="flex justify-center text-xl text-gray-500">
          Found <b className="mx-1">{products?.totalProducts}</b> products for
          the keyword <b className="mx-1">'{products?.keyword}'</b>
        </span>
      )} */}
      <div className=" flex flex-col gap-5">
        <div className="flex flex-col gap-2 ml-8">
          <div className=" text-3xl text-gray-500 font-bold">Bộ lọc</div>
          <div>
            <div className=" flex gap-1 cursor-pointer">
              <Checkbox
                checked={filterArray[0] === 1}
                className=" relative"
                onChange={() =>
                  setFilterArray([filterArray[0] === 1 ? 0 : 1, filterArray[1]])
                }
              />
              <div className=" relative">
                <p
                  className=" flex justify-center items-center bg-slate-300 p-3 hover:bg-slate-400 hover:duration-200 rounded-xl gap-2"
                  onClick={handleOnClick1}
                >
                  <ColorLensIcon sx={{ color: "blue" }} />
                  Màu sắc
                </p>
                {isOpen1 ? (
                  <div className=" absolute z-40 ">
                    <div className=" flex w-fit gap-4 bg-white shadow-xl shadow-slate-600 rounded-lg px-6 py-4 justify-around">
                      {findColorArray().map((color) => (
                        <div
                          className=" cursor-pointer bg-slate-200 p-3 rounded-md capitalize flex items-center justify-center w-20 h-16 hover:bg-slate-400"
                          onClick={() => {
                            handleColorClick(color);
                          }}
                        >
                          {color}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Checkbox
                checked={filterArray[1] === 1}
                onChange={() =>
                  setFilterArray([filterArray[0], filterArray[1] === 1 ? 0 : 1])
                }
                className=" relative"
              />
              <div className=" relative">
                <p
                  className=" flex justify-center items-center bg-slate-300 p-3 hover:bg-slate-400 hover:duration-200 rounded-xl gap-2"
                  onClick={handleOnClick}
                >
                  <MoneyIcon sx={{ color: "blue" }} />
                  Giá
                </p>

                {isOpen ? (
                  <div className=" absolute z-40 ">
                    <RangeSlider
                      minValue={minValue}
                      maxValue={maxValue}
                      setMinValue={(minValue) => setMinValue(minValue)}
                      setMaxValue={(maxValue) => setMaxValue(maxValue)}
                      setIsFiltered={(isFiltered) => setIsFiltered(isFiltered)}
                      setFilterArray={(filterArray) =>
                        setFilterArray(filterArray)
                      }
                      min={0}
                      max={findMaxPrice()}
                      step={100000}
                      priceCap={1000}
                      setIsOpen={(isOpen) => setIsOpen(isOpen)}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 ml-8">
          <div className=" text-3xl text-gray-500 font-bold">Sắp xếp theo</div>
          <div>
            <div className=" flex gap-5 cursor-pointer">
              <p
                className=" flex justify-center items-center bg-slate-300 p-3 hover:bg-slate-400 hover:duration-200 rounded-xl gap-2"
                onClick={sortHighToLow}
              >
                <KeyboardDoubleArrowUpIcon sx={{ color: "blue" }} />
                Giá cao
              </p>
              <p
                className=" flex justify-center items-center bg-slate-300 p-3 hover:bg-slate-400 hover:duration-200 rounded-xl gap-2"
                onClick={sortLowToHigh}
              >
                <KeyboardDoubleArrowDownIcon sx={{ color: "blue" }} />
                Giá thấp
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-row p-4 flex-wrap gap-5">
        {sortedProducts.map((product) => (
          <div className=" w-[284px] xl:w-[296px] lg:w-[316px] md:w-[358px] sm:w-[294px] xsm:w-[270px]">
            <CardProduct
              key={product._id}
              id={product._id}
              name={product.title}
              price={product.price}
              brand={product.brand}
              color={product.color}
              feature={product.feature}
              thumbnail={product.thumbnail}
              description={product.description}
              slug={product.slug}
              totalrating={product.totalrating}
            />
          </div>
        ))}
      </div>
      <Pagination
        className="flex justify-center"
        current={currentPage}
        total={totalProducts || 0}
        showTotal={(total) => `Total ${total} items`}
        pageSize={size}
        showSizeChanger
        onShowSizeChange={handleShowSizeChange}
        showQuickJumper
        onChange={(page) => {
          setCurrentPage(page);
          dispatch(
            getProductByCatalog(param + `page=${currentPage}&limit=${size}`)
          );
        }}
      />
    </div>
  );
}
