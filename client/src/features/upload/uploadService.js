import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  let config = get_config();
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};
const deleteImg = async (id) => {
  let config = get_config();
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,

    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
