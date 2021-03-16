export const state = {}

export const mutations = {
  //For drilling down to lists and objects
  //tier 0 - state[objName]
  //tier 1 - state[objName][propName] -- state[NoteParams][visitCode]
  //tier 2 - state[objName][propName][subPropName]
  //tier 3 - state[objName][propName][index]
  //tier 4 - state[objName][propName][index][subPropName]
  //tier 5 - state[objName][index][propName] - state[cases][2][nyeisid]
  //tier 6 - state[objName][index][propName][subIndex][subPropName] - state[cases][2][eiReferrals][1][referralDate]
  //tier 7 - state[objName][index][probName][subPropName] - state[questions][2][formField][label]
  //tier 8 - state[objName][propName][subPropName][index][subSubPropName][subIndex][subSubSubPropName] - state[templateList][caseReceived][items][3][childItems][2][name]
  setTier0(state, payload) {
    this.state[payload.moduleName][payload.objName] = payload.value
  },

  setTier1(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.propName] = payload.value
  },

  setTier2(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.propName][payload.subPropName] =
      payload.value
  },

  setTier3(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.propName][payload.index] = payload.value
  },

  setTier4(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.propName][payload.index][
      payload.subPropName
    ] = payload.value
  },

  setTier5(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.index][payload.propName] = payload.value
  },

  setTier6(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.index][payload.propName][payload.subIndex][
      payload.subPropName
    ] = payload.value
  },
    setTier7(state, payload) {
      this.state[payload.moduleName][payload.objName][payload.index][payload.propName][payload.subPropName] = payload.value;
  },
  setTier8(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.propName][payload.subPropName][payload.index][payload.subSubPropName][payload.subIndex][payload.subSubSubPropName] = payload.value;
  },
  setTier9(state, payload) {
    this.state[payload.moduleName][payload.objName][payload.propName][payload.subPropName][payload.index][payload.subSubPropName] = payload.value;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}
