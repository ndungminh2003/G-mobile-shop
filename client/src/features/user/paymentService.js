import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

export const getUrl = async ({ info, amount }) => {
  const response = await axios.post(`${BASE_URL}payment/urlpayment`, {
    amount,
    info,
  });
  console.log("payment server", response);
  return response.data;
};

export const validatePayment = async (search) => {
  const response = await axios.get(`${BASE_URL}payment/validate${search}`);
  return response.data;
};
