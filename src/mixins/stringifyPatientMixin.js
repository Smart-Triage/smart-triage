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

      Object.entries(patientObj.answers).forEach(answer => {
        if (answer[1] instanceof Object) {
          csvString += `${answer[0]},`
          Object.entries(answer[1]).forEach(checkBoxAnswer => {
            csvString += `${checkBoxAnswer[1].value}.${checkBoxAnswer[1].isChecked},`
          })
          // remove last -
          csvString = csvString.substring(0, csvString.length - 1)
          csvString += ';'
        } else {
          csvString += `${answer[0]},${answer[1]};`
        }
      })

      csvString = csvString.slice(0, -1)
      csvString += '\n'
      delete patientObj.answers

      // eslint-disable-next-line no-unused-vars
      let confirmationObj
      if (patientObj.confirmation) {
        confirmationObj = patientObj.confirmation
        delete patientObj.confirmation
      }
      Object.entries(patientObj).forEach(val => {
        csvString += `${val[1]}\n`
      })
      if (confirmationObj) {
        Object.entries(confirmationObj).forEach(val => {
          csvString += `${val[1]}\n`
        })
      }
      return csvString.slice(0, -1)
    }
  }
}
