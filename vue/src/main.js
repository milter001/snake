import Vue from "vue";
import VueLazyLoad from "vue-lazyload";
import VueCookie from "vue-cookie";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import api from "./api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'

const mock = false;
if (mock) {
  require("./mock/api");
}

const token = localStorage.getItem("user-token");
if(token){
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

Vue.use(ElementUI);

Vue.prototype.$api = api;
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: "/static/loading.svg",
});
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
