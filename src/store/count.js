// 记录今天有多少正在加工和加工完成的产品，在首页上显示。

import axios from "axios";

export default {
  namespaced: true,
  state: {
    order: 0,
    process: 0,
    done: 0
  },
  mutations: {
  },
  actions: {
    get({ state }) {
      return axios
        .get("/api/count")
        .then((response) => {
          state.process = response.data.process;
          state.done = response.data.done;
        })
    },
  },
  getters: {},
};