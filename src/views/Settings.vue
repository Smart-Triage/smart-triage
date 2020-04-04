<template>
  <div class="main-container">
    <NavBar :back-btn="true"></NavBar>
    <h1>{{ $t('SETTINGS.SETTINGS') }}</h1>
    <div class="main-content settings-content">
      <p class="p-4"><strong>{{ $t('SETTINGS.APP_LANGUAGE') }}</strong><LocaleChanger class="px-4"></LocaleChanger></p>

    </div>
    <button class="link btn-primary mt-auto p-4" @click="deleteAllData">
      {{ $t('SETTINGS.DELETE_ALL_DATA') }}
    </button>

    <router-link class="p-4" to="/about">{{
      $t('SETTINGS.ABOUT')
      }}</router-link>
  </div>
</template>

<script>
import LocaleChanger from '@/components/LocaleChanger'

export default {
  components: {
    LocaleChanger
  },
  methods: {
    deleteAllData() {
      // eslint-disable-next-line no-alert
      const r = window.confirm(this.$t('ALERT.DELETE_ALL_DATA'))
      if (r === true) {
        localStorage.removeItem('vuex')
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
