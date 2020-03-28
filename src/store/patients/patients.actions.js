import { v4 as uuidv4 } from 'uuid'

export default {
  /**
   * Create a product for current loggedin user
   */
  createNewPatient: async ({ state, commit }) => {
    return new Promise(resolve => {
      if (
        state.patients.length === 0 ||
        (state.patients.length >= 1 &&
          Object.keys(state.patients[state.patients.length - 1]).length > 1)
      ) {
        console.log('creating new patient')
        const newPatient = {
          id: uuidv4()
        }
        commit('createNewPatient', newPatient)
        commit('setCurrentPatientId', newPatient.id)
      }
      resolve()
    })
  },

  deletePatientById: async ({ commit }, patientId) => {
    commit('removePatientById', patientId)
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
