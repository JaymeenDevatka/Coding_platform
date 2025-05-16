import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getTestcases = async (problemId) => {
  const response = await axios.get(`${API_URL}/api/testcases/${problemId}`);
  return response.data;
};

export const createTestcase = async (testcase) => {
  const response = await axios.post(`${API_URL}/api/testcases`, testcase);
  return response.data;
};

export const deleteTestcase = async (id) => {
  const response = await axios.delete(`${API_URL}/api/testcases/${id}`);
  return response.data;
};