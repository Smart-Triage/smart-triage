import { v4 as uuidv4 } from 'uuid'

export default {
  /**
   * Create a product for current loggedin user
   */
  createNewPatient: async ({ state, commit }) => {
    const newPatient = {
      id: uuidv4(),
      firstName: state.currentPatientFirstName,
      lastName: state.currentPatientLastName,
      birthNumber: state.currentPatientBirthNumber,
      phoneNumber: state.currentPatientPhoneNumber
    }
    commit('createNewPatient', newPatient)
    commit('setCurrentPatientId', null)
  },

  deletePatientById: async ({ commit }, patientId) => {
    commit('removePatientById', patientId)
  }

  // /**
  //  * Delete a user product from its id
  //  */
  // deleteUserProduct: async ({ rootState, commit, getters }, productId) => {
  //   if (getters.isProductDeletionPending(productId)) return

  //   const userProductsDb = new UserProductsDB(rootState.authentication.user.id)

  //   commit('addProductDeletionPending', productId)
  //   await userProductsDb.delete(productId)
  //   commit('removeProductById', productId)
  //   commit('removeProductDeletionPending', productId)
  // }
}
