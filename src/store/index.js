import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import authentication from './authentication'
import app from './app'
import patients from './patients'
import settings from './settings'
import questions from './questions'
import employee from './employee'

Vue.use(Vuex)

/* If you don't know about Vuex, please refer to https://vuex.vuejs.org/ */

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    patients: state.patients,
    settings: state.settings,
    employee: state.employee
  })
})

console.log(process.env)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    appVersion: process.env.VUE_APP_VERSION || '0',
    buildDate: process.env.VUE_APP_BUILD_DATE || ''
  },
  getters: {
    appVersion: state => state.appVersion,
    buildDate: state => state.buildDate
  },
  modules: {
    authentication,
    app,
    patients,
    settings,
    questions,
    employee
  },
  plugins: [vuexLocal.plugin]
})
