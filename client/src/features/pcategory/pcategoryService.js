import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { get_config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};
const createCategory = async (category) => {
  let config = get_config();
  const response = await axios.post(`${base_url}category/`, category, config);

  return response.data;
};

const getProductCategory = async (id) => {
  let config = get_config();
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};
const updateProductCategory = async (category) => {
  let config = get_config();
  console.log(category);
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};

const getCategoryBrands = async () => {
  const response = await axios.get(`${base_url}product/category/brands`);

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
