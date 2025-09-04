import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PaymentIcon from "@mui/icons-material/Payment";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function DropDown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(props?.user || { name: "Guest" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (props?.user !== undefined && props?.user !== null) {
      console.log("props?.user", props?.user);
      let user = props?.user;
      user = {
        ...user,
        name: user?.name.split(" ")[0],
      };
      setUser(user);
    } else {
      setUser({ name: "Guest" });
    }
  }, [props?.user]);

  const handleLogout = () => {
    dispatch(logout(user?.email));
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className=" relative">
      <div
        onClick={handleOnClick}
        className="flex items-center gap-2 p-4 text-lg text-white capitalize cursor-pointer hover:bg-gray-500 hover:rounded-lg xxsm:hidden xsm:text-sm"
      >
        <AccountCircleIcon />
        <span>{user?.name}</span>
        {isOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </div>

      {isOpen && user?.role !== undefined ? (
        <div className=" flex flex-col gap-2 p-2 w-[130%] xsm:w-[100%] sm:w-[100%] rounded-xl absolute top-16 bg-slate-100 shadow-lg shadow-gray-300">
          <Link to="/user/edit" onClick={handleOnClick}>
            <div className="flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg">
              <ManageAccountsIcon />
              <span>Tài khoản</span>
            </div>
          </Link>

          <Link to="/user/order" onClick={handleOnClick}>
            <div className="flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg">
              <PaymentIcon />
              <span>Đơn hàng</span>
            </div>
          </Link>

          <Link to="/" onClick={handleLogout}>
            <div className="flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg">
              <LogoutIcon />
              <span>Đăng xuất</span>
            </div>
          </Link>
        </div>
      ) : (
        isOpen && (
          <div className="  flex flex-col gap-2 p-2 w-[130%] xsm:w-[100%] sm:w-[100%] rounded-xl absolute top-16 bg-slate-100 shadow-lg shadow-gray-300">
            <Link to="/login" onClick={handleOnClick}>
              <div className="flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg">
                <LoginIcon />
                <span>Đăng nhập</span>
              </div>
            </Link>
            <Link to="/register" onClick={handleOnClick}>
              <div className="flex items-center gap-1 p-2 text-lg cursor-pointer  xsm:text-sm sm:text-sm hover:bg-gray-300 hover:rounded-lg">
                <AppRegistrationIcon />
                <span>Đăng kí</span>
              </div>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
