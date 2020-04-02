import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import authentication from './authentication'
import app from './app'
// import products from './products'
import patients from './patients'
import settings from './settings'
import questions from './questions'

Vue.use(Vuex)

/* If you don't know about Vuex, please refer to https://vuex.vuejs.org/ */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    patients: state.patients,
    settings: state.settings
  })
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    appVersion: process.env.VUE_APP_VERSION || '0'
  },
  getters: {
    appVersion: state => state.appVersion
  },
  modules: {
    // authentication,
    app,
    // products,
    patients,
    settings,
    questions
  },
  plugins: [vuexLocal.plugin]
})
