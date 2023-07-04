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

export const getUserWasteFromDB = async (reqBody = "", userId) => {
  try {
    const userWaste = await axios({
      method: "get",
      url: `${CONFIG_API.DB}/waste/user/${userId}`,
      withCredentials: true, //will send the token from the cookies
    });

    const rawData = await userWaste.data;

    // console.log("API raw data>>", rawData);

    const formatedData = rawData.map((item) => {
      return {
        wasteId: item._id.toString(),
        location: item.location,
        date: item.date,
        description: item.description,
        deliveryState: item.deliveryState,
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

export const createWasteInDB = async (reqBody, userId) => {
  try {
    const formatedBody = {
      location: reqBody.location,
      description: reqBody.description,
      user: userId,
      date: reqBody.date,
    };

    const userWaste = await axios({
      method: "post",
      url: `${CONFIG_API.DB}/waste/new`,
      data: formatedBody,
      withCredentials: true, //will send the token from the cookies
    });

    const rawData = await userWaste.data;

    const newPost = {
      userName: reqBody.userName, //it'll be nice to refactor this line and get the username from the DB also
      wasteId: rawData._id.toString(),
      location: rawData.location,
      userId: rawData.user,
      date: rawData.date,
      description: rawData.description,
      deliveryState: rawData.deliveryState,
    };

    return new Promise((resolve, reject) => {
      resolve(newPost);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const updateWasteInDB = async (reqBody, userId) => {
  try {
    const { location, date, description, deliveryState, wasteId } = reqBody;
    // avoid modifying the Id in the database
    const formatedBody = {
      location,
      description,
      date,
      deliveryState,
    };

    // 1. update de db with the request
    await axios({
      method: "put",
      url: `${CONFIG_API.DB}/waste/_id/${wasteId}`,
      data: formatedBody,
      withCredentials: true, //will send the token from the cookies
    });

    // 2. get the updated list from theAPI
    const updatedList = await getUserWasteFromDB("", userId);
    console.log("secon request response>>", updatedList);

    return new Promise((resolve, reject) => {
      resolve(updatedList);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

/* export const getMapsDataFromDB = async (reqBody, userId) => {
  try {
    // console.log("get maps data >>", reqBody);
    // console.log("user id >>", userId);
    // const allWastesList = await axios({
    //   method: "get",
    //   url: `${CONFIG_API.DB}/waste/complete-list`,
    //   withCredentials: true, //will send the token from the cookies
    // });

    const userWaste = await axios({
      method: "get",
      url: `${CONFIG_API.DB}/waste/user/${userId}`,
      withCredentials: true, //will send the token from the cookies
    });

    const rawData = await userWaste.data;

    // console.log("API raw data>>", rawData);

    const formatedData = rawData.map((item) => {
      return {
        wasteId: item._id.toString(),
        location: item.location,
        date: item.date,
        description: item.description,
        deliveryState: item.deliveryState,
      };
    });

    console.log("formated waste list>>", formatedData);

    return new Promise((resolve, reject) => {
      resolve(formatedData);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}; */
