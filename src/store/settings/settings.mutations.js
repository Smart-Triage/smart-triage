export default {
  setLocale: (state, newLocale) => (state.locale = newLocale),
  setAppMode: (state, newMode) => (state.appMode = newMode),
  enableAppMode: (state, modeToEnable) =>
    state.availableAppModes.push(modeToEnable)
}
