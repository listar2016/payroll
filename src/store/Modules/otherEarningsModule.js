import * as api from "../Services/api.js";

export const state = {
  scheduledDeductions: [],
  otherEarningCharges: [],
};
export const mutations = {
  SET_SCHEDULED_DEDUCTIONS(state, payload) {
    state.scheduledDeductions = payload
  },
  CREATE_SCHEDULED_DEDUCTION(state, payload) {
    state.scheduledDeductions.push({ ...payload })
  },
  UPDATE_SCHEDULED_DEDUCTION(state, payload) {
    const findIndex = state.scheduledDeductions.findIndex(({ scheduledDeductionId }) => scheduledDeductionId === payload.scheduledDeductionId)
    state.scheduledDeductions.splice(findIndex, 1, { ...payload })
  },
  DELETE_SCHEDULED_DEDUCTION(state, payload) {
    const findIndex = state.scheduledDeductions.findIndex(({ scheduledDeductionId }) => scheduledDeductionId === payload)
    state.scheduledDeductions.splice(findIndex, 1)
  },
  SET_OTHER_EARNING_CHARGES(state, payload) {
    state.otherEarningCharges = payload
  },
  ADD_OTHER_EARNING_CHARGE(state, payload) {
    state.otherEarningCharges.push({ ...payload })
  },
  UPDATE_OTHER_EARNING_CHARGE(state, payload) {
    const findIndex = state.otherEarningCharges.findIndex(({ otherEarningsChargeId }) => otherEarningsChargeId === payload)
    state.otherEarningCharges.splice(findIndex, 1, {...payload})
  },
  DELETE_OTHER_EARNING_CHARGE(state, payload) {
    const findIndex = state.otherEarningCharges.findIndex(({ otherEarningsChargeId }) => otherEarningsChargeId === payload)
    state.otherEarningCharges.splice(findIndex, 1)
  },
};
export const actions = {
  async getAllScheduledDeductions({ commit }) {
    return await api.get('/scheduledDeduction/getAllScheduledDeductions')
      .then((response) => {
        console.log(response)
        commit('SET_SCHEDULED_DEDUCTIONS', response.data)
      })
  },
  async createScheduledDeduction({ commit }, data) {
    return await api.post('/scheduledDeduction/createScheduledDeduction', data)
      .then((response) => {
        commit('CREATE_SCHEDULED_DEDUCTION', response.data)
        return response.success
      })
  },
  async updateScheduledDeduction({ commit }, data) {
    return await api.post('/scheduledDeduction/updateScheduledDeduction', data)
      .then((response) => {
        commit('UPDATE_SCHEDULED_DEDUCTION', response.data)
        return response.success
      })
  },
  async deleteScheduledDeduction({ commit }, deductionId) {
    return await api.post('/scheduledDeduction/deleteScheduledDeduction?scheduledDeductionId=' + deductionId)
      .then((response) => {
        response.success && commit('DELETE_SCHEDULED_DEDUCTION', deductionId)
        return response.success
      })
  },

  async getAllOtherEarningsCharges({ commit }) {
    return await api.get('/otherEarningsCharge/getAllOtherEarningsCharges')
      .then((response) =>{
        console.log(response)
        commit('SET_OTHER_EARNING_CHARGES', response.data)
      })
  },
  async findMatchingRate({ commit }, data) {
    return await api.get('/otherEarningsRate/findMatchingRate?providerId=' + data.providerId + '&earningsCodeId=' + data.earningCodeId)
      .then((response) => {
        return response
      })
  },
  async createOtherEarningsCharge( { commit }, data) {
    return await api.post('/otherEarningsCharge/createOtherEarningsCharge', data)
      .then((response) => {
        console.log(response)
        response.success && commit('ADD_OTHER_EARNING_CHARGE', response.data)
        return response.success
      })
  },
  async updateOtherEarningsCharge( { commit }, data) {
    return await api.post('/otherEarningsCharge/updateOtherEarningsCharge', data)
      .then((response) => {
        console.log(response)
        response.success && commit('UPDATE_OTHER_EARNING_CHARGE', response.data)
        return response.success
      })
  },
  async deleteOtherEarningsCharge({ commit }, data) {
    return await api.post('/otherEarningsCharge/deleteOtherEarningsCharge?otherEarningsChargeId=' + data)
      .then((response) => {
        response.success && commit('DELETE_OTHER_EARNING_CHARGE', data)
        return response.success
      })
  },
  async revertOtherEarningsCharge({ commit }, data) {
    return await api.post('/otherEarningsCharge/revertOtherEarningsCharge?otherEarningsChargeId=' + data)
      .then((response) => {
        console.log(response)
        response.success && commit('UPDATE_OTHER_EARNING_CHARGE', response.data)
        return response.success
      })
  },
  
};
export const getters = {
  scheduledDeductions: ({ scheduledDeductions }) => scheduledDeductions,
  otherEarningCharges: ({ otherEarningCharges }) => otherEarningCharges,
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};