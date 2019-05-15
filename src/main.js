import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
import "iview/dist/styles/iview.css";

//mock for api, please remove those mock in production env.
require("@/mock/account.js");
require("@/mock/base.js");
require("@/mock/setting.js");

import api from "@/plugins/api";
Vue.prototype.$API = api;

import util from "@/plugins/util";
Vue.prototype.$util = util;

import iView from "iview";
Vue.use(iView);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
