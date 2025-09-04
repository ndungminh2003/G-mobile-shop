import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Style = {
  border: "solid 2 ",
  borderRadius: 4,
  boxShadow: "-1px 1px 5px 0px rgba(128,128,128,1)",
  margin: 0.5,
  height: "411px",
  width: "350px",
};

const brands = [
  {
    name: "Apple",
  },
  {
    name: "Samsung",
  },
  {
    name: "Oppo",
  },
  {
    name: "Xiaomi",
  },
  {
    name: "Vivo",
  },
  {
    name: "Nokia",
  },
];

export default function SkeletonProduct(props) {
  return (
    <div className=" flex flex-col container mx-auto justify-between gap-2">
      <div className=" flex gap-4 justify-between px-4 py-2 xxsm:flex-col xsm:flex-col sm:flex-col md:flex-col ">
        <h1 className=" font-bold text-3xl text-gray-500">{props.type}</h1>
        <div className=" flex gap-5 xxsm:hidden xsm:gap-4 sm:gap-4 md:gap-4 ">
          {brands.map((brand, index) => (
            <span
              key={index}
              className=" cursor-pointer bg-slate-200 p-4 rounded-xl hover:bg-slate-400 duration-300"
            >
              {brand.name}
            </span>
          ))}
          <span className=" cursor-pointer bg-slate-200 p-4 rounded-xl hover:bg-slate-400 duration-300 xsm:hidden sm:hidden">
            All
          </span>
        </div>
      </div>

      <div className=" flex justify-between">
        <Card sx={Style} className=" p-3 flex flex-col gap-2">
          <div className=" flex justify-center mt-4">
            <Skeleton
              variant="rectangular"
              width={270}
              height={220}
              animation="wave"
              className=" rounded-xl"
            />
          </div>

          <div className=" flex flex-col gap-1">
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="rectangular" width={210} height={30} />

            <div className=" flex justify-end mt-10">
              <Skeleton variant="rectangular" width={140} height={15} />
            </div>
          </div>
        </Card>

        <Card sx={Style} className=" p-3 flex flex-col gap-2 xxsm:hidden">
          <div className=" flex justify-center mt-4">
            <Skeleton
              variant="rectangular"
              width={270}
              height={220}
              animation="wave"
              className=" rounded-xl"
            />
          </div>

          <div className=" flex flex-col gap-1">
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="rectangular" width={210} height={30} />

            <div className=" flex justify-end mt-10">
              <Skeleton variant="rectangular" width={140} height={15} />
            </div>
          </div>
        </Card>

        <Card
          sx={Style}
          className=" p-3 flex flex-col gap-2 xxsm:hidden xsm:hidden sm:hidden"
        >
          <div className=" flex justify-center mt-4">
            <Skeleton
              variant="rectangular"
              width={270}
              height={220}
              animation="wave"
              className=" rounded-xl"
            />
          </div>

          <div className=" flex flex-col gap-1">
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="rectangular" width={210} height={30} />

            <div className=" flex justify-end mt-10">
              <Skeleton variant="rectangular" width={140} height={15} />
            </div>
          </div>
        </Card>

        <Card
          sx={Style}
          className=" p-3 flex flex-col gap-2 xxsm:hidden xsm:hidden sm:hidden md:hidden lg:hidden"
        >
          <div className=" flex justify-center mt-4">
            <Skeleton
              variant="rectangular"
              width={270}
              height={220}
              animation="wave"
              className=" rounded-xl"
            />
          </div>

          <div className=" flex flex-col gap-1">
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="rectangular" width={210} height={30} />

            <div className=" flex justify-end mt-10">
              <Skeleton variant="rectangular" width={140} height={15} />
            </div>
          </div>
        </Card>

        <Card
          sx={Style}
          className=" p-3 flex flex-col gap-2 xxsm:hidden xsm:hidden sm:hidden md:hidden lg:hidden xl:hidden"
        >
          <div className=" flex justify-center mt-4">
            <Skeleton
              variant="rectangular"
              width={270}
              height={220}
              animation="wave"
              className=" rounded-xl"
            />
          </div>

          <div className=" flex flex-col gap-1">
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="rectangular" width={210} height={30} />

            <div className=" flex justify-end mt-10">
              <Skeleton variant="rectangular" width={140} height={15} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
