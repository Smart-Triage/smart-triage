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
        <span
          v-if="
            patient.firstName === undefined || patient.lastName === undefined
          "
          class="patient-name"
        >
          _
        </span>
        <span v-else class="patient-name">
          {{ patient.firstName + ' ' + patient.lastName }}
        </span>
      </div>
      <div class="patient-item-right">
        <span v-if="patient.confirmed">Confirmed</span>
        <span v-else-if="patient.finished">Finished</span>
        <span v-else>Not finished</span>
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('patients', ['patients'])
  },
  methods: {
    ...mapMutations('patients', [
      'setCurrentPatientId',
      'setCurrentPacientFormStep'
    ]),
    selectPatient(patient) {
      this.setCurrentPatientId(patient.id)
      if (patient.finished) this.$router.push('/summary')
      else this.$router.push('/form')
    }
  }
}
</script>

<style scoped lang="scss">
ion-icon {
  font-size: 1.3em;
  margin: 0 0.5em 0 0;
}

.patient-list {
  padding: 1rem;
}

.patient-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  .patient-item-left {
    display: flex;
    margin-left: 0.5em;
    align-items: center;
    .patient-name {
      margin-left: 0.5rem;
    }
  }

  .patient-item-right {
    display: flex;
    align-items: center;
    ion-icon {
      margin-left: 1rem;
    }
  }
}
</style>
