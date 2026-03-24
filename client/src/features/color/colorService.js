import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { get_config } from "../../utils/axiosconfig";

const getColors = async () => {
  const response = await axios.get(`${BASE_URL}color/`);

  return response.data;
};
const createColor = async (color) => {
  let config = get_config();
  const response = await axios.post(`${BASE_URL}color/`, color, config);

  return response.data;
};

const updateColor = async (color) => {
  let config = get_config();
  const response = await axios.put(
    `${BASE_URL}color/${color.id}`,
    { title: color.colorData.title, value: color.colorData.value },
    config
  );

  return response.data;
};
const getColor = async (id) => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}color/${id}`, config);

  return response.data;
};

const deleteColor = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${BASE_URL}color/${id}`, config);

  return response.data;
};
const colorService = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};

export default colorService;
