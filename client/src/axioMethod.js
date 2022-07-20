import axios from "axios";

const BASE_URL = "https://bonprices.herokuapp.com/api";
// const BASE_URL = "http://localhost:8500/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
//   headers: { token: `Bearer ${user?.token}`}
});