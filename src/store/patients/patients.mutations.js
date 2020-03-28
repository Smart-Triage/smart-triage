export default {
  createNewPatient: (state, patient) => state.patients.push(patient),

  /* Product input name */
  setPatientFirstName: (state, productNameToCreate) =>
    (state.productNameToCreate = productNameToCreate),

  setCurrentPatientId: (state, patientId) =>
    (state.currentPatientId = patientId),
  setCurrentPatientFirstName: (state, patientFirstName) =>
    (state.currentPatientFirstName = patientFirstName),
  setCurrentPatientLastName: (state, patientLastName) =>
    (state.currentPatientLastName = patientLastName),
  setCurrentPatientBirthNumber: (state, patientBirthNumber) =>
    (state.currentPatientBirthNumber = patientBirthNumber),
  setCurrentPatientPhoneNumber: (state, patientPhoneNumber) =>
    (state.currentPatientPhoneNumber = patientPhoneNumber),

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
