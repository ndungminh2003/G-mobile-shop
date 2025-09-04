import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${base_url}user/register`, user);

  return response.data;
};

const logout = async (email) => {
  const response = await axios.post(
    `${base_url}user/logout`,
    { email },
    { withCredentials: true }
  );
  localStorage.removeItem("cart");
  localStorage.removeItem("order");
  localStorage.removeItem("user");
  return response.data;
};

const refreshToken = async () => {
  const response = await axios.post(`${base_url}user/refresh`, {
    withCredentials: true,
  });
  return response.data;
};

const sendOTP = async (email) => {
  console.log("services", email);
  const response = await axios.post(`${base_url}user/send-otp`, email);
  return response.data;
};

const verifyOTP = async (email, otp) => {
  console.log("services", {
    email,
    otp,
  });
  const response = await axios.post(`${base_url}user/verify-otp`, {
    email,
    otp,
  });
  return response.data;
};

const deleteNotVerified = async (id) => {
  const response = await axios.delete(
    `${base_url}user/delete-is-not-verified/${id}`
  );

  return response.data;
};

const changePassword = async (data) => {
  const response = await axios.put(`${base_url}user/change-password`, data);
  return response.data;
};

const addToWishlist = async (prodId) => {
  let config = get_config();
  const response = await axios.put(
    `${base_url}product/wishlist`,
    prodId,
    config
  );

  return response.data;
};

const updateProfile = async (data) => {
  let config = get_config();
  const response = await axios.put(
    `${base_url}user/edit-profile`,
    data,
    config
  );
  return response.data;
};

const adminForgotPassword = async (email) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    email
  );
  return response.data;
};

const adminResetPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    data
  );
  return response.data;
};

const authService = {
  login,
  logout,
  register,
  refreshToken,
  sendOTP,
  verifyOTP,
  deleteNotVerified,
  changePassword,
  addToWishlist,
  updateProfile,
  adminForgotPassword,
  adminResetPassword,
};

export default authService;
