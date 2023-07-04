/* eslint-disable no-unused-vars */
import { CONFIG_API } from "./config.js";
import axios from "axios";

export const getAllWastesFromDB = async (reqBody = "", userId) => {
  try {
    const listReq = await axios({
      method: "get",
      url: `${CONFIG_API.DB}/waste/complete-list`,
      withCredentials: true, //will send the token from the cookies
    });

    const rawData = await listReq.data;

    // console.log("API raw data>>", rawData);

    // To do refactor: filter the ones which delivery state != entregado or date lt actual date
    const formatedData = rawData.map((item) => {
      const {
        _id,
        location,
        date,
        description,
        deliveryState,
        user: { username: userName },
        user: { _id: userId },
      } = item;
      return {
        wasteId: _id.toString(),
        location,
        date,
        description,
        deliveryState,
        userName,
        userId: userId.toString(),
      };
    });

    // console.log("formated waste list>>", formatedData);

    return new Promise((resolve, reject) => {
      resolve(formatedData);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};
