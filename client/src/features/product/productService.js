import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { BASE_URL } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(
    `${BASE_URL}product/?fields=title,price,thumbnail,slug,feature,brand,color,category`
  );

  return response.data;
};

const getProductBySlug = async (slug) => {
  const response = await axios.get(`${BASE_URL}product/${slug}`);

  return response.data;
};

const getLimitProducts = async (limit) => {
  let params = "?";
  if (limit) {
    for (let key in limit) {
      params += `${key}=${limit[key]}&`;
    }
  }
  params +=
    "fields=title,price,thumbnail,slug,feature,brand,color,category,totalrating";
  const response = await axios.get(`${BASE_URL}product/${params}`);

  return response.data;
};

const getProductByCatalog = async (params) => {
  // const response = await axios.get(`${BASE_URL}product/`, { params });
  console.log("service", params);
  const response = await axios.get(`${BASE_URL}product/${params}`);

  return response.data;
};

const searchProducts = async (params) => {
  const query = `?keyword=${params.keyword}&page=${params.currentPage}&limit=${params.limit}`;
  console.log("query", query);
  const response = await axios.get(`${BASE_URL}product/search/${query}`);
  console.log(response.data);
  return response.data;
};

const createProduct = async (product) => {
  let config = get_config();
  const response = await axios.post(`${BASE_URL}product/`, product, config);

  return response.data;
};

const updateProduct = async (product) => {
  let config = get_config();
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
  // console.log(product.productData);
  return response.data;
};

const getProduct = async (id) => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}product/by-id/${id}`, config);

  return response.data;
};

const deleteProduct = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${BASE_URL}product/${id}`, config);

  return response.data;
};

const rating = async (obj) => {
  const config = get_config();
  const response = await axios.put(`${BASE_URL}product/rating`, obj, config);

  return response.data;
};

const getRelatedProduct = async (id) => {
  const response = await axios.get(`${BASE_URL}product/related/${id}`);

  return response.data;
};

const productService = {
  getProducts,
  getProductBySlug,
  getLimitProducts,
  getProductByCatalog,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  searchProducts,
  rating,
  getRelatedProduct,
};

export default productService;
