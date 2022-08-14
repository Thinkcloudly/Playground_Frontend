import axios from "axios";
const BASE_HOST_URL = process.env.REACT_APP_BASE_HOST_URL;

const httpServices = {
  getRequest: async (url, headers) => {
    const response = await axios({
      method: "get",
      url: `${BASE_HOST_URL}${url}`,
      headers,
    });
    return response;
  },
  
  postRequest: async (url, data, headers) => {
    const response = await axios({
      method: "post",
      url: `${BASE_HOST_URL}${url}`,
      data,
      headers,
    });
    return response;
  },
};

export default httpServices;
