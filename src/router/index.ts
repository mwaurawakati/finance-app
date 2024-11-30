import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/invest",
    name: "invest",
    component: () =>
      import(/* webpackChunkName: "invest" */ "../views/InvestView.vue"),
  },
  {
    path: "/payment",
    name: "payment",
    component: () =>
      import(/* webpackChunkName: "payment" */ "../views/PaymentsVue.vue"),
  },
  {
    path: "/crypto",
    name: "crypto",
    component: () =>
      import(/* webpackChunkName: "crypto" */ "../views/CryptoView.vue"),
  },
  {
    path: "/points",
    name: "points",
    component: () =>
      import(/* webpackChunkName: "points" */ "../views/PointsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
