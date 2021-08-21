import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import CurrencyDetailPage from "@/views/currency-detail/index.vue";
import CurrencyListPage from "@/views/currency-list/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "CurrencyList",
    component: CurrencyListPage,
  },
  {
    path: "/:symbol",
    name: "CurrencyDetail",
    component: CurrencyDetailPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
