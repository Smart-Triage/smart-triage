import { find } from 'lodash'

export default {
  /**
   * Get patient by id
   */
  getPatientById: state => patientId =>
    find(state.patients, patient => patient.id === patientId)
}
