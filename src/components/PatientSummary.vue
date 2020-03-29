<template>
  <div v-if="currentPatient">
    <div>
      Name: {{ currentPatient.firstName + ' ' + currentPatient.lastName }}
    </div>
    <div>Birth number: {{ currentPatient.birthNumber }}</div>
    <div>Phone number: {{ currentPatient.phoneNumber }}</div>
    <div>
      <div v-for="step in formStepsToShow" :key="step.order">
        {{ step.question }} -
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

<style></style>
