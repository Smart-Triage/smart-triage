import Vue from 'vue'
import UUID from 'vue-uuid'
import moment from 'moment'

import i18n from '@/plugins/i18n'

import NavBar from '@/components/NavBar'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'

Vue.use(UUID)

Vue.config.productionTip = false
Vue.config.ignoredElements = ['ion-icon']

Vue.component('NavBar', NavBar)

Vue.filter('formatDate', value => {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
  return ''
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line no-console
console.info(`
🍱 This app was bootstrapped with bento-starter 🍱

👉 https://bento-starter.netlify.com/

`)
