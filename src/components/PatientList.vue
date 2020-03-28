<template>
  <div>
    <div
      v-for="patient in patients"
      :key="patient.id"
      class="patient-item"
      @click="selectPatient(patient)"
    >
      <span
        v-if="patient.firstName === undefined || patient.lastName === undefined"
        >[Unfinished]</span
      >
      <span v-else>{{ patient.firstName + ' ' + patient.lastName }}</span>
      <!-- <div>
        {{ patient.birthNumber }}
      </div>
      <div>{{ patient.phoneNumber }}</div> -->
      <button @click="deletePatient($event, patient)">Delete</button>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('patients', ['patients'])
  },
  methods: {
    ...mapActions('patients', ['deletePatientById']),
    ...mapMutations('patients', [
      'setCurrentPatientId',
      'setCurrentPacientFormStep'
    ]),
    deletePatient(e, patient) {
      e.stopPropagation()
      // eslint-disable-next-line no-alert
      const r = window.confirm(
        `Delete patient ${patient.firstName} ${patient.lastName}?`
      )
      if (r === true) this.deletePatientById(patient.id)
    },
    selectPatient(patient) {
      this.setCurrentPatientId(patient.id)
      if (patient.finished) this.$router.push('/summary')
      else this.$router.push('/form')
    }
  }
}
</script>

<style scoped>
.patient-item {
  cursor: pointer;
}
</style>
