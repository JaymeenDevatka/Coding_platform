import axios from "axios";

const API_URL = "/api/problems"; // Use proxy in package.json or adjust as needed

export const getProblems = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProblemById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createProblem = async (problem) => {
  const res = await axios.post(API_URL, problem);
  return res.data;
};

export const updateProblem = async (id, problem) => {
  const res = await axios.put(`${API_URL}/${id}`, problem);
  return res.data;
};

export const deleteProblem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};