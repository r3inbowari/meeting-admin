import axios from "axios";
import { getToken } from "@/libs/util";

// 创建axios实例
const service = axios.create({
  // baseURL: "http://r3inbowari.top:28080",
  // baseURL: "http://localhost:8080",
  baseURL: "http://localhost:8080",
  timeout: 15000,
});

service.interceptors.request.use((config) => {
  let token = getToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  } else {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
  return config;
});

service.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }
    return error;
  }
);

export default {
  service,

  //get请求
  get (url, data) {
    return service({
      url: url,
      method: "get",
      data,
    });
  },

  post (url, data) {
    return service({
      url: url,
      method: "post",
      data,
    });
  },

  put (url, data) {
    return service({
      url: url,
      method: "put",
      data,
    });
  },

  delete (url, data) {
    return service({
      url: url,
      method: "delete",
      data,
    });
  },
};
