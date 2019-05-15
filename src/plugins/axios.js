"use strict";

import Vue from "vue";
import axios from "axios";
import store from "@/store";
import router from "@/router";

axios.defaults.headers.post["Content-Type"] = "application/json";
let config = {
  baseURL: process.env.VUE_APP_GATEWAY,
  timeout: 5 * 1000
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
  config => {
    if (store.state.Token) {
      config.headers.Token = store.state.Token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let errorObj = null;
    switch (error.response.status) {
      case 400:
        if (Object.keys(error.response.data.errors).length) {
          errorObj = Promise.reject(error.response.data.errors);
        } else if (error.response.data.title) {
          errorObj = Promise.reject(error.response.data.title);
        }
        break;
      case 401:
        errorObj = "登录超时，请重新登录";
        store.commit("CleanUserInfo");
        router.push({
          name: "login",
          query: { redirect: router.currentRoute.fullPath }
        });
        break;
      case 403:
        errorObj = "没有访问权限";
        break;
      case 404:
        errorObj = "请求接口不存在";
        break;
      case 405:
        errorObj = "请求方式出错";
        break;
      case 500:
        errorObj = "服务器出错了";
        break;
      default:
        errorObj = "出错了";
        break;
    }
    return errorObj;
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);
export default Plugin;
