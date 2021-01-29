import { get, post } from "./axios";
const api = {
  login: (p) => post("/login", p),
  loginPhone:(p) => post("/login/phone", p),
  register: (p) => post("/register", p),
  sendVcode: (p) => post("/vcode", p),
  getProfile: () => get("/users/profile"),
};
export default api;
