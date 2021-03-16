import * as api from "../Services/api.js";


const state = {
  //Validation status - to determine if continue button on forms should be active
  //For ux
  showNavDrawer: false,
  showLoader: false,
  loaderMsg: "",
  showSnackbar: false,
  snackbarMsg: ""
};
const actions = {
  async sendFeedbackEmail({ commit, state }, payload)
  {
    commit("uxModule/setShowLoader", true, { root: true });
    commit("uxModule/setShowSnackbar", false, { root: true });
    console.log("in send feedback email action " + payload.formData);
    api.sendFeedbackEmail(payload.feedbackParams).then(response =>
    {
      commit("uxModule/setShowLoader", false, { root: true });
      if (response.data.success)
      {
        var msg = response.data.message;
        commit("uxModule/setSnackbarMsg", msg, {
          root: true
        });
      } else
      {
        var msg = "Your feedback email was not sent. " + response.data.message;
        commit("uxModule/setSnackbarMsg", msg, {
          root: true
        });
      }
      commit("uxModule/setShowSnackbar", true, { root: true });
    });
  },
  async showLoader({ commit }, payload) {
    commit("uxModule/setShowLoader", true, { root: true });
    commit("uxModule/setLoaderMsg", payload, { root: true });    
  },
  async hideLoader({ commit }) {
    commit("uxModule/setShowLoader", false, { root: true });
  },
  async showSnackBarMsg({ commit }, payload) {
    commit("uxModule/setShowSnackbar", true, { root: true });
    commit("uxModule/setSnackbarMsg", payload, {
      root: true
    });
  }
};
const mutations = {
  setShowLoader(state, val)
  {
    state.showLoader = val;
    if (val == false)
    {
      state.loaderMsg = "";
    }
  },

  setShowSnackbar(state, val)
  {
    if (val == true)
    {
      setTimeout(function ()
      {
        state.showSnackbar = false;
      }, 6000);
    }
    state.showSnackbar = val;
  },

  setSnackbarMsg(state, val)
  {
    state.snackbarMsg = val;
  },

  setLoaderMsg(state, val)
  {
    state.loaderMsg = val;
  },

  toggleShowNavDrawer(state)
  {
    state.showNavDrawer = !state.showNavDrawer;
  },
  setShowNavDrawer(state, payload)
  {
    state.showNavDrawer = payload.value;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
