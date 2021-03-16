import * as api from "../Services/api.js";
import SampleObject from "../../objs/SampleObject";
export const state = {
  object: new SampleObject(),
  firstName: "",
  lastName: ""
};
export const mutations = {
  setFirstName(state, payload) {
    state.firstName = payload;
  }
};
export const getters = {
  getNameForId: state => id => {
    return state.firstName;
  }
};
export const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
