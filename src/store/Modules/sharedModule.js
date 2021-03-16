import * as api from "../Services/api.js";

export const state = {};
export const mutations = {};
export const getters = {};
export const actions = {
  async sendFeedbackEmail({ commit, state }, payload) {
    commit("uxModule/setShowLoader", true, { root: true });
    commit("uxModule/setShowSnackbar", false, { root: true });
    console.log("in send feedback email action " + payload.formData);
    api.sendFeedbackEmail(payload.feedbackParams).then(response => {
      commit("uxModule/setShowLoader", false, { root: true });
      if (response.data.success) {
        var msg = response.data.message;
        commit("uxModule/setSnackbarMsg", msg, {
          root: true
        });
      } else {
        var msg = "Your feedback email was not sent. " + response.data.message;
        commit("uxModule/setSnackbarMsg", msg, {
          root: true
        });
      }
      commit("uxModule/setShowSnackbar", true, { root: true });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
