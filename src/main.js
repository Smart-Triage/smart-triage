import Vue from 'vue'
import UUID from 'vue-uuid'
import moment from 'moment'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLogger from 'vuejs-logger'

import i18n from '@/plugins/i18n'
import vueConfig from 'vue-config'
import PortalVue from 'portal-vue'

import NavBar from '@/components/NavBar'

import config from '@/config/default.json'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'

import '@/theme/general.scss'
import './assets/css/tailwind.css'

const isProduction = process.env.NODE_ENV === 'production'

const loggerOptions = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: false,
  separator: ':',
  showConsoleColors: true
}

Vue.use(VueLogger, loggerOptions)
Vue.use(UUID)
Vue.use(VueAxios, axios)
Vue.use(vueConfig, config)
Vue.use(PortalVue)

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

Vue.component('NavBar', NavBar)

Vue.filter('formatDate', value => {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY HH:mm')
  }
  return ''
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
