import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatNumberWithDots } from "../utils/formatNumber";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/auth/authSlice";

const Style = {
  border: "solid 2 ",
  borderRadius: 4,
  boxShadow: "-1px 1px 5px 0px rgba(128,128,128,1)",
  margin: 0.5,
  height: "450px",
};

export default function CardProduct(props) {
  const dispatch = useDispatch();
  const [isVisibleShoppingCart, setVisibleShoppingCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavoriteClick, setIsFavoriteClick] = useState(false);
  const handleMouseOver = () => {
    setVisibleShoppingCart(true);
  };

  const handleMouseLeave = () => {
    setVisibleShoppingCart(false);
  };

  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(
    props.thumbnail ||
      "https://res.cloudinary.com/dqwdvpi4d/image/upload/v1691639790/default-product-image-removebg-preview_p3g0jy.png"
  );

  useEffect(() => {
    if (props.thumbnail === undefined) {
      setThumbnail(
        "https://res.cloudinary.com/dqwdvpi4d/image/upload/v1691639790/default-product-image-removebg-preview_p3g0jy.png"
      );
    } else {
      setThumbnail(props.thumbnail);
    }
  }, [props.thumbnail]);

  const handleCardClick = () => {
    navigate(`/product-view/${props.slug}`);
  };
  const handleAddToCart = () => {
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart
      ? JSON.parse(existingCart)
      : { products: [], total: 0, totalQuantity: 0, totalDiscount: 0 };

    const foundIndex = cart.products.findIndex((x) => x._id === props.id);
    if (foundIndex > -1) {
      cart.products[foundIndex].count += 1;
    } else {
      console.log("productToAdd", {
        _id: props.id,
        color: props.color.length > 0 ? props.color[0] : "",
        name: props.name,
        slug: props.slug,
        thumbnail: props.thumbnail,
        feature:
          props?.feature !== undefined &&
          Array.isArray(props.feature) &&
          props.feature.length > 0
            ? props.feature[props.feature.length - 1].name
            : "",
        price: props.price,
        count: 1,
      });
      const productToAdd = {
        _id: props.id,
        color: props.color.length > 0 ? props.color[0] : "",
        name: props.name,
        slug: props.slug,
        thumbnail: props.thumbnail,
        feature:
          props?.feature !== undefined &&
          Array.isArray(props.feature) &&
          props.feature.length > 0
            ? props.feature[props.feature?.length - 1].name
            : "",
        price: props.price,
        count: 1,
      };

      cart.products.push(productToAdd);
    }
    cart.totalQuantity += 1;
    cart.total += props.price;
    toast.success("Thêm vào giỏ hàng thành công");
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };
  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ proId: props.id }));
    setIsFavoriteClick(true);
  };
  const { message, isSuccess, isError, isLoading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (
      isFavoriteClick &&
      !isLoading &&
      isSuccess &&
      message === "Product added to wishlist"
    ) {
      toast.success("Đã thêm vào danh sách yêu thích");
      setIsFavoriteClick(false);

      console.log("isFavorite", props.isFavorite);
    }
    if (
      isFavoriteClick &&
      !isLoading &&
      isSuccess &&
      message === "Product removed from wishlist"
    ) {
      toast.info("Đã xóa khỏi danh sách yêu thích");
      setIsFavoriteClick(false);
    }
    if (isFavoriteClick && !isLoading && isError) {
      toast.error("Thêm vào danh sách yêu thích thất bại");
      setIsFavoriteClick(false);
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <div className=" relative">
      <Card
        sx={Style}
        className="cursor-pointer hover:rounded-2xl hover:duration-75"
      >
        <div className=" flex flex-col gap-2 items-center h-full">
          <div onClick={handleCardClick} className=" hover:scale-110">
            <CardMedia
              sx={{
                width: 180,
                height: 180,
                objectFit: "contain",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 2,
              }}
              image={
                thumbnail ||
                "https://res.cloudinary.com/dqwdvpi4d/image/upload/v1691639790/default-product-image-removebg-preview_p3g0jy.png"
              }
              title="Laptop"
            />
          </div>

          <div
            onClick={handleCardClick}
            className=" flex flex-col justify-center h-[150px] w-[300px] md:w-[250px] lg:w-[330px]"
          >
            <CardContent className=" flex flex-col h-full ">
              <Typography gutterBottom variant="h6" component="div">
                <span className="md:text-sm">{props.name}</span>
              </Typography>
              <div className=" flex flex-col justify-end h-[140px]">
                <div className=" text-red-700 text-2xl">
                  {" "}
                  <span className=" text-lg">
                    {formatNumberWithDots(props.price)} ₫
                  </span>{" "}
                </div>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    value={props.totalrating}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              </div>
            </CardContent>
          </div>

          <div className="flex w-full justify-end p-1 h-full items-end">
            <div>
              <Button
                size="small"
                style={{ textTransform: "none" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleAddToWishlist}
              >
                <span className="text-gray-500 mr-1 text-[16px] md:text-[14px]">
                  Yêu thích
                </span>
                {/* <FavoriteBorderIcon className="!cursor-pointer z-20 text-[#d70018] hover:animate-ping"></FavoriteBorderIcon> */}
                {isHovered || props.isFavorite ? (
                  <FavoriteIcon className="cursor-pointer text-red-600 hover:animate-ping" />
                ) : (
                  <FavoriteBorderIcon className="!cursor-pointer z-20 text-[#d70018] hover:text-red-600 hover:animate-ping" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {isVisibleShoppingCart ? (
        <div
          className="absolute bottom-[-15px] w-[70%] ml-[-10px] rounded-2xl flex gap-5 justify-center p-5"
          onMouseMove={handleMouseOver}
          onMouseOut={handleMouseLeave}
        >
          <div className=" flex items-center cursor-pointer p-1 bg-slate-700 rounded-xl text-white w-44 h-8 justify-center ">
            <button
              onClick={handleAddToCart}
              className=" transition ease-in-out hover:scale-110 duration-300 p-1"
            >
              <span className=" text-[16px] font-medium md:text-[14px]">
                Thêm vào giỏ
              </span>
              <AddShoppingCartIcon sx={{ fontSize: "25px" }} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="absolute bottom-[-15px] w-[70%] ml-[-20px] rounded-2xl flex gap-5 justify-center p-5"
          onMouseMove={handleMouseOver}
          onMouseOut={handleMouseLeave}
        >
          <div className=" flex items-center cursor-pointer p-1 rounded-xl text-white w-44 h-8 justify-center">
            <button className=" transition ease-in-out hover:scale-110 duration-300 p-1 text-gray-500 flex gap-2 items-center">
              <span className=" text-[16px] font-medium md:text-[14px]">
                Thêm vào giỏ
              </span>
              <AddShoppingCartIcon sx={{ fontSize: "25px", color: "black" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
