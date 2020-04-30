export default {
  methods: {
    isConfirmed(patient) {
      return !!(
        patient.confirmation &&
        patient.confirmation.confirmedById.length > 0 &&
        patient.confirmation.confirmedByName.length > 0 &&
        patient.confirmation.issuedForHospital.length > 0 &&
        patient.confirmation.timestamp
      )
    }
  }
}
