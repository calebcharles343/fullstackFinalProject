import axios from "axios";
import { baseUrl } from "./baseUrl";

const apiURL = baseUrl();

export const login = async function (email: string, password: string) {
  try {
    const response = await axios.post(`${apiURL}/auth/login`, {
      email,
      password,
    });
    console.log(response.data);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      console.log(err);
    }
  }
};

export const logout = async function () {
  try {
    const response = await axios.post(`${apiURL}/stations/logout`);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
