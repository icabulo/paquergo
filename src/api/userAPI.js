/* eslint-disable no-unused-vars */
import { CONFIG_API } from "./config.js";
import axios from "axios";

export const userFetchFromApi = async (inputEmail) => {
  try {
    const res = await axios({
      method: "get",
      url: `${CONFIG_API.DB}/user/email/${inputEmail}`,
      withCredentials: true, //will send the token from the cookies
    });

    return new Promise((resolve, reject) => {
      resolve(res.data);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const updateRequestToApi = async (reqBody, userId) => {
  try {
    const res = await axios({
      method: "put",
      url: `${CONFIG_API.DB}/user/_id/${userId}`,
      data: reqBody,
      withCredentials: true, //will send the token from the cookies
    });

    return new Promise((resolve, reject) => {
      resolve(res.data);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};
