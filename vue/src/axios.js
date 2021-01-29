import axios from "axios";
import { AUTH_LOGOUT } from "./store/index";

console.log("设置api前缀 " + "/api/v1");
axios.defaults.baseURL = "/api/v1";


/*
axios 异步请求说明：

1、axios.get/axios.post本身就是异步的，返回Promise
2、下面的get post 封装仍然是异步的，返回Promise，好处是可以统一打log，记录网络请求，同时进行数据的拆包
3、response 拦截器仍然是异步的，返回Promise，目的是进行错误的统一处理

*/
console.log("设置响应拦截器");
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    console.log("network response is ", response);
    let res = response.data;
    switch (res.code) {
      case 0:
        return response;
      case 20103:
        console.log("token已过期，自动转到登录页面");
        //统一处理未登录
        this.$store.dispatch(AUTH_LOGOUT).then(() => {
          this.$router.push("/login");
        });
        return Promise.reject(response);
      default:
        console.log("发生错误，请根据错误码进行排查：", res);
        return Promise.reject(response);
    }
  },
  (err) => {
    // 服务端未返回数据
    console.log("发生不可预知的错误：", err);
    return Promise.reject(err);
  }
);

export function get(url, params = {}) {
  console.log("getting  ", url, params);
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}

export function post(url, data = {}) {
  console.log("posting ", url, data);
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}
