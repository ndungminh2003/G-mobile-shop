import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { BASE_URL } from "../../utils/baseUrl";

const createOrder = async (order) => {
  let config = get_config();
  const response = await axios.post(
    `${BASE_URL}user/cart/cash-order`,
    order,
    config
  );

  return response.data;
};

const updatePaymentStatus = async (updateData) => {
  let config = get_config();
  const response = await axios.put(
    `${BASE_URL}user/order/update-payment/${updateData.id}`,
    updateData,
    config
  );
  return response.data;
};

const updateOrderStatus = async (updateData) => {
  let config = get_config();
  const response = await axios.put(
    `${BASE_URL}order/update-order-status/${updateData.id}`,
    updateData,
    config
  );
  return response.data;
};

const updateOrder = async (updateData) => {
  let config = get_config();
  const response = await axios.put(
    `${BASE_URL}order/update-order/${updateData._id}`,
    updateData,
    config
  );
  return response.data;
};

const getOrderById = async (id) => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}order/get-order/${id}`, config);
  return response.data;
};

const getOrderByUserId = async () => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}order/get-user-order`, config);
  return response.data;
};

const getAllOrders = async () => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}order/get-all-orders`, config);
  return response.data;
};

const deleteOrder = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${BASE_URL}order/${id}`, config);
  return response.data;
};

const orderService = {
  createOrder,
  updatePaymentStatus,
  updateOrderStatus,
  updateOrder,
  getOrderById,
  getOrderByUserId,
  getAllOrders,
  deleteOrder,
};

export default orderService;
