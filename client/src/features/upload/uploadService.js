import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { BASE_URL } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  let config = get_config();
  const response = await axios.post(`${BASE_URL}upload/`, data, config);
  return response.data;
};
const deleteImg = async (id) => {
  let config = get_config();
  const response = await axios.delete(
    `${BASE_URL}upload/delete-img/${id}`,

    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
