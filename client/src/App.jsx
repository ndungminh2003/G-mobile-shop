import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React from "react";

// client
import Layout from "./components/Layout";
import Home from "./views/clientView/Home";
import Contact from "./views/clientView/Contact";
import ProductView from "./views/clientView/Productview";
import Catalog from "./views/clientView/Catalog";
import Cart from "./views/clientView/Cart";
import PaymentInfo from "./views/clientView/PaymentInfor";
import Voucher from "./views/clientView/Voucher";
import Payment from "./views/clientView/Payment";
import PaymentSuccess from "./views/clientView/PaymentSuccess";
import PaymentFailed from "./views/clientView/PaymentFailed";
import WishList from "./views/clientView/WishList";
import RestorePassword from "./views/clientView/RestorePassword";
import Otp from "./views/clientView/Otp";
import RegisteredOTP from "./views/clientView/RegisteredOTP";
import CatalogSearch from "./views/clientView/CatalogSearch";
import CreateNewPassword from "./views/clientView/CreateNewPassword";
import Purchase from "./views/clientView/Purchase";
import Login from "./views/clientView/Login";
import Register from "./views/clientView/Register";
import User from "./views/clientView/User";
import Edit from "./views/clientView/EditProfile";
import UserHome from "./views/clientView/UserHome";
import PageNotFound from "./views/clientView/PageNotFound";
import OrderDetail from "./views/clientView/OrderDetail";

// admin
import AddCustomer from "./views/adminView/AddCustomer";
import AddSalesperson from "./views/adminView/AddSalesperson";
import SalespersonList from "./views/adminView/SalespersonList";
import Dashboard from "./views/adminView/Dashboard";
import CustomerList from "./views/adminView/CustomerList";
import AddProduct from "./views/adminView/AddProduct";
import ProductList from "./views/adminView/ProductList";
import AddCategory from "./views/adminView/AddCategory";
import CategoryList from "./views/adminView/CategoryList";
import AddBrand from "./views/adminView/AddBrand";
import BrandList from "./views/adminView/BrandList";
import AddColor from "./views/adminView/AddColor";
import ColorList from "./views/adminView/ColorList";
import AddCoupon from "./views/adminView/AddCoupon";
import CouponList from "./views/adminView/CouponList";
import Orders from "./views/adminView/Orders";
import ForgotPassword from "./views/adminView/ForgotPassword";
import ResetPassword from "./views/adminView/ResetPassword";
import AdminLogin from "./views/adminView/Login";
import AdminLayout from "./components/AdminLayout";
import CustomerDetails from "./views/adminView/CustomerDetails";
import EditOrder from "./views/adminView/EditOrder";
import ReportList from "./views/adminView/SalesReportList";
// salesperson
import SPLayout from "./components/SPLayout";
import SPDashboard from "./views/salespersonView/Dashboard";
import SPAddCustomer from "./views/salespersonView/AddCustomer";
import SPCustomerList from "./views/salespersonView/CustomerList";
import SPAddProduct from "./views/salespersonView/AddProduct";
import SPProductList from "./views/salespersonView/ProductList";
import SPOrders from "./views/salespersonView/Orders";
import SPLogin from "./views/salespersonView/Login";
import SPAddReport from "./views/salespersonView/AddSalesReport";
import SPReportList from "./views/salespersonView/SalesReportList";
import ChatSupport from "./views/salespersonView/ChatEngine";
import SPResetPassword from "./views/salespersonView/ResetPassword";
import SPForgotPassword from "./views/salespersonView/ForgotPassword";
// protected route
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RequireAuth allowedRoles="" />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product-view/:slug" element={<ProductView />} />
          <Route path="search-product" element={<CatalogSearch />} />
          <Route path="contact" element={<Contact />} />
          <Route element={<RequireAuth allowedRoles="user" />}>
            <Route path="wishlist" element={<WishList />} />
            <Route path="/user" element={<User />}>
              <Route index element={<UserHome />} />
              <Route path="order" element={<Purchase />} />
              <Route path="order/:id" element={<OrderDetail />} />
              <Route path="edit" element={<Edit />} />
            </Route>
          </Route>
          <Route path="catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/payment-info" element={<PaymentInfo />} />
          <Route path="/cart/payment" element={<Payment />} />
          <Route path="/cart/payment/success" element={<PaymentSuccess />} />
          <Route path="/cart/payment/failed" element={<PaymentFailed />} />
          <Route path="/cart/voucher" element={<Voucher />} />
          <Route path="forgot-password-otp" element={<Otp />} />
          <Route path="otp" element={<RegisteredOTP />} />
          <Route path="forgot-password" element={<RestorePassword />} />
          <Route path="change-password" element={<CreateNewPassword />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>

      {/*Page not found*/}
      <Route path="*" Component={PageNotFound} />

      <Route path="login" element={<Login />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />
      <Route path="/salesperson-login" element={<SPLogin />} />
      <Route
        path="/salesperson/forgot-password"
        element={<SPForgotPassword />}
      />
      <Route path="/salesperson/reset-password" element={<SPResetPassword />} />
      <Route element={<RequireAuth allowedRoles="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customer" element={<AddCustomer />} />
          <Route path="customer/:id" element={<AddCustomer />} />
          <Route path="customer-list" element={<CustomerList />} />
          {/* <Route path="customer" element={<CustomerDetails />} /> */}
          <Route path="salesperson" element={<AddSalesperson />} />
          <Route path="salesperson/:id" element={<AddSalesperson />} />
          <Route path="list-salesperson" element={<SalespersonList />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />
          <Route path="list-product" element={<ProductList />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="list-brand" element={<BrandList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="list-color" element={<ColorList />} />
          <Route path="coupon-list" element={<CouponList />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="order-list" element={<Orders />} />
          <Route path="order/edit-order/:id" element={<EditOrder />} />
          <Route path="order/:id" element={<EditOrder />} />
          <Route path="report-list/" element={<ReportList />} />
        </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles="salesperson" />}>
        <Route path="/salesperson" element={<SPLayout />}>
          <Route index element={<SPDashboard />} />
          <Route path="customer" element={<SPAddCustomer />} />
          <Route path="customer/:id" element={<SPAddCustomer />} />
          <Route path="customer-list" element={<SPCustomerList />} />
          {/* <Route path="customer" element={<CustomerDetails />} /> */}
          <Route path="product" element={<SPAddProduct />} />
          <Route path="product/:id" element={<SPAddProduct />} />
          <Route path="list-product" element={<SPProductList />} />
          <Route path="order/edit-order/:id" element={<EditOrder />} />
          <Route path="order-list" element={<SPOrders />} />
          <Route path="order/:id" element={<EditOrder />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="report-list/" element={<SPReportList />} />
          <Route path="report/" element={<SPAddReport />} />
          <Route path="report/:id" element={<SPAddReport />} />
          <Route path="support" element={<ChatSupport />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
