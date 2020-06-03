import { find } from 'lodash'

export default {
  currentPatient: state =>
    find(state.patients, patient => patient.id === state.currentPatientId),

  /**
   * Get patient by id
   */
  getPatientById: state => patientId =>
    find(state.patients, patient => patient.id === patientId),

  getOwnerPatient: state => state.ownerPatientId
}
