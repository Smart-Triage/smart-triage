import { find } from 'lodash'

export default {
  createNewPatient: (state, patient) => state.patients.push(patient),

  /* Product input name */
  setPatientFirstName: (state, productNameToCreate) =>
    (state.productNameToCreate = productNameToCreate),

  setCurrentPatientId: (state, patientId) =>
    (state.currentPatientId = patientId),

  setCurrentPatientValueByKey: (state, { key, value }) => {
    return new Promise(resolve => {
      const p = find(
        state.patients,
        patient => patient.id === state.currentPatientId
      )

      p[key] = value

      resolve(
        (find(state.patients, patient => patient.id === state.currentPatientId)[
          key
        ] = value)
      )
    })
  },

  updatePatient: (state, patient) => {
    const index = state.patients.findIndex(p => p.id === patient.id)
    state.patients.splice(index, 1)
    return state.patients.push(patient)
  },

  removePatientById: (state, patientId) => {
    const index = state.patients.findIndex(patient => patient.id === patientId)
    state.patients.splice(index, 1)
  }
}
