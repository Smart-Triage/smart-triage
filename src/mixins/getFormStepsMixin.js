import i18n from '@/plugins/i18n'

export default {
  computed: {
    getFormSteps() {
      return this.$config.formSteps[i18n.locale]
    }
  }
}
