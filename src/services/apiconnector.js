import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, header, params) => {
   console.log("bodyData", bodyData);
   return axiosInstance({
      method: `${method}`,
      url: `${url}`,
      data: bodyData || null,
      headers: header || null,
      params: params || null,
   });
};
