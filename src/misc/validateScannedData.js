function parsePatientCSVtoObject(data, formSteps) {
  const keys = [
    'appVersion',
    'answers',
    'id',
    'validityTimestamp',
    'confirmation'
  ]
  const confirmationKeys = [
    'name',
    'id',
    'timestamp',
    'issuedFor',
    'infectionSuspected',
    'temperature'
  ]
  let keyIndex = 0
  let confirmationKeyIndex = 0
  const patientObject = {}
  const rowsArray = data.split('\n')
  let confirmationRows
  // -1 because of confirmation is another whole object
  const patientRows = rowsArray.splice(0, keys.length - 1)
  if (rowsArray.length > 4) {
    confirmationRows = rowsArray.splice(0, confirmationKeys.length)
  }

  // parse patient part
  patientRows.forEach(value => {
    const parsedRow = value.split(';')
    if (parsedRow.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      patientObject[keys[keyIndex]] = parsedRow[0]
    } else {
      const answersObject = {}
      parsedRow.forEach(answerField => {
        const answer = answerField.split(',')
        if (answer.length === 2) {
          if (
            formSteps.find(s => s.order === answer[0]).answerType === 'one-of'
          ) {
            // eslint-disable-next-line prefer-destructuring
            answersObject[answer[0]] = answer[1]
          } else {
            answersObject[answer[0]] = answer[1] === 'true'
          }
        } else {
          const checkBoxObject = []
          const stepOrder = answer.shift()
          answer.forEach(checkBoxField => {
            const checkboxAnswer = {}
            const checkBoxInfo = checkBoxField.split('.')

            // eslint-disable-next-line prefer-destructuring
            checkboxAnswer.value = checkBoxInfo[0]
            // eslint-disable-next-line prefer-destructuring
            checkboxAnswer.isChecked = checkBoxInfo[1] === 'true'
            // eslint-disable-next-line prefer-destructuring

            checkboxAnswer.text = formSteps
              .find(s => s.order === stepOrder)
              .options.find(o => o.value === checkBoxInfo[0]).text
            checkBoxObject.push(checkboxAnswer)
          })
          answersObject[stepOrder] = checkBoxObject
        }
      })
      patientObject[keys[keyIndex]] = answersObject
    }
    keyIndex += 1
  })

  // parse confirmation part
  if (confirmationRows) {
    const confirmationObj = {}
    confirmationRows.forEach(value => {
      const parsedRow = value.split(';')
      // eslint-disable-next-line prefer-destructuring
      confirmationObj[confirmationKeys[confirmationKeyIndex]] = parsedRow[0]
      confirmationKeyIndex += 1
    })
    patientObject[keys[keyIndex]] = confirmationObj
  }
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
      patient = parsePatientCSVtoObject(data, getFormSteps)
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
