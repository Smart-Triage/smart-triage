<template>
  <span class="locale-changer">
    <select
      v-model="$i18n.locale"
      class="p-2 px-4 rounded-full"
      @change="setLocale($event.target.value)"
    >
      <option
        v-for="locale in supportedLocales"
        :key="`lang-${locale.langCode}`"
        :value="locale.langCode"
        :selected="locale === locale.langCode"
        >{{ locale.langName }}</option
      >
    </select>
  </span>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('settings', ['locale', 'supportedLocales'])
  },
  methods: {
    ...mapMutations('settings', ['setLocale'])
  }
}
</script>

<style></style>
