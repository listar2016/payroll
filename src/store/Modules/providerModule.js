import * as api from "../Services/api.js";

export const state = {
  providers: [],
  selectedProviderId: null,
  selectedProviderName: null,
  sessionRates: [],
  corporations: [],
  associatedCorporations: [],
  allStaffingAgencies: [],
  otherEarnings: [],
};
export const mutations = {
  SET_PROVIDERS(state, payload) {
    state.providers = payload
  },
  SET_SELECTED_PROVIDER_INFO (state, {...payload}) {
    state.selectedProviderId = payload.providerId
    state.selectedProviderName = payload.name
  },
  CREATE_PROVIDER(state, payload) {
    state.providers.push({ ...payload })
  },
  UPDATE_PROVIDER(state, payload) {
    const findIndex = state.providers.findIndex(({ providerId }) => providerId === payload.providerId)
    state.providers.splice(findIndex, 1, { ...payload })
  },
  DELETE_PROVIDER(state, payload) {
    const findIndex = state.providers.findIndex(({ providerId }) => providerId === payload)
    state.providers.splice(findIndex, 1)
  },
  SET_SESSION_RATES(state, payload) {
    state.sessionRates = payload
  },
  CREATE_SESSION_RATE(state, payload) {
    state.sessionRates.push({
      ...payload
    })
  },
  UPDATE_SESSION_RATE(state, payload) {
    const findIndex = state.sessionRates.findIndex(({ sessionRateId }) => sessionRateId === payload.sessionRateId)
    state.sessionRates.splice(findIndex, 1, { ...payload })
  },
  DELETE_SESSION_RATE(state, payload) {
    const findIndex = state.sessionRates.findIndex(({ sessionRateId }) => sessionRateId === payload)
    state.sessionRates.splice(findIndex, 1)
  },
  SET_CORPORATIONS(state, payload) {
    state.corporations = payload
  },
  CREATE_CORPORATION(state, payload) {
    state.corporations.push(
      {...payload}
    )
  },
  UPDATE_CORPORATION(state, payload) {
    const findIndex = state.corporations.findIndex(({ providerCorporationId }) => providerCorporationId === payload.providerCorporationId)
    state.corporations.splice(findIndex, 1, { ...payload })
  },
  DELETE_CORPORATION(state, payload) {
    const findIndex = state.corporations.findIndex(({ providerCorporationId }) => providerCorporationId === payload)
    state.corporations.splice(findIndex, 1)
  },
  SET_ALL_STAFFING_AGENCIES(state, payload) {
    state.allStaffingAgencies = payload
  },
  SET_ASSOCIATED_CORPORATIONS(state, payload) {
    state.associatedCorporations = payload
  },
  ADD_STAFFING_AGENCY(state, payload) {
    state.allStaffingAgencies.push(
      {
        ...payload
      }
    )
  },
  ADD_ASSOCIATED_CORPORATIONS(state, payload) {
    state.associatedCorporations.push({
      ...payload
    })
  },
  SET_OTHER_EARNINGS(state, payload) {
    state.otherEarnings = payload
  },
  CREATE_OTHER_EARNING_RATE(state, payload) {
    state.otherEarnings.push({
      ...payload
    })
  },
  UPDATE_OTHER_EARNING_RATE(state, payload) {
    const findIndex = state.otherEarnings.findIndex(({ otherEarningsRateId }) => otherEarningsRateId === payload.otherEarningsRateId)
    state.otherEarnings.splice(findIndex, 1, { ...payload })
  },
  DELETE_OTHER_EARNING_RATE(state, payload) {
    const findIndex = state.otherEarnings.findIndex(({ otherEarningsRateId }) => otherEarningsRateId === payload)
    state.otherEarnings.splice(findIndex, 1)
  }

};
export const actions = {
  async getAllProviders({ commit }) {
    return await api.get('/provider/getAllProviders/')
      .then((response) => {
        console.log(response)
        commit('SET_PROVIDERS', response.data)
      })
  },
  async createProvider({ commit }, data) {
    return await api.post('/provider/createProvider/', data)
      .then((response) => {
        commit('CREATE_PROVIDER', response.data)
        return response.success
      })
  },
  setProviderInfo ({ commit }, data) {
    commit('SET_SELECTED_PROVIDER_INFO', data)
  },
  async updateProvider({ commit }, data) {
    return await api.post('/provider/updateProvider/', data)
      .then((response) => {
        response.success && commit('UPDATE_PROVIDER', response.data)
        return response.success
      })
  },
  async deleteProvider({ commit }, providerId) {
    return await api.post('/provider/deleteProvider?providerId=' + providerId)
      .then((response) => {
        response.success && commit('DELETE_PROVIDER', providerId)
        return response.success
      })
  },
  
  async getSessionRatesForProvider({ commit }, providerId) {

    return await api.get('/sessionRate/getSessionRatesForProvider?providerId=' + providerId)
      .then((response) => {
        console.log(response)
        commit('SET_SESSION_RATES', response.data)
      })
  },
  async createSessionRate({ commit }, data) {
    return await api.post('/sessionRate/createSessionRate', data)
      .then((response) => {
        if(response.success)commit('CREATE_SESSION_RATE', response.data)
        return response.success
      })
  },
  async updateSessionRate({ commit }, data) {
    return await api.post('/sessionRate/updateSessionRate', data)
      .then((response) => {
        if(response.success)commit('UPDATE_SESSION_RATE', response.data)
        return response.success
      })
  },
  async deleteSessionRate({ commit }, data) {
    return await api.post('/sessionRate/deleteSessionRate?sessionRateId=' + data)
      .then((response) => {
        if(response.success)  commit('DELETE_SESSION_RATE', data)
        return response.success
      })
  },

  async getAllProviderCorporations({ commit }) {
    return await api.get('/providerCorporation/getAllProviderCorporations/')
      .then((response) => [
        commit('SET_CORPORATIONS', response.data)
      ])
  },
  async createProviderCorporation({ commit }, data) {
    return await api.post('/providerCorporation/createProviderCorporation/', data)
      .then((response) => {
        commit('CREATE_CORPORATION', response.data)
        if(response.data.isStaffingAgency) commit('ADD_STAFFING_AGENCY', response.data)
        else commit('ADD_ASSOCIATED_CORPORATIONS', response.data)
        return response
      })
  },
  async updateProviderCorporation({ commit }, data) {
    return await api.post('/providerCorporation/updateProviderCorporation/', data)
      .then((response) => {
        commit('UPDATE_CORPORATION', response.data)
        return response.success
      })
  },
  async deleteProviderCorporation({ commit }, data) {
    return await api.post('/providerCorporation/deleteProviderCorporation?providerCorporationId=' + data)
      .then((response) => {
        commit('DELETE_CORPORATION', data)
        return response
      })
  },
  async getAllStaffingAgencies({ commit }) {
    return await api.get('/providerCorporation/getStaffingAgencies/')
    .then((response) => {
      console.log(response.data, 'all staffing agencies')
      commit('SET_ALL_STAFFING_AGENCIES', response.data)
    })
  },
  async getCorporationsForProvider({ commit }, data) {
    return await api.get('/providerCorporation/getCorporationsForProvider?providerId=' + data)
    .then((response) => {
      console.log(response.data, 'all associated agencies')
      commit('SET_ASSOCIATED_CORPORATIONS', response.data)
    })
  },
  async getOtherEarningRatesForProvider({ commit }, data) {
    return await api.get('/otherEarningsRate/getOtherEarningsRatesForProvider?providerId=' + data)
    .then((response) => [
      commit('SET_OTHER_EARNINGS', response.data)
    ])
  },

  async createOtherEarningsRate({ commit }, data) {
    return await api.post('/otherEarningsRate/createOtherEarningsRate', data)
      .then((response) => {
        if(response.success)commit('CREATE_OTHER_EARNING_RATE', response.data)
        return response.success
      })
  },
  async updateOtherEarningsRate({ commit }, data) {
    return await api.post('/otherEarningsRate/updateOtherEarningsRate', data)
      .then((response) => {
        if(response.success)commit('UPDATE_OTHER_EARNING_RATE', response.data)
        return response.success
      })
  },
  async deleteOtherEarningsRate({ commit }, data) {
    return await api.post('/otherEarningsRate/deleteOtherEarningsRate?otherEarningsRateId=' + data)
      .then((response) => {
        if(response.success)  commit('DELETE_OTHER_EARNING_RATE', data)
        return response.success
      })
  },
};
export const getters = {
  providers: ({ providers }) => providers,
  selectedProviderId: ({ selectedProviderId }) => selectedProviderId,
  selectedProviderName: ({ selectedProviderName }) => selectedProviderName,
  sessionRates: ({ sessionRates }) => sessionRates,
  corporations: ({ corporations }) => corporations,
  allStaffingAgencies: ({ allStaffingAgencies }) => allStaffingAgencies,
  associatedCorporations: ({ associatedCorporations }) => associatedCorporations,
  otherEarnings: ({ otherEarnings }) => otherEarnings,
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};