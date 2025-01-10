import axios from "axios";

// import { SignupTypes } from "../interfaces.ts";

const apiURL = "https://tunga-c3-diaryapi.onrender.com/api/cohort3-fullstack";

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
    // console.log(response.data);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
