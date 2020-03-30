import { v4 as uuidv4 } from 'uuid'

export default {
  /**
   * Create a product for current loggedin user
   */
  createNewPatient: async ({ state, commit }) => {
    return new Promise(resolve => {
      // Only create new patient if the last patient is filled, if last patient is empty, use that one instead of creating a new one
      if (
        state.patients.length === 0 ||
        (state.patients.length >= 1 &&
          Object.keys(state.patients[state.patients.length - 1]).length > 3)
      ) {
        const newPatient = {
          id: uuidv4()
        }
        commit('createNewPatient', newPatient)
        commit('setCurrentPatientId', newPatient.id)
      }
      resolve()
    })
  },

  updateOrAddPatient: async ({ state, commit }, patient) => {
    return new Promise(resolve => {
      if (state.patients.find(p => p.id === patient.id))
        commit('updatePatient', patient)
      else commit('createNewPatient', patient)

      commit('setCurrentPatientId', patient.id)
      resolve()
    })
  },

  deletePatientById: async ({ commit }, patientId) => {
    return new Promise(resolve => {
      commit('removePatientById', patientId)
      resolve()
    })
  },

  clearCurrentPatient: async ({ commit }) => {
    commit('setCurrentPatientId', '')
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
