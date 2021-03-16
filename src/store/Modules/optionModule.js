import * as api from "../Services/api.js";
export const state = {
    disciplines: [],
    earningsCodes: [],
    genders: [],
    languages: [],
    phoneTypes: [],
    programs: [],
    rateUnitTypes: [],
    services: [],
    assoicatedServices: [],
    sessionLocationCategories: [],
    sessionLocations: [],
    taxStatuses: [],
    titles: [],
    omniCorporationDivisions: [],
    usStates: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
};
export const mutations = {
    SET_OPTIONS(state, payload){
        state.disciplines = payload.disciplines 
        state.earningsCodes = payload.earningsCodes
        state.genders = payload.genders 
        state.languages = payload.languages 
        state.phoneTypes = payload.phoneTypes 
        state.programs = payload.programs 
        state.rateUnitTypes = payload.rateUnitTypes 
        state.services = payload.services 
        state.sessionLocationCategories = payload.sessionLocationCategories 
        state.sessionLocations = payload.sessionLocations 
        state.taxStatuses = payload.taxStatuses 
        state.titles = payload.titles 
        state.omniCorporationDivisions = payload.omniCorporationDivisions
    },
    GET_SERVICES_FROM_DISCIPLINES(state, payload) {
        let arr = []
        payload.map(item => {
            state.disciplines[item].services.map(itm => {
                arr.push(itm)
            })            
        })
        state.assoicatedServices = arr.filter((service, index) => {
            const _service = JSON.stringify(service);
            return index === arr.findIndex(obj => {
              return JSON.stringify(obj) === _service;
            });
          });
    }
};
export const getters = {
    disciplines: ({disciplines}) => {
        let buf = []
        disciplines.map(item => {
            buf.push({
                disciplineId: item.disciplineId,
                name: item.name
            })
        })
        return buf
    },
    earningsCodes: ({ earningsCodes }) => earningsCodes,
    genders: ({ genders }) => genders,
    languages: ({ languages }) => languages,
    phoneTypes: ({ phoneTypes }) => phoneTypes,
    programs: ({ programs }) => programs,
    rateUnitTypes: ({ rateUnitTypes }) => rateUnitTypes,
    services: ({ services }) => services,
    assoicatedServices: ({ assoicatedServices }) => assoicatedServices,
    sessionLocationCategories: ({ sessionLocationCategories }) => sessionLocationCategories,
    sessionLocations: ({ sessionLocations }) => sessionLocations,
    taxStatuses: ({ taxStatuses }) => taxStatuses,
    titles: ({ titles }) => titles,
    omniCorporationDivisions: ({ omniCorporationDivisions }) => omniCorporationDivisions,
    usStates: ({  usStates }) => usStates,
};
export const actions = {
    async getAllOptions({commit}) {
        await api.get('/options/providerRatesAndPayrollOptions')
            .then((res) => {
                commit('SET_OPTIONS', res.data)
                console.log(res)
            })
    },
    async getAssoicatedServicesFromDisciplines({ commit }, data) {
        commit('GET_SERVICES_FROM_DISCIPLINES', data)
    },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
