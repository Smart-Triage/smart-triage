import Vue from 'vue'
import i18n from '@/plugins/i18n'
import Router from 'vue-router'
import VueHead from 'vue-head'
import Home from '@/views/Home'
import CheckLogin from '@/views/employee/CheckLogin'
import { isNil } from 'lodash'
import store from '@/store'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(VueHead, {
  separator: '-',
  complement: i18n.t('APP_TITLE')
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    // Scroll to top on navigation
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/form',
      name: 'form',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-form" */ '@/views/patient/Form.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/compatibility-check',
      name: 'compatibility-check',
      component: () => import('@/views/CompatibilityCheck.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/summary',
      name: 'summary',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-summary" */ '@/views/patient/Summary.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/patient-qr-code',
      name: 'patient-qr-code',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-summary" */ '@/views/patient/PatientQRCode.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/scan-confirmation-qr-code',
      name: 'scan-confirmation-qr-code',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-summary" */ '@/views/patient/ScanConfirmationQRCode.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/employee',
      name: 'employee',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-employee" */ '@/views/employee/Employee.vue'
        )
    },
    {
      path: '/zamestnanec',
      redirect: { name: 'employee' }
    },
    {
      path: '/verify',
      name: 'verify',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-summary" */ '@/views/employee/VerifyConfirmationValidity.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/print-barcode',
      name: 'print-barcode',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-employee" */ '@/views/employee/PrintBarcode.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-settings" */ '@/views/HowItWorks.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-settings" */ '@/views/Admin.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-settings" */ '@/views/Settings.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-settings" */ '@/views/About.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/video',
      name: 'video',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-video" */ '@/views/Video.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-login" */ '@/views/employee/Login.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    { path: '*', redirect: '/' }
  ]
})

/* Wait fir VuexPersistence to restore the store */
const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored
  next()
}
router.beforeEach(waitForStorageToBeReady)

/**
 * Handle user redirections
 */
// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    isNil(store.state.authentication.user)
  ) {
    const path =
      store.state.authentication.user === null ? '/login' : '/check-login'
    return next(`${path}?redirectUrl=${to.path}`)
  }
  next()
})

export default router
