/* eslint-disable no-unused-vars */
export const userRequestToApi = async () => {
  try {
    const url = "endpoint from my API";
    const request = await fetch(url);
    const data = await request.json();

    return new Promise((resolve, reject) => {
      resolve(data);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};
