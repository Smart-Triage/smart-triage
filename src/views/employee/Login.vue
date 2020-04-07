<template>
  <div class="page-wrapper">
    <NavBar> </NavBar>
    <h1 class="login-page-title">{{ appTitle }}</h1>

    <p>{{ $t('LOGIN.ONLY_FOR_EMPLOYEES') }}</p>

    <p>
      {{ $t('LOGIN.ENTER_REGISTRATION_CODE') }}
    </p>

    <!-- Loader -->

    <div v-show="user === undefined" data-test="loader">Authenticating...</div>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      {{ $t('LOGIN.SEND') }}
    </div>

    <p v-if="loginError" class="bg-red-500 text-white p-2 m-2 rounded">
      {{ $t(`ERROR.${loginError}`) }}
    </p>
    <!-- Auth UI -->
    <input
      v-model="registrationCode"
      type="text"
      class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal max-w-xs"
    />
    <div
      v-show="user !== undefined && !user && networkOnLine"
      data-test="login-btn"
      class="login-btn"
      @click="register"
    >
      {{ $t('LOGIN.SEND') }}
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

export default {
  data: () => ({
    loginError: null,
    registrationCode: '',
    errorMessage: '',
    keyStore: null
  }),
  head() {
    return {
      title: {
        inner: 'Login'
      },
      meta: [
        {
          name: 'description',
          content: `Sign in or sign up to ${this.appTitle}`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
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
        'Your current browser does not support the Web Cryptography API! This page will not work.'
      )
      return
    }

    if (!window.indexedDB) {
      alert(
        'Your current browser does not support IndexedDB. This page will not work.'
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

    /* REGISTER EMPLOYEE */
    async register() {
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

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-page-title {
    text-align: center;
  }

  .login-btn {
    margin-top: 20px;
    cursor: pointer;
    padding: 5px 20px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #2c3e50;

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
