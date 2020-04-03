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

  updateOrAddPatient: async ({ state, commit, dispatch }, patient) => {
    return new Promise(resolve => {
      if (state.patients.find(p => p.id === patient.id))
        commit('updatePatient', patient)
      else commit('createNewPatient', patient)

      commit('setCurrentPatientId', patient.id)
      dispatch('recalculatePoints')
      resolve()
    })
  },

  deletePatientById: async ({ commit }, patientId) => {
    return new Promise(resolve => {
      commit('removePatientById', patientId)
      commit('setCurrentPatientId', '')
      resolve()
    })
  },

  clearCurrentPatient: async ({ commit }) => {
    commit('setCurrentPatientId', '')
  },

  recalculatePoints: async ({ getters, rootGetters, commit }) => {
    let totalPoints = 0
    rootGetters['questions/getFormSteps'].forEach(step => {
      const answer =
        getters.currentPatient.answers[
          Object.keys(getters.currentPatient.answers).find(
            key => key === step.order
          )
        ]

      if (step.answerType === 'boolean') {
        totalPoints +=
          (answer === true ? step.pointsIfPositive : step.pointsIfNegative) || 0
      }

      if (step.answerType === 'slider') {
        totalPoints +=
          answer >= step.pointsIfValueIsHigherThan.treshold
            ? step.pointsIfValueIsHigherThan.points
            : 0
      }

      if (step.answerType === 'checkbox') {
        step.options.forEach(option => {
          if (answer.find(a => a.value === option.value).isChecked)
            totalPoints += option.pointsIfChecked
        })
      }
      console.log('step: ', step.order, ', totalPoints: ', totalPoints)
    })

    commit('setCurrentPatientValueByKey', {
      key: 'totalPoints',
      value: totalPoints
    })
  }
}
