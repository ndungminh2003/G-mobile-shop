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
import Home from "./pages/client/Home";
import Contact from "./pages/client/Contact";
import ProductView from "./pages/client/Productview";
import Catalog from "./pages/client/Catalog";
import Cart from "./pages/client/Cart";
import PaymentInfo from "./pages/client/PaymentInfor";
import Voucher from "./pages/client/Voucher";
import Payment from "./pages/client/Payment";
import PaymentSuccess from "./pages/client/PaymentSuccess";
import PaymentFailed from "./pages/client/PaymentFailed";
import WishList from "./pages/client/WishList";
import RestorePassword from "./pages/client/RestorePassword";
import Otp from "./pages/client/Otp";
import RegisteredOTP from "./pages/client/RegisteredOTP";
import CatalogSearch from "./pages/client/CatalogSearch";
import CreateNewPassword from "./pages/client/CreateNewPassword";
import Purchase from "./pages/client/Purchase";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import User from "./pages/client/User";
import Edit from "./pages/client/EditProfile";
import UserHome from "./pages/client/UserHome";
import PageNotFound from "./pages/client/PageNotFound";
import OrderDetail from "./pages/client/OrderDetail";

// admin
import AddCustomer from "./pages/admin/AddCustomer";
import AddSalesperson from "./pages/admin/AddSalesperson";
import SalespersonList from "./pages/admin/SalespersonList";
import Dashboard from "./pages/admin/Dashboard";
import CustomerList from "./pages/admin/CustomerList";
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import AddCategory from "./pages/admin/AddCategory";
import CategoryList from "./pages/admin/CategoryList";
import AddBrand from "./pages/admin/AddBrand";
import BrandList from "./pages/admin/BrandList";
import AddColor from "./pages/admin/AddColor";
import ColorList from "./pages/admin/ColorList";
import AddCoupon from "./pages/admin/AddCoupon";
import CouponList from "./pages/admin/CouponList";
import Orders from "./pages/admin/Orders";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/AdminLayout";
import CustomerDetails from "./pages/admin/CustomerDetails";
import EditOrder from "./pages/admin/EditOrder";
import ReportList from "./pages/admin/SalesReportList";
// salesperson
import SPLayout from "./components/SPLayout";
import SPDashboard from "./pages/salesperson/Dashboard";
import SPAddCustomer from "./pages/salesperson/AddCustomer";
import SPCustomerList from "./pages/salesperson/CustomerList";
import SPAddProduct from "./pages/salesperson/AddProduct";
import SPProductList from "./pages/salesperson/ProductList";
import SPOrders from "./pages/salesperson/Orders";
import SPLogin from "./pages/salesperson/Login";
import SPAddReport from "./pages/salesperson/AddSalesReport";
import SPReportList from "./pages/salesperson/SalesReportList";
import ChatSupport from "./pages/salesperson/ChatEngine";
import SPResetPassword from "./pages/salesperson/ResetPassword";
import SPForgotPassword from "./pages/salesperson/ForgotPassword";
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
