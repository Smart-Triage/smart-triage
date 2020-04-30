export default {
  methods: {
    stringifyPatient(patient) {
      const filteredPatient = Object.keys(patient)
        .filter(
          key =>
            [
              'id',
              // 'firstName',
              // 'lastName',
              // 'birthNumber',
              // 'phoneNumber',
              'answers',
              'confirmation',
              'isCovidSuspected',
              // 'signature',
              'measuredTemperature',
              'validityTimestamp'
            ].indexOf(key) > -1
        )
        .reduce((res, key) => Object.assign(res, { [key]: patient[key] }), {})

      return JSON.stringify(filteredPatient)
    }
  }
}
