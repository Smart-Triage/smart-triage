<template>
  <div class="container">
    <div class="top-buttons">
      <router-link class="icon-button" to="/home"
        ><ion-icon name="arrow-back-outline" size="large"></ion-icon
      ></router-link>
    </div>
    <h1>{{ $t('SETTINGS.SETTINGS') }}</h1>

    <p>{{ $t('SETTINGS.APP_LANGUAGE') }}<LocaleChanger></LocaleChanger></p>

    <button class="link btn-primary" @click="deleteAllData">
      {{ $t('SETTINGS.DELETE_ALL_DATA') }}
    </button>

    <router-link class="about-link" to="/about">{{
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
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 40rem;
  margin: 0 auto;

  .top-buttons {
    width: 100%;
    display: flex;
  }
}

.about-link {
  margin-top: 2rem;
}
</style>
