import * as api from "../Services/api.js";
import CreatePayrollBatch from "../../objs/CreatePayrollBatch";
export const state = {
  payrollBatches: [],
  providers: [
    {
      name: 'AAA BBB',
      id: 'sdf123w',
      program: 'asdfd',
      payout: '$123',
      approved: false,
      flaged: true,
    },
    {
      name: 'AAA BBB',
      id: 'sdf123',
      program: 'asdfd',
      payout: '$123',
      approved: true,
      flaged: false,
    },
  ],
};
export const mutations = {
  GENERATE_BATCH(state, payload) {
    state.payrollBatches.push({...payload});
  }
};
export const getters = {
    payrollBatches: ({ payrollBatches }) => payrollBatches,
    providers: ({ providers }) => providers,
};
export const actions = {
    generateBatch({commit}, data){
        commit('GENERATE_BATCH', data)
    }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
