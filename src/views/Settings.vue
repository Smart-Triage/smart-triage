<template>
  <div class="page-wrapper">
    <NavBar sticky back-button></NavBar>
    <div class="page-content">
      <h1>{{ $t('SETTINGS.SETTINGS') }}</h1>
      <p class="p-4">
        <strong>{{ $t('SETTINGS.APP_LANGUAGE') }}</strong>
        <LocaleChanger class="px-4"></LocaleChanger>
      </p>
      <p v-if="availableAppModes.length > 1" class="p-4">
        <strong>{{ $t('SETTINGS.APP_MODE') }}</strong>
        <span class="px-4">
          <select
            class="px-4 py-1 rounded-full bg-white"
            :value="appMode"
            @change="setAppMode($event.target.value)"
          >
            <option
              v-for="mode in availableAppModes"
              :key="`${mode}-mode`"
              :value="mode"
              :selected="appMode === mode"
              >{{ $t(`SETTINGS.${mode.toUpperCase()}`) }}</option
            >
          </select>
        </span>
      </p>
      <button class="link btn-primary mt-auto p-4" @click="deleteAllData">
        {{ $t('SETTINGS.DELETE_ALL_DATA') }}
      </button>

      <router-link class="p-4" to="/about">{{
        $t('SETTINGS.ABOUT')
      }}</router-link>
    </div>
  </div>
</template>

<script>
import LocaleChanger from '@/components/LocaleChanger'
import firebase from 'firebase/app'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    LocaleChanger
  },
  computed: {
    ...mapState('settings', ['appMode', 'availableAppModes']),
    ...mapState('authentication', ['user'])
  },
  methods: {
    ...mapActions('settings', ['setAppMode']),
    async deleteAllData() {
      // eslint-disable-next-line no-alert
      const r = window.confirm(this.$t('ALERT.DELETE_ALL_DATA'))
      if (r === true) {
        localStorage.clear()
        sessionStorage.clear()

        if (this.user) await firebase.auth().signOut()

        if (window.indexedDB.databases !== undefined) {
          await window.indexedDB.databases().then(databases => {
            databases.forEach(db => window.indexedDB.deleteDatabase(db.name))
          })
        }

        // eslint-disable-next-line no-alert
        alert(this.$t('ALERT.ALL_DATA_CLEARED'))

        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-content {
  @apply justify-start;
}
</style>
