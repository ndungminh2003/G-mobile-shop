import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getCoupons = async () => {
  let config = get_config();
  const response = await axios.get(`${base_url}coupon/`, config);

  return response.data;
};

const applyCoupon = async (coupon) => {
  let config = get_config();
  const response = await axios.post(
    `${base_url}user/cart/applycoupon`,
    coupon,
    config
  );

  return response.data;
};

const createCoupons = async (coupon) => {
  let config = get_config();
  console.log("service data", coupon);
  const response = await axios.post(`${base_url}coupon/`, coupon, config);

  return response.data;
};
const updateCoupon = async (coupon) => {
  let config = get_config();
  console.log("coupon update data", coupon.couponData);
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData?.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );

  return response.data;
};
const getCoupon = async (id) => {
  let config = get_config();
  const response = await axios.get(`${base_url}coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${base_url}coupon/${id}`, config);

  return response.data;
};
const couponService = {
  getCoupons,
  createCoupons,
  applyCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;
