<template>
  <div v-if="currentPatient">
    <div
      v-if="
        currentPatient.confirmation &&
          currentPatient.confirmation.confirmedBy.length > 1 &&
          currentPatient.confirmation.timestamp
      "
      class="is-confirmed"
    >
      <div
        class="confirmation-info"
        :class="{ 'covid-suspedted': currentPatient.isCovidSuspected }"
      >
        <div>
          {{ $t('PATIENT_SUMMARY.CONFIRMED_BY') }}
          {{ currentPatient.confirmation.confirmedBy }}
        </div>
        <div>{{ currentPatient.confirmation.timestamp | formatDate }}</div>
        <div v-if="currentPatient.isCovidSuspected === true">
          {{ $t('PATIENT_SUMMARY.COVID_SUSPECTED') }}
        </div>
        <div v-if="currentPatient.isCovidSuspected === false">
          {{ $t('PATIENT_SUMMARY.COVID_NOT_SUSPECTED') }}
        </div>
      </div>
    </div>
    <button
      :class="{ changecolor: !patientInfoHidden }"
      class="patient-item accordion-button"
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
    <transition name="unroll">
      <div
        class="info-container questionInfo"
        :class="{ hideInfo: patientInfoHidden }"
      >
        <p>
          <b>{{ $t('FULL_NAME') }}</b>
        </p>
        <span>{{
          currentPatient.firstName + ' ' + currentPatient.lastName
        }}</span>
        <hr class="dividerInfo" />
        <p>
          <b>{{ $t('PERSONAL_IDENTIFICATION_NUMBER') }}</b>
        </p>
        <span>{{ currentPatient.birthNumber }}</span>
        <hr class="dividerInfo" />
        <p>
          <b>{{ $t('PHONE_NUMBER') }}</b>
        </p>
        <span>{{ currentPatient.phoneNumber }}</span>
        <hr class="dividerInfo" />
        <button
          v-if="!employee && !currentPatient.confirmed"
          class="edit-btn"
          @click="edit('0')"
        >
          {{ $t('EDIT') }}
        </button>
      </div>
    </transition>
    <button
      :class="{ changecolor: !patientSymptomsHidden }"
      class="patient-item accordion-button"
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
    <div :class="{ hideInfo: patientSymptomsHidden }" class="info-container">
      <div
        v-for="step in formStepsToShow"
        :key="step.order"
        class="questionInfo"
      >
        <p>
          <b>{{ step.question }}</b>
        </p>
        <span v-if="step.answerType === 'boolean'">{{
          currentPatient.answers[step.order] === true ? 'Yes' : 'No'
        }}</span>
        <span v-else-if="step.answerType === 'one-of'">
          {{
            getFormSteps
              .find(s => s.order === step.order)
              .options.find(o => o.value === currentPatient.answers[step.order])
              .text
          }}
        </span>
        <span v-else-if="step.answerType === 'checkbox'">
          <span
            v-for="option in currentPatient.answers[step.order]"
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
        <span v-else>{{ currentPatient.answers[step.order] }}</span>
        <hr class="dividerInfo" />
      </div>
      <button
        v-if="!employee && !currentPatient.confirmed"
        class="edit-btn"
        @click="edit('1')"
      >
        {{ $t('EDIT') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: { employee: { type: Boolean, default: false } },
  data: () => ({
    patientInfoHidden: false,
    patientSymptomsHidden: true
  }),
  computed: {
    ...mapGetters('questions', ['getFormSteps']),
    ...mapGetters('patients', ['currentPatient']),
    formStepsToShow() {
      if (!this.currentPatient) return []
      const stepsToShow = []
      this.getFormSteps.forEach(step => {
        if (Object.keys(this.currentPatient.answers).indexOf(step.order) > -1)
          stepsToShow.push(step)
      })
      return stepsToShow
    }
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    edit(stepNum) {
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: [stepNum]
      })
      this.$router.push('/form')
    }
  }
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.dividerInfo {
  border-color: $secondary-color;
  z-index: 10;
}

.questionInfo {
  p {
    color: $secondary-color;
    margin: 0.5rem 0;
  }
  span {
    color: black;
  }
}

.accordion-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 20;

  .spacer {
    width: 18px;
  }
}

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
  max-width: 400px;
  align-self: flex-start;
  margin: 0 1em;
  background-color: #32227f15;
  padding: 3em 2em 2em 2em;
  width: calc(100% - 2em);
  border-radius: 1.1em;
}

.edit-btn {
  cursor: pointer;
  font-size: 1em;
  background-color: $secondary-color;
  color: white;
  border-radius: 2em;
  padding: 0.8em 4em;
  width: fit-content;
  margin: 0 auto;
}

.patient-item {
  width: calc(100% - 2em);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  margin: 0.5em 1em;
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

.confirmation-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: $positive-color;
  color: white;
  border-radius: 5rem;
  margin: 0 1rem;

  &.covid-suspedted {
    background-color: $negative-color;
  }
}
</style>
