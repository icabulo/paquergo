/* eslint-disable no-unused-vars */
import { API } from "../../../api/auth.js";
import axios from "axios";

export const userRequestToApi = async (inputEmail) => {
  try {
    const res = await axios({
      method: "get",
      url: `${API}/user/email/${inputEmail}`,
      withCredentials: true, //will send the token from the cookies
    });

    // console.log("user info", res.data);
    return new Promise((resolve, reject) => {
      resolve(res.data);
    });
  } catch (error) {
    // console.log("error", error);
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

// export const userRequestToApi = async () => {
//   try {
//     const res = await axios({
//       method: "get",
//       url: `${API}/user/getusers`,
//       // data: reqBody,
//       withCredentials: true, //will send the token from the cookies
//     });

//     console.log("all users", res.data);
//     /* const request = await fetch(url);
//     const data = await request.json();

//     return new Promise((resolve, reject) => {
//       resolve(data);
//     }); */
//   } catch (error) {
//     console.log("error", error);
//     /* return new Promise((resolve, reject) => {
//       reject(error);
//     }); */
//   }
// };
