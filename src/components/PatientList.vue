<template>
  <div>
    <div v-for="patient in patients" :key="patient.id" class="patient-item">
      <ion-icon
        class="flex-shrink text-red-600"
        name="trash"
        @click="removePatient(key)"
      ></ion-icon>
      <div class="patient-item-left flex-grow" @click="selectPatient(patient)">
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
      <div class="patient-item-right" @click="selectPatient(patient)">
        <span v-if="isConfirmed(patient)">
          {{ $t('PATIENT_LIST.CONFIRMED') }}
        </span>
        <span v-else-if="isFinished(patient) && !isExpired(patient)">{{
          $t('PATIENT_LIST.FINISHED')
        }}</span>
        <span v-else-if="isExpired(patient)">{{
          $t('PATIENT_LIST.VALIDITY_TIMEOUT')
        }}</span>
        <span v-else>{{ $t('PATIENT_LIST.NOT_FINISHED') }}</span>
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Constants from '@/misc/constants'
import { isConfirmedMixin, isFinishedMixin } from '@/mixins'

export default {
  mixins: [isConfirmedMixin, isFinishedMixin],
  computed: {
    ...mapState('patients', ['patients'])
  },
  mounted() {
    // I'm sorry, but why in the everliving fuck is for-of restricted? Why is this abomination of a syntax preferable?
    // this truly is the objectively worst eslint setting imaginable holy shit this is unreal
    this.patients.forEach(patient => {
      if (this.isExpired(patient)) {
        this.invalidatePatientFormById(patient.id)
      }
    })
  },
  methods: {
    ...mapMutations('patients', [
      'setCurrentPatientId',
      'setCurrentPatientFormStep',
      'setCurrentPatientValueByKey',
      'removePatientById'
    ]),
    ...mapActions('patients', ['invalidatePatientFormById']),
    async selectPatient(patient) {
      this.setCurrentPatientId(patient.id)
      if (this.isExpired(patient)) {
        await this.invalidatePatientFormById(patient.id)
      }
      this.setCurrentPatientValueByKey({ key: 'invalid', value: false })
      if (this.isFinished(patient)) this.$router.push('/summary')
      else this.$router.push('/form')
    },
    isExpired(patient) {
      if (!patient.validityTimestamp) {
        return false
      }
      const validityTimestamp = new Date(patient.validityTimestamp)
      return (
        !this.isConfirmed(patient) &&
        (patient.invalid ||
          validityTimestamp.getTime() + Constants.FORM_VALIDITY_PERIOD <
            new Date().getTime())
      )
    },
    checkAndProcessExpiration(patient) {
      if (this.isExpired(patient)) {
        this.invalidatePatientFormById(patient.id)
      }
    },
    removePatient(id) {
      this.removePatientById(id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/variables.scss';

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
  background-color: $secondary-color;
  color: white;
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
