import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import store from "../store/index"
Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,

  routes
});


router.beforeEach(async (to, from, next) =>
{
  store.commit('securityModule/setRequiresAuth', true);
  next()
  // console.log("In router before each shallow authenticate");
  // await store.dispatch('securityModule/shallowAuthenticate');
  // console.log("After the await:");
  // console.log(store.state.securityModule.isAuthenticated);
  // if (store.state.securityModule.isAuthenticated)
  // {
  //   next()
  // } else if (to.matched.some(record => record.meta.requiresAuth))
  // {
  //   store.commit('securityModule/setRequiresAuth', true);
  //   //authentication is required. Trigger the sign in process, including the return URI
  //   await store.dispatch('securityModule/authenticate', to.path).then(() =>
  //   {
  //     console.log('authenticating a protected url:' + to.path);
  //     next();
  //   });
  // } else
  // {
  //   store.commit('securityModule/setRequiresAuth', false);
  //   next()
  // }
});

export default router;
