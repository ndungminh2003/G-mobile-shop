import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

export default function User() {
  let { user } = useSelector((state) => state.auth);

  return (
    <div className=" flex p-4 container mx-auto">
      <div className=" flex flex-col gap-10 w-1/6 min-w-[15rem] xxsm:hidden xsm:hidden sm:hidden">
        <div className=" flex gap-2 text-lg items-center">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className=" cursor-pointer"
            sx={{ width: 80, height: 80 }}
          />
          <div className=" flex flex-col items-center">
            <span className=" font-bold">{user.name}</span>
          </div>
        </div>

        <div className=" flex flex-col gap-4">
          <NavLink to="/user/edit">
            <div className=" flex gap-2 items-center cursor-pointer text-lg bg-slate-400 rounded-xl w-30 h-10 hover:bg-slate-500 hover:duration-300 hover:text-lime-950 w-5/6">
              <PermContactCalendarIcon className=" ml-2" />
              <span>Edit thông tin</span>
            </div>
          </NavLink>

          <NavLink to="/user/order">
            <div className=" flex gap-2 items-center cursor-pointer text-lg bg-slate-400 rounded-xl h-10 hover:bg-slate-500 hover:duration-300 hover:text-lime-950 w-5/6">
              <EventNoteIcon className=" ml-2" />
              <span>Lịch sử mua hàng</span>
            </div>
          </NavLink>

          <NavLink to="/contact">
            <div className=" flex gap-2 items-center cursor-pointer text-lg bg-slate-400 rounded-xl w-30 h-10 hover:bg-slate-500 hover:duration-300 hover:text-lime-950 w-5/6">
              <SupportAgentIcon className=" ml-2" />
              <span>Liên hệ hỗ trợ</span>
            </div>
          </NavLink>
        </div>
      </div>

      <div className=" w-full">
        <Outlet />
      </div>
    </div>
  );
}
