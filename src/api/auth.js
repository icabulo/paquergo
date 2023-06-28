import axios from "axios";

const API = "http://localhost:3500/api";

export const registerRequest = async (reqBody) => {
  try {
    let res = await axios({
      method: "post",
      url: `${API}/user/register`,
      data: reqBody,
    });

    let data = res.data;
    return data;
  } catch (error) {
    // console.log(error.response); // this is the main part. Use the response property from the error object

    return error.response.data;
  }
};
// export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = async (reqBody) => {
  try {
    let res = await axios({
      method: "post",
      url: `${API}/auth/login`,
      data: reqBody,
    });

    let data = res.data;
    return data;
  } catch (error) {
    // console.log(error.response); // this is the main part. Use the response property from the error object

    return error.response.data;
  }
};
