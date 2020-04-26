<template>
  <span class="locale-changer">
    <select
      v-model="$i18n.locale"
      class="px-2 pt-1 rounded-full"
      :class="{
        'bg-transparent text-lg font-semibold text-gray-700': noBackground,
        'px-4 py-1 bg-white': !noBackground
      }"
      @change="setLocale($event.target.value)"
    >
      <option
        v-for="locale in supportedLocales"
        :key="`lang-${locale.langCode}`"
        :value="locale.langCode"
        :selected="locale === locale.langCode"
        >{{ short ? locale.langCode.toUpperCase() : locale.langName }}</option
      >
    </select>
  </span>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    short: { type: Boolean, default: false },
    noBackground: { type: Boolean, default: false }
  },
  computed: {
    supportedLocales() {
      return this.$config.supportedLocales
    }
  },
  methods: {
    ...mapMutations('settings', ['setLocale'])
  }
}
</script>

<style></style>
