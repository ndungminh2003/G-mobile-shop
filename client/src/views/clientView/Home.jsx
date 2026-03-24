import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import ListCardProduct from "../../components/ListCardProduct";
import { useDispatch, useSelector } from "react-redux";
import Widget from "../../components/Widget";
import SkeletonProduct from "../../components/SkeletonProduct";

import {
  getLimitProducts,
  resetState,
} from "../../features/product/productSlice";
import { getCategoryBrands } from "../../features/pcategory/pcategorySlice";
export default function Home() {
  const dispatch = useDispatch();
  let { products, isLoading, isSuccess, isError } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(resetState());
    let params = {
      // limit: 200,
      // skip: 130,
    };
    dispatch(getCategoryBrands());
    dispatch(getLimitProducts(params));
  }, []);
  let productsPhone = products.filter(
    (product) => product.category === "Phone"
  );
  let productsLaptop = products.filter(
    (product) => product.category === "Laptop"
  );
  let productsWatch = products.filter(
    (product) => product.category === "Watch"
  );
  let productsTablet = products.filter(
    (product) => product.category === "Tablet"
  );
  let productsHeadphone = products.filter(
    (product) => product.category === "Headphone"
  );
  let productsTV = products.filter((product) => product.category === "TV");
  let productsScreenPC = products.filter(
    (product) => product.category === "ScreenPC"
  );
  return (
    <div className=" flex flex-col gap-6">
      <Banner />
      {isLoading ? (
        <div className=" flex flex-col gap-6">
          <SkeletonProduct type={"PHONE"} />
          <SkeletonProduct type={"LAPTOP"} />
          <SkeletonProduct type={"WATCH"} />
          <SkeletonProduct type={"TABLET"} />
          <SkeletonProduct type={"HEAD PHONE"} />
          <SkeletonProduct type={"TV"} />
          <SkeletonProduct type={"SCREEN PC"} />
        </div>
      ) : (
        <div className=" flex flex-col gap-6">
          <ListCardProduct type={"PHONE"} productState={productsPhone} />
          <ListCardProduct type={"LAPTOP"} productState={productsLaptop} />
          <ListCardProduct type={"WATCH"} productState={productsWatch} />
          <ListCardProduct type={"TABLET"} productState={productsTablet} />
          <ListCardProduct
            type={"HEADPHONE"}
            productState={productsHeadphone}
          />
          <ListCardProduct type={"TV"} productState={productsTV} />
          <ListCardProduct type={"SCREENPC"} productState={productsScreenPC} />
        </div>
      )}

      <Widget />
    </div>
  );
}
