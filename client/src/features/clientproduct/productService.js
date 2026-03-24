import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { BASE_URL } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}product/`);

  return response.data;
};

const searchProducts = async (query) => {
  const response = await axios.get(`${BASE_URL}product/search/${query}`);
  console.log(response.data);
  return response.data;
};

const createProduct = async (product) => {
  const config = get_config();
  const response = await axios.post(`${BASE_URL}product/`, product, config);

  return response.data;
};

const updateProduct = async (product) => {
  const config = get_config();
  const response = await axios.put(
    `${BASE_URL}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      brand: product.productData.brand,
      category: product.productData.category,
      tags: product.productData.tags,
      color: product.productData.color,
      quantity: product.productData.quantity,
      images: product.productData.images,
    },
    config
  );
  console.log(product.productData);
  return response.data;
};

const getProduct = async (id) => {
  const config = get_config();
  const response = await axios.get(`${BASE_URL}product/${id}`, config);

  return response.data;
};

const deleteProduct = async (id) => {
  const config = get_config();
  const response = await axios.delete(`${BASE_URL}product/${id}`, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  searchProducts,
};

export default productService;
