<template>
  <div class="patient-list">
    <div
      v-for="patient in patients"
      :key="patient.id"
      class="patient-item"
      @click="selectPatient(patient)"
    >
      <div class="patient-item-left">
        <ion-icon name="person-outline"></ion-icon>
        <div
          v-if="
            patient.firstName === undefined || patient.lastName === undefined
          "
          class="patient-name"
        >
          [Unfinished]
        </div>
        <div v-else class="patient-name">
          {{ patient.firstName + ' ' + patient.lastName }}
        </div>
      </div>
      <ion-icon name="arrow-forward-outline"></ion-icon>

      <!-- <div class="patient-item-actions">
        <button @click="deletePatient($event, patient)">Remove</button>
      </div> -->
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

<style scoped lang="scss">
.patient-list {
  padding: 1rem;
}

.patient-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;
  padding: 1rem;
  margin: 1rem 0;
  background: white;
  border-radius: 10rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  .patient-item-left {
    display: flex;

    .patient-name {
      margin-left: 1rem;
    }
  }
}
</style>
