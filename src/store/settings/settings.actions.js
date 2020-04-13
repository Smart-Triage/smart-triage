export default {
  resetAppMode: ({ commit }) => {
    commit('setAppMode', 'patient')
  },
  setAppMode: ({ commit, state }, mode) => {
    if (state.availableAppModes.includes(mode)) commit('setAppMode', mode)
  },
  enableAppMode: ({ state, commit }, modeToEnable) => {
    if (!state.availableAppModes.includes(modeToEnable))
      commit('enableAppMode', modeToEnable)
  }
}
