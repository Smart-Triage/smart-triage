<template>
  <div v-if="currentPatient" class="container">
    <button
      :class="{ changecolor: !patientInfoHidden }"
      class="btn-secondary accordion-button"
      @click="patientInfoHidden = !patientInfoHidden"
    >
      <ion-icon name="person-outline"></ion-icon>
      Patient info
      <ion-icon
        class="iconAccordion"
        :name="
          patientInfoHidden ? 'chevron-down-outline' : 'chevron-up-outline'
        "
      ></ion-icon>
    </button>
    <transition name="unroll">
      <div
        class="info-container questionInfo"
        :class="{ hideInfo: patientInfoHidden }"
      >
        <p><b>Name</b></p>
        <span>{{
          currentPatient.firstName + ' ' + currentPatient.lastName
        }}</span>
        <hr class="dividerInfo" />
        <p><b>number</b></p>
        <span>{{ currentPatient.birthNumber }}</span>
        <hr class="dividerInfo" />
        <p><b>Phone number</b></p>
        <span>{{ currentPatient.phoneNumber }}</span>
        <hr class="dividerInfo" />
      </div>
    </transition>
    <button
      :class="{ changecolor: !patientSymptomsHidden }"
      class="btn-secondary accordion-button"
      @click="patientSymptomsHidden = !patientSymptomsHidden"
    >
      <ion-icon name="thermometer-outline"></ion-icon>

      Symptomy
      <ion-icon
        :name="
          patientSymptomsHidden ? 'chevron-down-outline' : 'chevron-up-outline'
        "
      ></ion-icon>
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
          currentPatient.answers[step.order] === true ? 'ANO' : 'NE'
        }}</span>
        <span v-else-if="step.answerType === 'checkbox'">
          <span
            v-for="option in currentPatient.answers[step.order]"
            :key="option.value"
            >{{
              option.isChecked
                ? formSteps
                    .find(s => s.order === step.order)
                    .options.find(o => o.value === option.value).text + ', '
                : ''
            }}</span
          >
        </span>
        <span v-else>{{ currentPatient.answers[step.order] }}</span>
        <hr class="dividerInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    patientInfoHidden: true,
    patientSymptomsHidden: true
  }),
  computed: {
    ...mapState('patients', ['formSteps']),
    ...mapGetters('patients', ['currentPatient']),
    formStepsToShow() {
      if (!this.currentPatient) return []
      const stepsToShow = []
      this.formSteps.forEach(step => {
        if (Object.keys(this.currentPatient.answers).indexOf(step.order) > -1)
          stepsToShow.push(step)
      })
      return stepsToShow
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

  .spacer {
    width: 18px;
  }
}

ion-icon {
  font-size: 1.3em;
}

.btn-secondary {
  font-size: 1.1em;
  background-color: $secondary-color;
  color: #edf1f9;
  border-radius: 2em;
  border: none;
  padding: 0.8em 2em;
  margin: 0.5em 2em;
  width: calc(100% - 2em);
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
  z-index: -10;
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
</style>
