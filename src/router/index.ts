import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import AOS from "aos";
import 'aos/dist/aos.css';
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

router.beforeEach((_to, _from, next) => {
  AOS.init(); // Initialize AOS
  next();
});

export default router;
