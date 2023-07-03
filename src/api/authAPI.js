import axios from "axios";
import { CONFIG_API } from "./config";
export const API = "http://localhost:3500/api";

export const registerRequest = async (reqBody) => {
  try {
    let res = await axios({
      method: "post",
      url: `${CONFIG_API.DB}/user/register`,
      data: reqBody,
    });

    let data = res.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginRequest = async (reqBody) => {
  try {
    let res = await axios({
      method: "post",
      url: `${CONFIG_API.DB}/auth/login`,
      data: reqBody,
      withCredentials: true, //this allows the cookie to be send back to the backend api
    });

    let data = res.data;
    return data;
  } catch (error) {
    // console.log(error.response); // this is the main part. Use the response property from the error object

    return error.response.data;
  }
};

//todo: logout to reset the token
