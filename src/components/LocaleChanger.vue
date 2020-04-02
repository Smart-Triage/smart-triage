<template>
  <span class="locale-changer">
    <select v-model="$i18n.locale" @change="setLocale($event.target.value)">
      <option
        v-for="lang in langs"
        :key="`lang-${lang.code}`"
        :value="lang.code"
        :selected="locale === lang.code"
        >{{ lang.text }}</option
      >
    </select>
  </span>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      langs: [
        { text: 'Česky', code: 'cs' },
        { text: 'English', code: 'en' }
      ]
    }
  },
  computed: {
    ...mapState('settings', ['locale'])
  },
  methods: {
    ...mapMutations('settings', ['setLocale'])
  }
}
</script>

<style></style>
