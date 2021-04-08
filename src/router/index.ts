import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import store from '../store/index';

import Home from "../components/Home.vue";
import Register from "../components/TheRegister.vue";
import Login from "../components/TheLogin.vue";
import Dashboard from "../components/UserDashboad.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    redirect: "/home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter(to, from, next){
      if(store.getters["users/isLogged"] === false){
        next();
      }else{
        next("/");
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next){
      if(store.getters["users/isLogged"] === false){
        next();
      }else{
        next("/");
      }
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter(to, from, next){
      if(store.getters["users/isLogged"]){
        next();
      }else{
        next("/");
      }
    }
  },
  {
    path: "/:notFound(.*)",
    name: "notFound",
    redirect: "/home"
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
