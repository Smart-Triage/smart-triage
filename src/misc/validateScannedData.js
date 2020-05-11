function parsePatientCSVtoObject(data) {
  const keys = ['appVersion', 'answers', 'id', 'validityTimestamp']
  let keyIndex = 0
  const patientObject = {}
  const rowsArray = data.split('\n')
  rowsArray.forEach(value => {
    const parsedRow = value.split(';')
    if (parsedRow.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      patientObject[keys[keyIndex]] = parsedRow[0]
    } else {
      let fieldCounter = 1
      const fieldObject = {}
      parsedRow.forEach(fieldValue => {
        fieldObject[fieldCounter] = fieldValue
        fieldCounter += 1
      })
      patientObject[keys[keyIndex]] = fieldObject
    }
    keyIndex += 1
  })
  // eslint-disable-next-line radix
  patientObject.validityTimestamp = parseInt(patientObject.validityTimestamp)
  return patientObject
}

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
      patient = parsePatientCSVtoObject(data)

      // Validate JSON schema
      const incommingKeys = Object.keys(patient)
      const requiredKeys = ['id', 'answers', 'validityTimestamp']
      // if (scanningConfirmationCode || verifying) requiredKeys.push('signature')
      const optionalKeys = ['confirmation']

      requiredKeys.forEach(key => {
        if (incommingKeys.indexOf(key) === -1)
          throw Error(`Error: Missing key "${key}" in JSON`)
      })

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
          currentPatient.validityTimestamp !== patient.validityTimestamp
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
