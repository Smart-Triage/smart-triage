<template>
  <div v-if="patient">
    <div v-if="isConfirmed(patient)" class="is-confirmed">
      <ConfirmationBox :patient="patient"></ConfirmationBox>
    </div>
    <button
      class="patient-item flex justify-between items-center cursor-pointer my-2 relative z-20"
      @click="patientInfoHidden = !patientInfoHidden"
    >
      <div class="patient-item-left">
        <ion-icon name="person-outline"></ion-icon>
        <span>{{ $t('PATIENT_SUMMARY.PATIENT_INFO') }}</span>
      </div>
      <div class="patient-item-right">
        <ion-icon
          class="iconAccordion"
          :name="
            patientInfoHidden ? 'chevron-down-outline' : 'chevron-up-outline'
          "
        ></ion-icon>
      </div>
    </button>
    <div
      class="info-container text-left"
      :class="{ hideInfo: patientInfoHidden }"
    >
      <div class="flex flex-col border-b border-gray-700 my-1">
        <span class="text-secondary">{{ $t('FULL_NAME') }}</span>
        <span class="font-semibold text-xl">
          {{ patient.firstName + ' ' + patient.lastName }}
        </span>
      </div>

      <div
        v-if="patient.birthNumber"
        class="flex flex-col border-b border-gray-700 my-1"
      >
        <span class="text-secondary">{{
          $t('PERSONAL_IDENTIFICATION_NUMBER')
        }}</span>
        <span class="font-semibold text-xl">
          {{ patient.birthNumber }}
        </span>
      </div>

      <div
        v-if="patient.phoneNumber"
        class="flex flex-col border-b border-gray-700 my-1 py-1"
      >
        <span class="text-secondary">{{ $t('PHONE_NUMBER') }}</span>
        <span class="font-semibold text-xl">
          {{ patient.phoneNumber }}
        </span>
      </div>

      <div
        v-if="patient.birthDate"
        class="flex flex-col border-b border-gray-700 my-1 py-1"
      >
        <span class="text-secondary">{{ $t('PHONE_NUMBER') }}</span>
        <span class="font-semibold text-xl">
          {{ patient.birthDate | formatDateShort }}
        </span>
      </div>

      <button
        v-if="!isConfirmed(patient)"
        class="edit-btn"
        @click="showPatientFormModal = true"
      >
        {{ $t('EDIT') }}
      </button>
    </div>
    <button
      class="patient-item flex justify-between items-center cursor-pointer my-2 relative z-20"
      @click="patientSymptomsHidden = !patientSymptomsHidden"
    >
      <div class="patient-item-left">
        <ion-icon name="thermometer-outline"></ion-icon>
        <span>{{ $t('PATIENT_SUMMARY.SYMPTOPMS') }}</span>
      </div>
      <div class="patient-item-right">
        <ion-icon
          :name="
            patientSymptomsHidden
              ? 'chevron-down-outline'
              : 'chevron-up-outline'
          "
        ></ion-icon>
      </div>
    </button>
    <div
      :class="{ hideInfo: patientSymptomsHidden }"
      class="info-container text-left"
    >
      <div
        v-for="step in formStepsToShow"
        :key="step.order"
        class="flex border-b border-gray-700 my-1 py-1"
      >
        <div class="font-semibold">
          <div class="font-medium text-secondary">
            {{ step.question }}
          </div>
          <span v-if="step.answerType === 'boolean'">{{
            patient.answers[step.order] === true ? $t('YES') : $t('NO')
          }}</span>
          <span v-else-if="step.answerType === 'one-of'">
            {{
              getFormSteps
                .find(s => s.order === step.order)
                .options.find(o => o.value === patient.answers[step.order]).text
            }}
          </span>
          <span v-else-if="step.answerType === 'checkbox'">
            <span
              v-for="option in patient.answers[step.order]"
              :key="option.value"
              >{{
                option.isChecked
                  ? getFormSteps
                      .find(s => s.order === step.order)
                      .options.find(o => o.value === option.value).text + ', '
                  : ''
              }}</span
            >
          </span>
          <span v-else>{{ patient.answers[step.order] }}</span>
        </div>
      </div>
      <button v-if="!isConfirmed(patient)" class="edit-btn" @click="edit('1')">
        {{ $t('EDIT') }}
      </button>
    </div>
    <patient-form-edit-modal
      :show-patient-form-modal="showPatientFormModal"
      @hidePatientFormEditModal="showPatientFormModal = false"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ConfirmationBox from '@/components/ConfirmationBox'
import { getFormStepsMixin, isConfirmedMixin } from '@/mixins'
import PatientFormEditModal from '@/components/PatientFormEditModal'

export default {
  components: { PatientFormEditModal, ConfirmationBox },
  mixins: [getFormStepsMixin, isConfirmedMixin],
  props: {
    patient: { type: Object, required: true }
  },
  data() {
    return {
      patientInfoHidden: this.isConfirmed(this.patient),
      patientSymptomsHidden: this.isConfirmed(this.patient),
      showPatientFormModal: false
    }
  },
  computed: {
    formStepsToShow() {
      if (!this.patient) return []
      const stepsToShow = []
      this.getFormSteps.forEach(step => {
        if (Object.keys(this.patient.answers).indexOf(step.order) > -1)
          stepsToShow.push(step)
      })
      return stepsToShow
    }
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    edit(stepNum) {
      const visitedSteps = ['0']
      if (stepNum === '1') visitedSteps.push('1')
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: visitedSteps
      })
      this.$router.push('/form')
    }
  }
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

ion-icon {
  font-size: 1.3em;
}

.hideInfo {
  overflow: hidden;
  height: 0;
  padding: 0 !important;
}

.symptoms-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  align-self: flex-start;
  padding: 0 3em;
}

.info-container {
  transform: translateY(-50px);
  display: flex;
  flex-direction: column;
  background-color: #32227f15;
  padding: 3em 2em 1em 2em;
  width: 100%;
  border-radius: 1.1em;
}

.edit-btn {
  cursor: pointer;
  font-size: 1em;
  background-color: $secondary-color;
  color: white;
  border-radius: 2em;
  padding: 0.5em 2em;
  width: fit-content;
  margin: 1rem auto 0 auto;
}

.patient-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  background: $secondary-color;
  color: white;
  border-radius: 10rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-size: 1em;

  .patient-item-left {
    display: flex;
    margin-left: 0.5em;
    align-items: center;
    span {
      margin-left: 0.8em;
    }
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
