import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { get_config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${BASE_URL}category/`);

  return response.data;
};
const createCategory = async (category) => {
  let config = get_config();
  const response = await axios.post(`${BASE_URL}category/`, category, config);

  return response.data;
};

const getProductCategory = async (id) => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}category/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${BASE_URL}category/${id}`, config);

  return response.data;
};
const updateProductCategory = async (category) => {
  let config = get_config();
  console.log(category);
  const response = await axios.put(
    `${BASE_URL}category/${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};

const getCategoryBrands = async () => {
  const response = await axios.get(`${BASE_URL}product/category/brands`);

  return response.data;
};

const pCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
  getCategoryBrands,
};

export default pCategoryService;
