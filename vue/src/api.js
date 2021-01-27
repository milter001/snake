import { get, post } from "./axios";
const api = {
  login: (p) => post("/login", p),
  register: (p) => post("/signup/mobile", p),
  logout: () => post("/logout"),
  getUserInfo: () => get("/my/info"),
};
export default api;
