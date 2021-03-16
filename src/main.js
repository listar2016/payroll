import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import { FontAwesomeIcon } from "./icons";
//import Moment from "moment";
import VueTheMask from "vue-the-mask";

import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import Vuelidate from "vuelidate";
import VuelidateErrorExtractor from "vuelidate-error-extractor";
import { messages, attributes } from "./plugins/vuelidate/vuelidate.js";
import FieldErrorGroup from "./components/validations/field-error-group.vue";
import FormField from "./components/FormFields/form-field.vue";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.css";
require("./css/site.css");
import mgr from "./security/security.js";

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  messages: messages,
  attributes: attributes
});

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi"
});
Vue.use(VueTheMask);

Vue.component("error-group", FieldErrorGroup);

Vue.component("icon", FontAwesomeIcon);
Vue.component("form-field", FormField);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
