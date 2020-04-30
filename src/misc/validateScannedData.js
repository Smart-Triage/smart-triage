export default function validatePatient(
  data,
  currentPatient,
  scanningConfirmationCode,
  verifying,
  getFormSteps
) {
  return new Promise((resolve, reject) => {
    let patient
    try {
      patient = JSON.parse(data)

      // console.log(patient)

      // Validate JSON schema
      const incommingKeys = Object.keys(patient)
      const requiredKeys = [
        'id',
        // 'firstName',
        // 'lastName',
        // 'birthNumber',
        // 'phoneNumber',
        'answers',
        'termsAccepted',
        'validityTimestamp'
      ]
      if (scanningConfirmationCode || verifying) requiredKeys.push('signature')
      const optionalKeys = [
        'confirmation',
        'isCovidSuspected',
        'finished',
        'measuredTemperature'
      ]

      requiredKeys.forEach(key => {
        if (incommingKeys.indexOf(key) === -1)
          throw Error(`Error: Missing key "${key}" in JSON`)
      })

      // we want a timestamp in a proper object format, validation comes later on
      patient.validityTimestamp = new Date(patient.validityTimestamp)

      const incommingAnswers = Object.keys(patient.answers)
      const requiredAnswers = getFormSteps
        .map(step => step.order)
        .filter(stepNum => stepNum !== '0' && stepNum.length <= 1)

      requiredAnswers.forEach(answer => {
        if (incommingAnswers.indexOf(answer) === -1)
          throw Error(`Error: Missing answer "${answer}"  in JSON`)
      })

      // Remove keys, we don't need
      Object.keys(patient).forEach(key => {
        if (
          requiredKeys.indexOf(key) === -1 &&
          optionalKeys.indexOf(key) === -1
        )
          delete patient[key]
      })

      if (scanningConfirmationCode) {
        if (
          currentPatient.id !== patient.id ||
          // currentPatient.firstName !== patient.firstName ||
          // currentPatient.lastName !== patient.lastName ||
          // currentPatient.birthNumber !== patient.birthNumber ||
          // currentPatient.phoneNumber !== patient.phoneNumber ||
          new Date(currentPatient.validityTimestamp).getTime() !==
            patient.validityTimestamp.getTime()
        ) {
          reject(new Error('WRONG_PATIENT'))
        } else {
          // Resolve with valid patient object
          resolve(patient)
        }
      } else {
        // Resolve with valid patient object
        resolve(patient)
      }
    } catch (e) {
      reject(new Error('INVALID_QR_CODE'))
    }
  })
}
