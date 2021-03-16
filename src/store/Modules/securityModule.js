import mgr from "../../security/security.js";
import * as api from '../Services/api'


export const state = {
  isAuthenticated: false,
  user: '',
  requiresAuth: false
};
export const mutations = {
  setUser(state, payload)
  {
    state.user = payload;
  },
  setRequiresAuth(state, payload)
  {
    state.requiresAuth = payload;
  },
  setIsAuthenticated(state, payload)
  {
    state.isAuthenticated = payload;
  }

};
export const getters = {
 
};
export const actions = {

  //Shallow authentication is useful if we want to get the user from cache, even for a page where login is not required.
  async shallowAuthenticate({ commit, state, dispatch })
  {
    await mgr.signinSilent().then(user =>
    {
    }).catch(e =>
    {
    });
 
    let user = await mgr.getUser();
    if (!!user)
    {
      state.user = user;
      //Here, load whatever user data is specific to the application.
      state.isAuthenticated = true;
    } else
    {
      state.isAuthenticated = false;
    }
  },
  async authenticate({ commit, state, dispatch }, returnPath)
  {
    commit("uxModule/setShowLoader", true, {
      root: true
    });
    let user = await mgr.getUser();
    if (!!user)
    {
      state.user = user;
      //Here, load whatever user data is specific to the application.
      state.isAuthenticated = true;
      commit("uxModule/setShowLoader", false, {
        root: true
      });
    } else
    {
      var signedIn = await returnPath
        ? mgr.signinRedirect({ state: returnPath })
        : mgr.signinRedirect();
      commit("uxModule/setShowLoader", false, {
        root: true
      });
    }
  },
  async logout({ commit, state })
  {
    state.isAuthenticated = false;
    await mgr.signoutRedirect();
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
