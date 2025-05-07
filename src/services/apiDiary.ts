import axios from "axios";
import { localStorageUser } from "../utils/localStorageUser";
import { baseUrl } from "./baseUrl";

const apiURL = baseUrl();

const axiosInstance = axios.create({
  baseURL: apiURL,
});

const getToken = () => {
  const localStorageUserX = localStorageUser();

  const token = localStorage.getItem(`token-${localStorageUserX.id}`);

  return token;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Token attached to request:", token); // Debugging token attachment
    } else {
      console.error("No token found, request not authorized");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Retry logic for rate-limiting errors (429)
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Initial delay in milliseconds

const retryRequest = async (error: any, retries: number = 0): Promise<any> => {
  if (retries >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  const delay = RETRY_DELAY * Math.pow(2, retries); // Exponential backoff
  await new Promise((resolve) => setTimeout(resolve, delay));

  return axiosInstance
    .request(error.config)
    .catch((err) => retryRequest(err, retries + 1));
};

// Add response interceptor to handle retries
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      return retryRequest(error);
    }
    return Promise.reject(error);
  }
);

export const createEntry = async (data: any) => {
  const response = await axiosInstance.post(`/diary/create`, data);
  return response.data;
};

export const editEntry = async (data: any, id: string) => {
  const response = await axiosInstance.put(`/diary/update/${id}`, data);
  return response.data;
};
export const entries = async () => {
  const response = await axiosInstance.get(`/diary/entries`);
  return response.data;
};
export const deleteEntry = async (entryId: string) => {
  const response = await axiosInstance.delete(`/diary/delete/${entryId}`);
  return response.data;
};
