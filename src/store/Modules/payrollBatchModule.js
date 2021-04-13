import * as api from "../Services/api.js";
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
  },
  SET_ALL_PAYROLL_BATCHES(state, payload) {
    state.payrollBatches = payload
  }
};
export const getters = {
    payrollBatches: ({ payrollBatches }) => payrollBatches,
    providers: ({ providers }) => providers,
};
export const actions = {
    generateBatch({commit}, data){
        commit('GENERATE_BATCH', data)
    },
    async getAllBatches({ commit }) {
      return await api.get('/payrollBatch/getAllPayrollBatches')
      .then((response) => {
        console.log(response)
        commit('SET_ALL_PAYROLL_BATCHES', response.data)
      })
    }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
