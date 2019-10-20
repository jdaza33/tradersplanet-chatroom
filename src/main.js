import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import Vuelidate from "vuelidate";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(Vuelidate);

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_URL,
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
