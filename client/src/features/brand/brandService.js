import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { BASE_URL } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axios.get(`${BASE_URL}brand/`);

  return response.data;
};

const createBrand = async (brand) => {
  let config = get_config();
  const response = await axios.post(`${BASE_URL}brand/`, brand, config);

  return response.data;
};
const updateBrand = async (brand) => {
  let config = get_config();
  const response = await axios.put(
    `${BASE_URL}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};
const getBrand = async (id) => {
  let config = get_config();

  const response = await axios.get(`${BASE_URL}brand/${id}`, config);

  return response.data;
};

const deleteBrand = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${BASE_URL}brand/${id}`, config);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
