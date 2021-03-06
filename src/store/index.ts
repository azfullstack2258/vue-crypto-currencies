import Vue from "vue";
import Vuex from "vuex";
import Currency from "@/store/modules/currency";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    currency: Currency,
  },
});
