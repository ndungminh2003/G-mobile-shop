import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/style/res.scss";

export default function CardProduct() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className="res">
      <div className="res-header flex items-center justify-center  max-w-[700px] m-auto my-5">
        <div
          className="py-[10px] flex w-full text-center"
          onClick={() => navigate("/")}
        >
          <div className="res-back !text-base text-[#d70018] justify-start flex items-center font-semibold">
            <ArrowBackIosIcon />
            <h1 className="hover:underline cursor-pointer">Trở về</h1>
          </div>

          <h1 className="res-center text-lg text-[#d70018] font-semibold justify-center m-auto pr-[70px]">
            Giỏ hàng
          </h1>
          <div className="res-user">
            <AccountCircle />
            <p className="text-[12px]">User</p>
          </div>
        </div>
      </div>
    </div>
  );
}
