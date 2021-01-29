import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/home";
import Index from "./pages/index";
import store from "./store/index";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: Index,
        },
        {
            path: "/exam",
            name: "exam",
            component: () => import("./pages/exam.vue"),
            beforeEnter: ifAuthenticated
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/login.vue"),
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./pages/register.vue"),
      beforeEnter: ifNotAuthenticated
    },
  ],
});
