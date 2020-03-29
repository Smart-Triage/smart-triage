import { find } from 'lodash'

export default {
  createNewPatient: (state, patient) => state.patients.push(patient),

  /* Product input name */
  setPatientFirstName: (state, productNameToCreate) =>
    (state.productNameToCreate = productNameToCreate),

  setCurrentPatientId: (state, patientId) =>
    (state.currentPatientId = patientId),

  setCurrentPatientValueByKey: (state, { key, value }) => {
    const p = find(
      state.patients,
      patient => patient.id === state.currentPatientId
    )

    p[key] = value

    return (find(
      state.patients,
      patient => patient.id === state.currentPatientId
    )[key] = value)
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

  /* Products */
  // setProducts: (state, products) => (state.products = products),
  // addProduct: (state, product) => state.products.push(product),
  // removeProductById: (state, productId) => {
  //   const index = state.products.findIndex(product => product.id === productId)
  //   state.products.splice(index, 1)
  // }
}
