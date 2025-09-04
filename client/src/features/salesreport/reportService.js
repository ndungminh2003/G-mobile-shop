import axios from "axios";
import { get_config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const createReport = async (report) => {
  let config = get_config();
  const response = await axios.post(`${base_url}report/`, report, config);
  return response.data;
};

const getReports = async () => {
  let config = get_config();
  const response = await axios.get(`${base_url}report/`, config);

  return response.data;
};
const deleteReport = async (id) => {
  let config = get_config();
  const response = await axios.delete(`${base_url}report/${id}`, config);
  return response.data;
};
const getReport = async (id) => {
  let config = get_config();
  const response = await axios.get(`${base_url}report/${id}`, config);
  return response.data;
};
const updateReport = async (report) => {
  let config = get_config();
  let id = report._id;
  delete report._id;
  const response = await axios.put(`${base_url}report/${id}`, report, config);
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
