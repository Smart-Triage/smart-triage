export default {
  methods: {
    isConfirmed(patient) {
      return !!(
        patient.confirmation &&
        patient.confirmation.id.length > 0 &&
        patient.confirmation.name.length > 0 &&
        patient.confirmation.issuedFor.length > 0 &&
        patient.confirmation.timestamp
      )
    }
  }
}
