export default {
  methods: {
    isConfirmed(patient) {
      return !!(
        patient.confirmation &&
        patient.confirmation.confirmedById.length > 1 &&
        patient.confirmation.confirmedByName.length > 1 &&
        patient.confirmation.issuedForHospital.length > 1 &&
        patient.confirmation.timestamp
      )
    }
  }
}
