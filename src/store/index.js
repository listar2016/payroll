import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

Vue.config.devtools = true;

import uxModule from "./Modules/uxModule";

import formFieldsModule from "./Modules/formFieldsModule";
import sharedModule from "./Modules/sharedModule";
import securityModule from "./Modules/securityModule";
import sampleModule from "./Modules/sampleModule";
import payrollBatchModule from "./Modules/payrollBatchModule";
import providerModule from "./Modules/providerModule";
import otherEarningsModule from "./Modules/otherEarningsModule";
import optionModule from "./Modules/optionModule";

const state = {};

const mutations = {};

const actions = {};

const store = new Vuex.Store({
  modules: {
    uxModule: uxModule,
    formFieldsModule: formFieldsModule,
    sharedModule: sharedModule,
    securityModule: securityModule,
    sampleModule: sampleModule,
    payrollBatchModule: payrollBatchModule,
    providerModule: providerModule,
    otherEarningsModule: otherEarningsModule,
    optionModule: optionModule,
  },

  state,
  mutations,
  actions
  //plugins: [
  //  createPersistedState({
  //    storage: window.sessionStorage,
  //  }),
  //],
});

export default store;
