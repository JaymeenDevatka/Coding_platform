import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getProblems = async () => {
  const response = await axios.get(`${API_URL}/api/problems`);
  return response.data;
};

export const getProblemById = async (id) => {
  const response = await axios.get(`${API_URL}/api/problems/${id}`);
  return response.data;
};

export const createProblem = async (problem) => {
  const response = await axios.post(`${API_URL}/api/problems`, problem);
  return response.data;
};

export const updateProblem = async (id, problem) => {
  const response = await axios.put(`${API_URL}/api/problems/${id}`, problem);
  return response.data;
};

export const deleteProblem = async (id) => {
  const response = await axios.delete(`${API_URL}/api/problems/${id}`);
  return response.data;
};