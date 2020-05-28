import i18n from '@/plugins/i18n'

export default {
  methods: {
    isFinished(patient) {
      return !!(
        patient.id !== undefined &&
        typeof patient.id === 'string' &&
        patient.id.length > 0 &&
        //
        // Check firstName
        patient.firstName !== undefined &&
        typeof patient.firstName === 'string' &&
        patient.firstName.length > 0 &&
        //
        // Check lastName
        patient.lastName !== undefined &&
        typeof patient.lastName === 'string' &&
        patient.lastName.length > 0 &&
        //
        // Check birthNumber
        // patient.birthNumber !== undefined &&
        // typeof patient.birthNumber === 'string' &&
        // patient.birthNumber.length > 0 &&
        //
        // Check phoneNumber
        // patient.phoneNumber !== undefined &&
        // typeof patient.phoneNumber === 'string' &&
        // patient.phoneNumber.length > 0 &&
        // Check Birth Date
        patient.birthDate !== undefined &&
        typeof patient.birthDate === 'string' &&
        patient.birthDate.length > 0 &&
        //
        // Check answers
        patient.answers !== undefined &&
        Object.keys(patient.answers).length >=
          this.$config.formSteps[i18n.locale].requiredAnswers - 1
      )
    }
  }
}
