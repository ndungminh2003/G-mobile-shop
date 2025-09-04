import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { get_config } from "../../utils/axiosconfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};
const createColor = async (color) => {
  let config = get_config();
  const response = await axios.post(`${base_url}color/`, color, config);

  return response.data;
};

const updateColor = async (color) => {
  let config = get_config();
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title, value: color.colorData.value },
    config
  );

  return response.data;
};
const getColor = async (id) => {
  let config = get_config();
  const response = await axios.get(`${base_url}color/${id}`, config);

  return response.data;
};

const deleteColor = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${base_url}color/${id}`, config);

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
