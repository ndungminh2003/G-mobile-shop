import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { get_config } from "../../utils/axiosconfig";

const getCustomers = async () => {
  const response = await axios.get(`${base_url}user/all-customer`);

  return response.data;
};

const getSalesperson = async () => {
  const response = await axios.get(`${base_url}user/all-salesperson`);
  return response.data;
};

const getAUser = async (id) => {
  let config = get_config();

  const response = await axios.get(`${base_url}user/${id}`, config);
  return response.data;
};

const createAUser = async (user) => {
  const response = await axios.post(`${base_url}user/register`, user);
  return response.data;
};

const createUserInAdmin = async (user) => {
  const response = await axios.post(`${base_url}user/admin-create-user`, user);
  return response.data;
};

const updateAUser = async (user) => {
  const { id, accountData } = user;
  delete accountData._id;
  let config = get_config();
  const response = await axios.put(
    `${base_url}user/edit-user/${id}`,
    accountData,
    config
  );
  return response.data;
};

const deleteUser = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${base_url}user/${id}`, config);
  return response.data;
};

const accountService = {
  getCustomers,
  getSalesperson,
  getAUser,
  createAUser,
  createUserInAdmin,
  updateAUser,
  deleteUser,
};

export default accountService;
