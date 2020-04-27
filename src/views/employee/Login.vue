<template>
  <div class="page-wrapper">
    <NavBar slim>
      <template v-slot:right>
        <LocaleChanger short no-background></LocaleChanger>
      </template>
    </NavBar>
    <div class="page-content">
      <img
        v-if="locale == 'cs' || locale == 'sk'"
        class="h-16 mx-auto"
        src="@/assets/img/logo.svg"
        alt="Smart Triage logo"
      />
      <img
        v-else
        class="h-16 mx-auto"
        src="@/assets/img/logo_en.svg"
        alt="Smart Triage logo"
      />
      <p class="mb-4">
        <strong>{{ $t('LOGIN.ONLY_FOR_EMPLOYEES') }}</strong>
      </p>

      <p class="mb-4">
        {{ $t('LOGIN.ENTER_REGISTRATION_CODE') }}
      </p>

      <!-- Loader -->

      <div v-show="user === undefined" data-test="loader">
        {{ $t('LOGIN.AUTHENTICATING') }}...
      </div>

      <!-- Offline instruction -->
      <div v-show="!networkOnLine" data-test="offline-instruction">
        {{ $t('LOGIN.OFFLINE') }}
      </div>

      <p v-if="loginError" class="bg-red-500 text-white p-2 m-2 rounded">
        {{ $t(`SERVER_ERROR.${loginError}`) }}
      </p>

      <!-- Auth UI -->
      <form
        class="w-full flex flex-col items-center max-w-sm "
        @submit="register"
      >
        <div class="flex my-2">
          <input
            v-model="firstName"
            :placeholder="$t('FIRST_NAME')"
            type="text"
            class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal border-app mr-2"
            required
          />
          <input
            v-model="lastName"
            :placeholder="$t('LAST_NAME')"
            type="text"
            class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal border-app ml-2"
            required
          />
        </div>
        <input
          v-model="registrationCode"
          :placeholder="$t('LOGIN.REGISTRATION_CODE')"
          type="text"
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none leading-normal border-app m-2"
          required
        />

        <button
          v-show="user !== undefined && !user && networkOnLine"
          type="submit"
          data-test="login-btn"
          class="btn-primary my-2"
        >
          {{ $t('LOGIN.SEND') }}
        </button>
      </form>
      <div class="bottom-link">
        <router-link class="employee-page-link" to="/how-it-works">{{
          $t('HOME.HOW_IT_WORKS')
        }}</router-link>
        <router-link class="employee-page-link" to="/settings">{{
          $t('HOME.SETTINGS')
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert */

import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'
import KeyStore from '@/misc/KeyStore'
import PublicKeysDB from '@/firebase/public-keys-db'
import LocaleChanger from '@/components/LocaleChanger'

export default {
  components: {
    LocaleChanger
  },
  head() {
    return {
      title: {
        inner: this.$t('LOGIN.TITLE')
      }
    }
  },
  data: () => ({
    loginError: null,
    firstName: '',
    lastName: '',
    registrationCode: '',
    errorMessage: '',
    keyStore: null
  }),
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine']),
    ...mapState('settings', ['locale'])
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/employee'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (!window.crypto || !window.crypto.subtle) {
      alert(
        `${this.$t('ALERT.UNSUPPORTED_BROWSER')}. ${this.$t(
          'TRY_DIFFERENT_BROWSER'
        )}`
      )
      return
    }

    if (!window.indexedDB) {
      alert(
        `${this.$t('ALERT.UNSUPPORTED_BROWSER')}. ${this.$t(
          'TRY_DIFFERENT_BROWSER'
        )}`
      )
      return
    }

    this.keyStore = new KeyStore()
    this.keyStore
      .open()
      .catch(err => alert(`Could not open key store: ${err.message}`))
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    ...mapMutations('employee', ['setFirstName', 'setLastName', 'setHospital']),

    /* REGISTER EMPLOYEE */
    async register(e) {
      e.preventDefault()
      this.loginError = null
      this.setUser(undefined)

      try {
        const res = (
          await this.axios.post(
            'https://europe-west3-triage-app-8e193.cloudfunctions.net/api/checkEmployeeRegistrationCode',
            { registrationCode: this.registrationCode }
          )
        ).data
        if (!res.success) {
          this.loginError = res.error
          throw res.error
        }

        firebase
          .auth()
          .signInWithCustomToken(res.token)
          .then(async userCredential => {
            this.createKeyPair(userCredential)
            this.setFirstName(this.firstName)
            this.setLastName(this.lastName)
            if (res.hospital) this.setHospital(res.hospital)
            else this.setHospital('unknown')
          })
      } catch (err) {
        // Handle Errors here.
        this.loginError = err
        this.setUser(null)
      }
    },
    exportPublicKey(publicKey, userCredential) {
      window.crypto.subtle
        .exportKey(
          'jwk', // can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
          publicKey // can be a publicKey or privateKey, as long as extractable was true
        )
        .then(async keydata => {
          // returns the exported key data
          const publicKeysDB = new PublicKeysDB()
          publicKeysDB.create({ publicKey: keydata }, userCredential.user.uid)
        })
        .catch(err => console.error(err))
    },
    createKeyPair(userCredential) {
      window.crypto.subtle
        .generateKey(
          {
            name: 'ECDSA',
            namedCurve: 'P-256' // can be "P-256", "P-384", or "P-521"
          },
          false, // whether the key is extractable (i.e. can be used in exportKey)
          ['sign', 'verify'] // can be any combination of "sign" and "verify"
        )
        .then(keyPair => {
          this.exportPublicKey(keyPair.publicKey, userCredential)
          return this.keyStore.saveKey(
            keyPair.publicKey,
            keyPair.privateKey,
            'EMPLOYEE_PRIVATE_KEY'
          )
        })
        .catch(err => {
          alert(`Could not create and save new key pair: ${err.message}`)
        })
    }
  }
}
</script>
