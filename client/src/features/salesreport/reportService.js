import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { BASE_URL } from "../../utils/baseUrl";

const createReport = async (report) => {
  let config = get_config();
  const response = await axios.post(`${BASE_URL}report/`, report, config);
  return response.data;
};

const getReports = async () => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}report/`, config);

  return response.data;
};
const deleteReport = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${BASE_URL}report/${id}`, config);
  return response.data;
};
const getReport = async (id) => {
  let config = get_config();
  const response = await axios.get(`${BASE_URL}report/${id}`, config);
  return response.data;
};
const updateReport = async (report) => {
  let config = get_config();
  let id = report._id;
  delete report._id;
  const response = await axios.put(`${BASE_URL}report/${id}`, report, config);
  return response.data;
};
const reportService = {
  getReports,
  deleteReport,
  getReport,
  updateReport,
  createReport,
};

export default reportService;
