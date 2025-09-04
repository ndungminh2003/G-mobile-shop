import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const createOrder = async (order) => {
  let config = get_config();
  const response = await axios.post(
    `${base_url}user/cart/cash-order`,
    order,
    config
  );

  return response.data;
};

const updatePaymentStatus = async (updateData) => {
  let config = get_config();
  const response = await axios.put(
    `${base_url}user/order/update-payment/${updateData.id}`,
    updateData,
    config
  );
  return response.data;
};

const updateOrderStatus = async (updateData) => {
  let config = get_config();
  const response = await axios.put(
    `${base_url}order/update-order-status/${updateData.id}`,
    updateData,
    config
  );
  return response.data;
};

const updateOrder = async (updateData) => {
  let config = get_config();
  const response = await axios.put(
    `${base_url}order/update-order/${updateData._id}`,
    updateData,
    config
  );
  return response.data;
};

const getOrderById = async (id) => {
  let config = get_config();
  const response = await axios.get(`${base_url}order/get-order/${id}`, config);
  return response.data;
};

const getOrderByUserId = async () => {
  let config = get_config();
  const response = await axios.get(`${base_url}order/get-user-order`, config);
  return response.data;
};

const getAllOrders = async () => {
  let config = get_config();
  const response = await axios.get(`${base_url}order/get-all-orders`, config);
  return response.data;
};

const deleteOrder = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${base_url}order/${id}`, config);
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
