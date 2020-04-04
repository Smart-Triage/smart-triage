import i18n from '@/plugins/i18n'

export default {
  getFormSteps: state => state.formSteps[i18n.locale],

  getMaxPoints: state => state.maxPoints
}
