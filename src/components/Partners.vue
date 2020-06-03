<template>
  <div
    class="text-center w-full max-w-lg home-h2-secondary bg-white px-6 py-4 my-8 border-app"
  >
    <h2>{{ $t('HOME.PARTNERS_H') }}</h2>
    <div class="w-full flex justify-around items-center my-8">
      <a :href="artinLink">
        <img
          src="@/assets/img/partners-logos/artin.png"
          alt="Artin company logo"
      /></a>

      <a href="https://cuni.cz/">
        <img
          src="@/assets/img/charles-university-logo.png"
          alt="Charles University logo"
        />
      </a>
    </div>
  </div>
</template>

<script>
import i18n from '@/plugins/i18n'

export default {
  name: 'Partners',
  computed: {
    // a computed getter
    artinLink() {
      if (i18n.locale === 'cs') {
        return 'https://artin.cz'
      }
      return 'https://www.artin.sk/'
    }
  }
}
</script>

<style scoped></style>
