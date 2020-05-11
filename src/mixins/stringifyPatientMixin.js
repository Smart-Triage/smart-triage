export default {
  methods: {
    stringifyPatient(patient) {
      const filteredPatient = Object.keys(patient)
        .filter(
          key =>
            ['id', 'answers', 'confirmation', 'validityTimestamp'].indexOf(
              key
            ) > -1
        )
        .reduce((res, key) => Object.assign(res, { [key]: patient[key] }), {})
      return this.convertPatientToCSV(filteredPatient)
    },
    convertPatientToCSV(patientObj) {
      let csvString = `${this.$store.getters.appVersion}\n`
      Object.entries(patientObj.answers).forEach(
        answer => (csvString += `${answer[1]};`)
      )
      csvString = csvString.slice(0, -1)
      csvString += '\n'
      delete patientObj.answers
      Object.entries(patientObj).forEach(val => {
        csvString += `${val[1]}\n`
      })
      return csvString.slice(0, -1)
    }
  }
}
