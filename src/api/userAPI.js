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

// WASTES
export const getUserWasteFromDB = async (reqBody = "", userId) => {
  try {
    const userWaste = await axios({
      method: "get",
      url: `${CONFIG_API.DB}/waste/user/${userId}`,
      withCredentials: true, //will send the token from the cookies
    });

    const rawData = await userWaste.data;

    // console.log("API raw data>>", rawData);
    let formatedData = [];

    // when a user doesn't have a list the query returns status code 209 and message ... not found
    if (typeof rawData === "string" && rawData.includes("not found")) {
      formatedData = []; // set an empty array when user doesn't have any waste
    } else {
      formatedData = rawData.map((item) => {
        return {
          wasteId: item._id.toString(),
          location: item.location,
          date: item.date,
          description: item.description,
          deliveryState: item.deliveryState,
        };
      });
    }

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

    // 1. update the db with the request
    await axios({
      method: "put",
      url: `${CONFIG_API.DB}/waste/_id/${wasteId}`,
      data: formatedBody,
      withCredentials: true, //will send the token from the cookies
    });

    // 2. get the updated list from theAPI
    const updatedList = await getUserWasteFromDB("", userId);

    return new Promise((resolve, reject) => {
      resolve(updatedList);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const deleteWasteInDB = async (wasteId, userId) => {
  try {
    // 1. delete waste in the db
    await axios({
      method: "delete",
      url: `${CONFIG_API.DB}/waste/_id/${wasteId}`,
      withCredentials: true, //will send the token from the cookies
    });

    // 2. get the updated list from theAPI
    const updatedList = await getUserWasteFromDB("", userId);

    return new Promise((resolve, reject) => {
      resolve(updatedList);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

// PACAS
export const getUserPacaFromDB = async (reqBody = "", userId) => {
  try {
    const userPaca = await axios({
      method: "get",
      url: `${CONFIG_API.DB}/paca/user/${userId}`,
      withCredentials: true, //will send the token from the cookies
    });

    const rawData = await userPaca.data;

    let formatedData = [];

    // when a user doesn't have a list the query returns status code 209 and message ... not found
    if (typeof rawData === "string" && rawData.includes("not found")) {
      formatedData = []; // set an empty array when user doesn't have any waste
    } else {
      formatedData = rawData.map((item) => {
        return {
          pacaId: item._id.toString(),
          location: item.location,
          date: item.date,
          pacaState: item.pacaState,
          // this two, userName and userId can be deleted and replace them from user context
          userName: item.user.username,
          userId: item.user._id.toString(),
        };
      });
    }

    // console.log("formated paca list>>", formatedData);

    return new Promise((resolve, reject) => {
      resolve(formatedData);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const createPacaInDB = async (reqBody, userId) => {
  try {
    const formatedBody = {
      location: reqBody.location,
      user: userId,
      date: reqBody.date,
    };

    const userPaca = await axios({
      method: "post",
      url: `${CONFIG_API.DB}/paca/new`,
      data: formatedBody,
      withCredentials: true, //will send the token from the cookies
    });

    const rawData = await userPaca.data;

    const newPost = {
      userName: reqBody.userName, //it'll be nice to refactor this line and get the username from the DB also
      pacaId: rawData._id.toString(),
      location: rawData.location,
      userId: rawData.user,
      date: rawData.date,
      pacaState: rawData.pacaState,
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

export const updatePacaInDB = async (reqBody, userId) => {
  try {
    const { location, date, pacaState, pacaId } = reqBody;
    // avoid modifying the Id in the database
    const formatedBody = {
      location,
      date,
      pacaState,
    };

    // 1. update the db with the request
    await axios({
      method: "put",
      url: `${CONFIG_API.DB}/paca/_id/${pacaId}`,
      data: formatedBody,
      withCredentials: true, //will send the token from the cookies
    });

    // 2. get the updated list from the API
    const updatedList = await getUserPacaFromDB("", userId);

    return new Promise((resolve, reject) => {
      resolve(updatedList);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const deletePacaInDB = async (pacaId, userId) => {
  try {
    // 1. delete paca in the db
    await axios({
      method: "delete",
      url: `${CONFIG_API.DB}/paca/_id/${pacaId}`,
      withCredentials: true, //will send the token from the cookies
    });

    // 2. get the updated list from the API
    const updatedList = await getUserPacaFromDB("", userId);

    return new Promise((resolve, reject) => {
      resolve(updatedList);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};
