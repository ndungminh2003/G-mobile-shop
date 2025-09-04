import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { Layout, Menu, theme } from "antd";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import Badge from "@mui/joy/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const { Header, Sider, Content } = Layout;
const SPLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logout(authState?.user?.email));
    setIsOpen(false);
    navigate("/salesperson-login");
  };
  return (
    <Layout className="admin">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white text-2xl text-center py-3 mb-0">
            <span className="sm-logo">TS</span>
            <span className="lg-logo">Tech Store</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "logout") {
              handleLogout();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard style={{ fontSize: "24px" }} />,
              label: "Dashboard",
            },
            {
              key: "customer-list",
              icon: <AiOutlineUser style={{ fontSize: "24px" }} />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart style={{ fontSize: "24px" }} />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart style={{ fontSize: "24px" }} />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart style={{ fontSize: "24px" }} />,
                  label: "Product List",
                },
              ],
            },
            {
              key: "order-list",
              icon: <FaClipboardList style={{ fontSize: "24px" }} />,
              label: "Orders",
            },
            {
              key: "sales-report",
              icon: <TbReportMoney style={{ fontSize: "24px" }} />,
              label: "Sales Reports",
              children: [
                {
                  key: "report",
                  icon: <TbReportMoney style={{ fontSize: "24px" }} />,
                  label: "Add Report",
                },
                {
                  key: "report-list",
                  icon: <TbReportMoney style={{ fontSize: "24px" }} />,
                  label: "View Reports",
                },
              ],
            },
            // {
            //   key: "enquiries",
            //   icon: <FaClipboardList style={{ fontSize: "24px" }} />,
            //   label: "Enquiries",
            // },
            {
              key: "support",
              icon: <SupportAgentIcon style={{ fontSize: "24px" }} />,
              label: "Support",
            },

            {
              key: "logout",
              icon: <RiLogoutBoxRLine style={{ fontSize: "24px" }} />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="flex justify-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="flex gap-4 items-center">
            <div className=" cursor-pointer">
              <Badge badgeContent={3}>
                <NotificationsNoneIcon />
              </Badge>
            </div>

            <div
              onClick={handleOnClick}
              className="flex gap-3 items-center cursor-pointer relative "
            >
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>

              <div class=" flex flex-col mr-8 ">
                <h5 class="mb-0 font-bold">Hoang Anh</h5>
                <p class="mb-0">Salesperson</p>
              </div>

              {isOpen && (
                <div className=" absolute left-0 z-50 top-10 float-left py-2 mt-1 text-base bg-white border border-gray-300 rounded w-full">
                  <div className=" flex flex-col p-1 ml-2 w-4/5 gap-4">
                    <div className=" w-full cursor-pointer ">
                      <Link to="/">View Profile</Link>
                    </div>

                    <div
                      className=" w-full cursor-pointer  "
                      onClick={handleLogout}
                    >
                      Signout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default SPLayout;
