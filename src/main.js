import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { useLoadingStore } from "./components/stores/useLoadingStore";
import Home from "./components/pages/Home.vue";

const app = createApp(App);

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/menu",
    name: "menu",
    component: () => import("./components/pages/Menu.vue"),
  },
  {
    path: "/delivery-info",
    name: "delivery-info",
    component: () => import("./components/pages/DeliveryInfo.vue"),
  },
  {
    path: "/product/:productId",
    name: "product",
    component: () => import("./components/pages/Product.vue"),
    props: true,
  },
  {
    path: "/search-results",
    name: "search-results",
    component: () => import("./components/pages/SearchResults.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./components/pages/Error404.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path && to.hash) {
      return {
        el: to.hash,
      };
    } else if (to.path === from.path) {
      return { top: 0 };
    } else if (to.path !== from.path && to.hash) {
      return {
        el: to.hash,
        behavior: "instant",
      };
    } else if (savedPosition) {
      return { ...savedPosition, behavior: "instant" };
    } else {
      return { top: 0, behavior: "instant" };
    }
  },
});
app.use(router);

const pinia = createPinia();
app.use(pinia);

const loadingStore = useLoadingStore();

router.beforeEach((to, from, next) => {
  if (!(to.path === from.path)) {
    loadingStore?.changeLoading(true);
  }
  next();
});

router.afterEach(() => {
  setTimeout(() => loadingStore?.changeLoading(false), 500);
});

app.mount("#app");
