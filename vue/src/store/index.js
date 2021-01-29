import Vue from "vue";
import Vuex from "vuex";
import api  from "./../api";
import axios from "axios";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";

Vue.use(Vuex);

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false,
  userStatus: "",
  userProfile: {},
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  getProfile: (state) => state.userProfile,
  isProfileLoaded: (state) => !!state.userProfile.username,
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.data.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [USER_REQUEST]: (state) => {
    state.userStatus = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.userStatus = "success";
    state.userProfile = resp.data;
  },
  [USER_ERROR]: (state) => {
    state.userStatus = "error";
  },
  [AUTH_LOGOUT]: (state) => {
    state.userProfile = {};
    state.token = "";
    state.userStatus = "";
    state.status = "";
    
  },
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      api.login(user)
        .then(resp => {
          const token = resp.data.token;
          console.log("get token " + token);
          localStorage.setItem("user-token", token);
          axios.defaults.headers.common['Authorization'] = "Bearer " + token;
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },

  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    });
  },

  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    api.getProfile()
      .then(resp => {
        commit(USER_SUCCESS, resp);
      })
      .catch(() => {
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  }


  
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
