<template>
  <div v-if="currentPatient" class="container">
    <button
    :class="{ changecolor: !patientInfoHidden }"
      @click="patientInfoHidden = !patientInfoHidden"
      class="btn-secondary"
    >
      Patient info
    </button>
    <div class="info-container" :class="{ hideInfo: patientInfoHidden }" >
      <p>
        Name: {{ currentPatient.firstName + ' ' + currentPatient.lastName }}
      </p>
      <p>Birth number: {{ currentPatient.birthNumber }}</p>
      <p>Phone number: {{ currentPatient.phoneNumber }}</p>
    </div>
    <button
    :class="{ changecolor: !patientSymptomsHidden }"
      @click="patientSymptomsHidden = !patientSymptomsHidden"
      class="btn-secondary"
    >
      Symptomy
    </button>
    <div :class="{ hideInfo: patientSymptomsHidden }" class="info-container">
      <div v-for="step in formStepsToShow" :key="step.order">
        <p>{{ step.question }} -</p>
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

.btn-secondary {
    font-size: 1.1em;
    background-color: #EDF1F9;
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
  padding: 3em 2em 0.8em 2em;
  width: calc(100% - 2em);
  border-radius: 1.1em;
}
.changecolor {
  background-color: $secondary-color;
  color: #EDF1F9;
}
</style>
