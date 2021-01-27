import axios from "axios";
import { Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

axios.defaults.baseURL = "/api";

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    let res = response.data;
    if (res.code == 300 && res.msg == "未登录") {
      //统一处理未登录

      window.location.href = "/login";
      return Promise.reject(res);
    }
    return response;
  },
  (error) => {
    let res = error.response;
    Message.error(res.data);
    return Promise.reject(error);
  }
);

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
          resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
          resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
